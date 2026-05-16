import React, { useState, useEffect } from 'react';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { useAvailability } from '../hooks/useAvailability';
import { createQuote, createQuoteWithBooking } from '../services/quotes';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { getTodayString } from '../utils/formatters';
import type { SiteConfig } from '../types';

const PROBLEM_TYPES = [
  { value: 'Tela quebrada', label: 'Tela quebrada' },
  { value: 'Bateria ruim', label: 'Bateria ruim' },
  { value: 'Não carrega', label: 'Não carrega' },
  { value: 'Caiu na água', label: 'Caiu na água' },
  { value: 'Problema no áudio', label: 'Problema no áudio' },
  { value: 'Problema na câmera', label: 'Problema na câmera' },
  { value: 'Travando ou lento', label: 'Travando ou lento' },
  { value: 'Outro problema', label: 'Outro problema' },
];

const IPHONE_MODELS = [
  'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
  'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
  'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13 Mini', 'iPhone 13',
  'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12 Mini', 'iPhone 12',
  'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
  'iPhone XS Max', 'iPhone XS', 'iPhone XR',
  'iPhone X', 'iPhone 8 Plus', 'iPhone 8',
  'Outro modelo',
].map((m) => ({ value: m, label: m }));

interface QuoteFormProps {
  config: SiteConfig;
}

interface FormErrors {
  fullName?: string;
  whatsapp?: string;
  deviceModel?: string;
  problemType?: string;
}

export function QuoteForm({ config }: QuoteFormProps) {
  const [form, setForm] = useState({
    fullName: '',
    whatsapp: '',
    deviceModel: '',
    problemType: '',
    description: '',
    preferredDate: getTodayString(),
    preferredTime: '',
  });
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { slots, loading: slotsLoading, error: slotsError, fetchAvailability } = useAvailability();

  // Load availability for the default date on mount
  useEffect(() => {
    fetchAvailability(form.preferredDate);
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setForm((f) => ({ ...f, preferredDate: date }));
    setSelectedSlotId(null);
    if (date) {
      fetchAvailability(date);
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Preencha seu nome.';
    if (!form.whatsapp.trim() || form.whatsapp.replace(/\D/g, '').length < 10)
      newErrors.whatsapp = 'Digite um WhatsApp válido.';
    if (!form.deviceModel) newErrors.deviceModel = 'Informe o modelo do aparelho.';
    if (!form.problemType) newErrors.problemType = 'Escolha o tipo de problema.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      let response;

      if (selectedSlotId) {
        response = await createQuoteWithBooking({
          slotId: selectedSlotId,
          fullName: form.fullName,
          whatsapp: form.whatsapp.replace(/\D/g, ''),
          deviceModel: form.deviceModel,
          problemType: form.problemType,
          description: form.description,
          source: 'landing-page',
          pageUrl: window.location.href,
        });
      } else {
        response = await createQuote({
          fullName: form.fullName,
          whatsapp: form.whatsapp.replace(/\D/g, ''),
          deviceModel: form.deviceModel,
          problemType: form.problemType,
          description: form.description,
          preferredDate: form.preferredDate,
          preferredTime: form.preferredTime,
          source: 'landing-page',
          pageUrl: window.location.href,
        });
      }

      if (response.success) {
        setSubmitSuccess(true);
        const url = response.data?.whatsappUrl || buildWhatsAppUrl(config.whatsapp);
        setTimeout(() => {
          window.open(url, '_blank');
        }, 1500);
      } else {
        throw new Error('Resposta inválida da API.');
      }
    } catch {
      setSubmitError(
        'Não conseguimos enviar sua solicitação. Tente novamente ou chame no WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <section id="orcamento" className="py-24 lg:py-32 bg-black">
        <div className="max-w-2xl mx-auto px-4 text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-apple-neon/20 border border-apple-neon/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(0,212,255,0.2)]">
            <svg className="w-10 h-10 text-apple-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-white mb-3 text-gradient">Solicitação enviada!</h3>
          <p className="text-white/60 text-lg">
            Sua solicitação foi recebida. Estamos te redirecionando para o WhatsApp para confirmar os detalhes...
          </p>
          <div className="mt-10">
            <LoadingSpinner size="lg" className="mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="orcamento" className="py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-apple-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-16 motion-reveal">
          <h2 className="section-title motion-title">Solicite seu orçamento agora.</h2>
          <p className="section-subtitle">Escolha um horário disponível e fale direto com um especialista.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 md:p-12 space-y-8 motion-form"
        >
          {/* Personal info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nome completo"
              placeholder="Seu nome"
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              error={errors.fullName}
            />
            <Input
              label="WhatsApp"
              placeholder="(11) 99999-9999"
              value={form.whatsapp}
              onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
              error={errors.whatsapp}
              type="tel"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Modelo do aparelho"
              options={IPHONE_MODELS}
              value={form.deviceModel}
              onChange={(e) => setForm((f) => ({ ...f, deviceModel: e.target.value }))}
              error={errors.deviceModel}
            />
            <Select
              label="Tipo de problema"
              options={PROBLEM_TYPES}
              value={form.problemType}
              onChange={(e) => setForm((f) => ({ ...f, problemType: e.target.value }))}
              error={errors.problemType}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date picker */}
            <div className="md:col-span-1">
              <label className="text-sm font-medium text-white/70 ml-1 mb-1.5 block">Data desejada</label>
              <input
                type="date"
                value={form.preferredDate}
                min={getTodayString()}
                onChange={handleDateChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-apple-blue/60 focus:border-apple-blue/60 transition-all duration-200"
              />
            </div>

            {/* Time slots */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-white/70 ml-1 mb-1.5 block">Horário disponível</label>
              
              {slotsLoading ? (
                <div className="h-[46px] flex items-center justify-center bg-white/5 rounded-xl border border-white/10">
                   <LoadingSpinner size="sm" />
                </div>
              ) : slotsError ? (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  {slotsError}
                </div>
              ) : slots.length === 0 ? (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/30 text-xs text-center">
                  Nenhum horário disponível para esta data.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                  {slots.map((slot) => (
                    <button
                      type="button"
                      key={slot.id}
                      onClick={() => {
                        setSelectedSlotId(slot.id);
                        setForm((f) => ({ ...f, preferredTime: slot.startTime }));
                      }}
                      className={`py-2 px-1 rounded-lg text-xs font-bold transition-all border ${
                        selectedSlotId === slot.id
                          ? 'bg-apple-blue border-apple-blue text-white shadow-lg shadow-apple-blue/30'
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {slot.startTime}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Textarea
            label="Descrição do problema (opcional)"
            placeholder="Descreva brevemente o que está acontecendo..."
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />

          {submitError && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {submitError}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            loading={submitting}
          >
            {submitting ? 'Enviando...' : 'Solicitar Orçamento'}
          </Button>
          
          <p className="text-center text-white/30 text-xs">
            Ao clicar, você será redirecionado para o WhatsApp com todos os dados.
          </p>
        </form>
      </div>
    </section>
  );
}
