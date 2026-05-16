import { Button } from './ui/Button';
import { ShieldCheck, Zap, Truck, MessageCircle, Apple, ChevronRight } from 'lucide-react';
import type { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
}

export function Hero({ config }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-black">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-apple-blue/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-apple-neon/5 rounded-full blur-[100px] animate-float" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center motion-card-group">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-semibold mb-10 backdrop-blur-xl shadow-2xl motion-card">
            <span className="flex h-2 w-2 rounded-full bg-apple-neon animate-pulse" />
            <Apple size={14} className="text-white" />
            Especialistas em Hardware Apple
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-white motion-title">
            Seu iPhone <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">novo de novo.</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-14 leading-relaxed font-medium motion-reveal">
            Reparos especializados em iPhones com busca e entrega em toda a região do Capão Redondo. 
            <span className="text-white/80"> Diagnóstico técnico transparente e {config.warranty}.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24 w-full sm:w-auto motion-card">
            <a href="#orcamento" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto group">
                Solicitar Orçamento
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto flex items-center gap-3">
                <MessageCircle size={22} className="text-[#25D366]" />
                Falar no WhatsApp
              </Button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 motion-card-group">
            <div className="flex flex-col items-center gap-4 group motion-card">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-apple-neon group-hover:scale-110 transition-transform duration-500">
                <Zap size={28} />
              </div>
              <div className="text-center">
                <p className="text-white font-bold">Atendimento 24h</p>
                <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Segunda a Sexta</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 group motion-card">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-apple-neon group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck size={28} />
              </div>
              <div className="text-center">
                <p className="text-white font-bold">{config.warranty}</p>
                <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Garantia Total</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 group motion-card">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-apple-neon group-hover:scale-110 transition-transform duration-500">
                <Truck size={28} />
              </div>
              <div className="text-center">
                <p className="text-white font-bold">Busca e Entrega</p>
                <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Sua Comodidade</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 group motion-card">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-apple-neon group-hover:scale-110 transition-transform duration-500">
                <Apple size={28} />
              </div>
              <div className="text-center">
                <p className="text-white font-bold">Peças Premium</p>
                <p className="text-xs text-white/30 uppercase tracking-widest mt-1">Padrão Original</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Gradient Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}
