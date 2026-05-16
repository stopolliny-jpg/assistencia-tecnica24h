import { Users, Eye, Shield, Heart, Truck } from 'lucide-react';
import type { SiteConfig } from '../types';

interface AboutProps {
  config: SiteConfig;
}

const stats = [
  { icon: Users, value: '+10 mil', label: 'clientes atendidos', color: 'text-blue-400' },
  { icon: Eye, value: '100%', label: 'diagnóstico transparente', color: 'text-apple-neon' },
  { icon: Shield, value: '90 dias', label: 'de garantia', color: 'text-green-400' },
  { icon: Heart, value: '24h', label: 'atendimento humanizado', color: 'text-pink-400' },
  { icon: Truck, value: 'Grátis', label: 'busca e entrega', color: 'text-orange-400' },
];

export function AboutSection({ config }: AboutProps) {
  return (
    <section id="sobre" className="py-24 lg:py-32 bg-[#050505] relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-apple-blue/6 rounded-full blur-[80px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-apple-neon text-sm font-semibold tracking-widest uppercase mb-4">
              Sobre nós
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Autoridade em conserto Apple no{' '}
              <span className="text-apple-blue">Capão Redondo.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              A {config.businessName} nasceu da certeza de que ficar sem iPhone não é opção. Por
              isso, oferecemos atendimento rápido, diagnóstico transparente, peças de qualidade,
              bancada profissional e suporte direto pelo WhatsApp. Buscamos e entregamos seu
              aparelho para que você resolva tudo com praticidade, segurança e confiança.
            </p>

            {/* Details */}
            <div className="flex flex-col gap-3">
              {[
                { label: 'Localização', value: config.location },
                { label: 'Funcionamento', value: config.workingHours },
                { label: 'Garantia', value: config.warranty },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-apple-neon flex-shrink-0" />
                  <span className="text-white/40 text-sm">{label}:</span>
                  <span className="text-white/80 text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map(({ icon: Icon, value, label, color }, i) => (
              <div
                key={label}
                className={`
                  p-6 rounded-2xl border border-white/10 bg-white/[0.03]
                  hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300
                  ${i === 4 ? 'sm:col-span-2' : ''}
                `}
              >
                <Icon size={22} className={`${color} mb-3`} strokeWidth={1.5} />
                <div className={`text-3xl font-black ${color} mb-1`}>{value}</div>
                <div className="text-white/50 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
