import { MessageSquare, Calendar, ClipboardList, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Você escolhe uma data ou chama no WhatsApp.',
    description: 'Acesse o formulário abaixo, escolha a data que prefere ou nos chame diretamente pelo WhatsApp para atendimento imediato.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Calendar,
    number: '02',
    title: 'O sistema mostra os horários disponíveis.',
    description: 'Veja em tempo real os horários disponíveis para a data escolhida e selecione o mais conveniente para você.',
    color: 'text-apple-neon',
    bg: 'bg-apple-neon/10',
    border: 'border-apple-neon/20',
  },
  {
    icon: ClipboardList,
    number: '03',
    title: 'Você preenche os dados do aparelho.',
    description: 'Informe o modelo do iPhone, o problema que está enfrentando e seus dados de contato para agendarmos.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: CheckCircle,
    number: '04',
    title: 'A equipe confirma e realiza o reparo com garantia.',
    description: 'Nossos técnicos confirmam o agendamento, realizam o diagnóstico e entregam seu iPhone consertado com 90 dias de garantia.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 lg:py-32 bg-[#050505] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-apple-blue/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-apple-neon/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-apple-neon text-sm font-semibold tracking-widest uppercase mb-4">
            Processo simples
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Como funciona?
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Em 4 passos simples, seu iPhone está pronto para voltar à sua rotina.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-500/30 via-apple-neon/30 to-green-500/30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map(({ icon: Icon, number, title, description, color, bg, border }, i) => (
              <div key={number} className="relative flex flex-col items-center text-center lg:items-center">
                {/* Step number circle */}
                <div className={`relative z-10 w-14 h-14 rounded-2xl ${bg} border ${border} flex items-center justify-center mb-6 flex-shrink-0`}>
                  <Icon size={22} className={color} strokeWidth={1.5} />
                  <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black border ${border} flex items-center justify-center`}>
                    <span className={`text-[9px] font-bold ${color}`}>{i + 1}</span>
                  </div>
                </div>

                {/* Number label */}
                <span className={`text-4xl font-black ${color} opacity-20 mb-3 font-mono`}>
                  {number}
                </span>

                {/* Content */}
                <h3 className="text-white font-semibold text-base mb-3 leading-snug">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
