import { Calendar, Clock, Smartphone, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Escolha um horário',
    description: 'Selecione uma data ou fale conosco direto pelo WhatsApp.',
    icon: Calendar,
  },
  {
    title: 'Verificamos a agenda',
    description: 'O sistema mostra os horários disponíveis em tempo real.',
    icon: Clock,
  },
  {
    title: 'Preencha os dados',
    description: 'Informe o modelo e o problema para agilizar o diagnóstico.',
    icon: Smartphone,
  },
  {
    title: 'Reparo garantido',
    description: 'Confirmamos o atendimento e devolvemos seu iPhone pronto.',
    icon: CheckCircle,
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 lg:py-32 bg-[#050505] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <h2 className="section-title text-gradient">Como funciona o atendimento.</h2>
          <p className="section-subtitle">Praticidade e rapidez em todas as etapas do processo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative group text-center lg:text-left">
                <div className="inline-flex w-16 h-16 rounded-3xl bg-white/5 border border-white/10 items-center justify-center text-apple-neon mb-6 relative z-10 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all">
                  <Icon size={32} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-apple-blue text-white text-xs font-bold flex items-center justify-center border-4 border-[#050505]">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-apple-neon transition-colors">{step.title}</h3>
                <p className="text-white/40 leading-relaxed">{step.description}</p>
                
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(64px+1.5rem)] w-[calc(100%-64px-3rem)] h-px bg-white/10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
