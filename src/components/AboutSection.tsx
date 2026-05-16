import { Apple, Users, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';
import type { SiteConfig } from '../types';

interface AboutSectionProps {
  config: SiteConfig;
}

export function AboutSection({ config }: AboutSectionProps) {
  const highlights = [
    { label: '+10 mil clientes atendidos', icon: Users },
    { label: 'Diagnóstico transparente', icon: CheckCircle2 },
    { label: config.warranty, icon: ShieldCheck },
    { label: 'Atendimento humanizado', icon: Apple },
    { label: 'Busca e entrega', icon: Truck },
  ];

  return (
    <section id="sobre" className="py-24 lg:py-32 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-apple-blue/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-video lg:aspect-square bg-zinc-900 border border-white/10">
               {/* Premium placeholder for a real lab photo */}
               <div className="absolute inset-0 flex items-center justify-center text-white/5 flex-col">
                  <Apple size={120} />
                  <span className="text-sm tracking-widest mt-4">LABORATÓRIO TÉCNICO</span>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
               <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white font-bold text-2xl mb-2">Bancada profissional</p>
                  <p className="text-white/50">Equipamentos de alta precisão para micro-soldagem e diagnósticos.</p>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Autoridade em conserto Apple no <span className="text-apple-neon">Capão Redondo</span>.</h2>
            
            <p className="text-xl text-white/60 leading-relaxed mb-10">
              A Assistência Apple 24H nasceu da certeza de que ficar sem iPhone não é opção. 
              Por isso, oferecemos atendimento rápido, diagnóstico transparente, peças de qualidade 
              e suporte direto pelo WhatsApp. Buscamos e entregamos seu aparelho para que você resolva 
              tudo com praticidade, segurança e confiança.
            </p>

            <div className="space-y-6">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div key={h.label} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-apple-neon group-hover:bg-apple-blue transition-colors">
                      <Icon size={20} />
                    </div>
                    <span className="text-lg font-medium text-white/80 group-hover:text-white transition-colors">{h.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
