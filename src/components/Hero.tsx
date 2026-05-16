import React from 'react';
import { Button } from './ui/Button';
import { ShieldCheck, Zap, Truck, MessageCircle } from 'lucide-react';
import type { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
}

export function Hero({ config }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-apple-blue/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-apple-neon/5 rounded-full blur-[100px] animate-float" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-apple-neon animate-pulse" />
            Especialistas em reparos Apple
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Seu iPhone pronto em <span className="text-apple-neon">horas</span>,<br className="hidden md:block" /> não em dias.
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed">
            {config.businessName} — Atendimento especializado com busca e entrega, diagnóstico transparente e {config.warranty}.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <a href="#orcamento" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">Solicitar Orçamento</Button>
            </a>
            <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <MessageCircle size={20} />
                WhatsApp
              </Button>
            </a>
          </div>

          {/* Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-apple-neon">
                <Zap size={24} />
              </div>
              <span className="text-sm font-semibold text-white/60">Atendimento 24h</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-apple-neon">
                <ShieldCheck size={24} />
              </div>
              <span className="text-sm font-semibold text-white/60">{config.warranty}</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-apple-neon">
                <Truck size={24} />
              </div>
              <span className="text-sm font-semibold text-white/60">Busca e Entrega</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-apple-neon">
                <Apple size={24} />
              </div>
              <span className="text-sm font-semibold text-white/60">Peças Premium</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
