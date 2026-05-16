import {
  Monitor,
  BatteryCharging,
  Droplets,
  Wrench,
  Zap,
  RefreshCw,
  CalendarCheck,
  ShoppingBag,
} from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: 'Troca de Tela',
    description: 'Telas de qualidade para todos os modelos de iPhone, com acabamento preciso.',
    color: 'from-blue-500/20 to-blue-600/5',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: BatteryCharging,
    title: 'Troca de Bateria',
    description: 'Recupere a autonomia do seu aparelho com segurança.',
    color: 'from-green-500/20 to-green-600/5',
    border: 'border-green-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: Droplets,
    title: 'Reparo por Líquidos',
    description: 'Diagnóstico e recuperação de aparelhos que tiveram contato com água.',
    color: 'from-cyan-500/20 to-cyan-600/5',
    border: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Wrench,
    title: 'Manutenção Preventiva',
    description: 'Limpeza interna e checkup completo para evitar problemas futuros.',
    color: 'from-orange-500/20 to-orange-600/5',
    border: 'border-orange-500/20',
    iconColor: 'text-orange-400',
  },
  {
    icon: Zap,
    title: 'Troca de Conector',
    description: 'Reparo de carregamento, conector, áudio e componentes relacionados.',
    color: 'from-yellow-500/20 to-yellow-600/5',
    border: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    icon: RefreshCw,
    title: 'Atualização de Sistema',
    description: 'Configuração, backup e atualização do iOS com segurança.',
    color: 'from-purple-500/20 to-purple-600/5',
    border: 'border-purple-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: CalendarCheck,
    title: 'Agendamento Online',
    description: 'Escolha um horário disponível e agilize seu atendimento.',
    color: 'from-apple-blue/20 to-apple-blue/5',
    border: 'border-apple-blue/20',
    iconColor: 'text-apple-blue',
  },
  {
    icon: ShoppingBag,
    title: 'Acessórios Premium',
    description: 'Capas, carregadores, fones e acessórios selecionados.',
    color: 'from-pink-500/20 to-pink-600/5',
    border: 'border-pink-500/20',
    iconColor: 'text-pink-400',
  },
];

export function ServicesSection() {
  return (
    <section id="servicos" className="py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-apple-neon text-sm font-semibold tracking-widest uppercase mb-4">
            Nossos serviços
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Tudo que seu iPhone precisa
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Serviços especializados com peças de qualidade e técnicos certificados.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {services.map(({ icon: Icon, title, description, color, border, iconColor }) => (
            <div
              key={title}
              className={`
                group relative p-6 rounded-2xl border ${border}
                bg-gradient-to-br ${color}
                backdrop-blur-sm
                hover:scale-[1.02] hover:border-white/20
                transition-all duration-300 cursor-default
              `}
            >
              {/* Icon */}
              <div className={`${iconColor} mb-4 transition-transform duration-300 group-hover:-translate-y-1`}>
                <Icon size={28} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="text-white font-semibold text-base mb-2 leading-tight">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{description}</p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
