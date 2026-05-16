import { useEffect, useRef } from 'react';
import { Shield, Clock, Truck } from 'lucide-react';
import { Button } from './ui/Button';
import type { SiteConfig } from '../types';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface HeroProps {
  config: SiteConfig;
}

export function Hero({ config }: HeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [titleRef.current, subtitleRef.current, ctaRef.current, badgesRef.current];
    elements.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        if (el) {
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      }, 200 + i * 150);
    });
  }, []);

  const scrollToForm = () => {
    document.querySelector('#orcamento')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apple-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-apple-neon/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-apple-blue/5 rounded-full blur-[100px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-apple-neon/10 border border-apple-neon/20 text-apple-neon text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-apple-neon animate-pulse" />
          Especialistas em iPhone · Atendimento 24H
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
        >
          Seu iPhone consertado
          <br />
          <span className="bg-gradient-to-r from-apple-blue via-apple-neon to-apple-blue-light bg-clip-text text-transparent">
            em horas, não em dias.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Atendimento especializado em iPhones, com busca e entrega, diagnóstico transparente e{' '}
          <span className="text-white/90 font-medium">90 dias de garantia.</span>
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Button variant="primary" size="lg" onClick={scrollToForm}>
            Solicitar orçamento
          </Button>
          <Button
            variant="whatsapp"
            size="lg"
            onClick={() => window.open(buildWhatsAppUrl(config.whatsapp), '_blank')}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.554 4.11 1.523 5.834L.057 23.43a.5.5 0 00.601.582l5.77-1.513A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.518-5.16-1.42l-.368-.22-3.823 1.003 1.02-3.728-.24-.38A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Falar no WhatsApp
          </Button>
        </div>

        {/* Badges */}
        <div
          ref={badgesRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          {[
            { icon: <Clock size={16} />, label: 'Atendimento 24h' },
            { icon: <Shield size={16} />, label: '90 dias de garantia' },
            { icon: <Truck size={16} />, label: 'Busca e entrega' },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-white/50 text-sm font-medium"
            >
              <span className="text-apple-neon">{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
