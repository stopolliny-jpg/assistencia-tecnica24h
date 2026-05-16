import { useState } from 'react';
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
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Solicitação enviada!</h3>
          <p className="text-white/60 text-lg">
            Solicitação enviada com sucesso. Redirecionando para o WhatsApp…
          </p>
          <div className="mt-6">
            <LoadingSpinner size="md" className="mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="orcamento" className="py-24 lg:py-32 bg-black relative">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-apple-blue/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-apple-neon text-sm font-semibold tracking-widest uppercase mb-4">
            Atendimento rápido
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Solicite seu orçamento agora.
          </h2>
          <p className="text-white/50 text-lg">
            Escolha um horário disponível e fale direto com um especialista.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6"
          noValidate
        >
          {/* Personal info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Nome completo"
              placeholder="Seu nome"
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              error={errors.fullName}
              autoComplete="name"
            />
            <Input
              label="WhatsApp"
              placeholder="(11) 99999-9999"
              value={form.whatsapp}
              onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
              error={errors.whatsapp}
              type="tel"
              autoComplete="tel"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

          {/* Date picker */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="preferred-date" className="text-sm font-medium text-white/70">
              Data desejada
            </label>
            <input
              id="preferred-date"
              type="date"
              value={form.preferredDate}
              min={getTodayString()}
              onChange={handleDateChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-apple-blue/60 focus:border-apple-blue/60 transition-all duration-200"
            />
          </div>

          {/* Time slots */}
          {form.preferredDate && (
            <div>
              <p className="text-sm font-medium text-white/70 mb-3">Horário disponível</p>

              {slotsLoading ? (
                <div className="flex items-center gap-3 py-4 text-white/50 text-sm">
                  <LoadingSpinner size="sm" />
                  Carregando horários…
                </div>
              ) : slotsError ? (
                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm">
                  {slotsError}
                </div>
              ) : slots.length === 0 && !slotsLoading ? (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/40 text-sm text-center">
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
                      className={`
                        py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 border
                        ${selectedSlotId === slot.id
                          ? 'bg-apple-blue border-apple-blue text-white shadow-lg shadow-apple-blue/30'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20'
                        }
                      `}
                    >
                      {slot.startTime}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <Textarea
            label="Descrição do problema (opcional)"
            placeholder="Descreva o que está acontecendo com seu iPhone…"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />

          {/* Error */}
          {submitError && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm mb-3">{submitError}</p>
              <a
                href={buildWhatsAppUrl(config.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#25D366] hover:text-[#1fb855] transition-colors"
              >
                Chamar direto no WhatsApp →
              </a>
            </div>
          )}

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={submitting}
              className="w-full"
            >
              {submitting ? 'Enviando…' : 'Solicitar orçamento'}
            </Button>
            <p className="text-center text-white/30 text-xs mt-3">
              Você será redirecionado para o WhatsApp após o envio.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
