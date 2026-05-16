import { 
  Smartphone, 
  Battery, 
  Droplets, 
  Settings, 
  Power, 
  RefreshCw, 
  Calendar, 
  Package 
} from 'lucide-react';

const services = [
  {
    title: 'Troca de Tela',
    description: 'Telas de qualidade para todos os modelos de iPhone, com acabamento preciso.',
    icon: Smartphone,
  },
  {
    title: 'Troca de Bateria',
    description: 'Recupere a autonomia do seu aparelho com segurança.',
    icon: Battery,
  },
  {
    title: 'Reparo por Líquidos',
    description: 'Diagnóstico e recuperação de aparelhos que tiveram contato com água.',
    icon: Droplets,
  },
  {
    title: 'Manutenção Preventiva',
    description: 'Limpeza interna e checkup completo para evitar problemas futuros.',
    icon: Settings,
  },
  {
    title: 'Troca de Conector',
    description: 'Reparo de carregamento, conector, áudio e componentes relacionados.',
    icon: Power,
  },
  {
    title: 'Atualização de Sistema',
    description: 'Configuração, backup e atualização do iOS com segurança.',
    icon: RefreshCw,
  },
  {
    title: 'Agendamento Online',
    description: 'Escolha um horário disponível e agilize seu atendimento.',
    icon: Calendar,
  },
  {
    title: 'Acessórios Premium',
    description: 'Capas, carregadores, fones e acessórios selecionados.',
    icon: Package,
  },
];

export function ServicesSection() {
  return (
    <section id="servicos" className="py-24 lg:py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="section-title">Especialista em tudo o que seu iPhone precisa.</h2>
          <p className="section-subtitle">Reparos rápidos realizados por quem entende de hardware Apple.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.title} 
                className="glass-card glass-card-hover p-8 group flex flex-col items-center text-center animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-apple-blue mb-6 group-hover:scale-110 group-hover:bg-apple-blue group-hover:text-white transition-all duration-300">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/40 leading-relaxed text-sm">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
