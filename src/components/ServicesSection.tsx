import { 
  Smartphone, 
  Battery, 
  Droplets, 
  Settings, 
  Power, 
  RefreshCw, 
  Calendar, 
  Package,
  ChevronRight
} from 'lucide-react';

const services = [
  {
    title: 'Troca de Tela',
    description: 'Displays de alta fidelidade com calibração True Tone original.',
    icon: Smartphone,
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    title: 'Troca de Bateria',
    description: 'Células premium que restauram 100% da saúde do seu iPhone.',
    icon: Battery,
    color: 'from-green-500/20 to-emerald-500/20'
  },
  {
    title: 'Reparo por Líquidos',
    description: 'Limpeza química ultrassônica para aparelhos oxidados.',
    icon: Droplets,
    color: 'from-blue-600/20 to-indigo-600/20'
  },
  {
    title: 'Manutenção Preventiva',
    description: 'Checkup completo de sensores, áudio e vedação interna.',
    icon: Settings,
    color: 'from-orange-500/20 to-red-500/20'
  },
  {
    title: 'Troca de Conector',
    description: 'Restauração de carga estável e sincronização de dados.',
    icon: Power,
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    title: 'Atualização & Software',
    description: 'Recuperação de sistema, backups e otimização do iOS.',
    icon: RefreshCw,
    color: 'from-indigo-500/20 to-blue-500/20'
  },
  {
    title: 'Agendamento Online',
    description: 'Garanta sua vaga e evite filas com nosso sistema inteligente.',
    icon: Calendar,
    color: 'from-yellow-500/20 to-orange-500/20'
  },
  {
    title: 'Acessórios Premium',
    description: 'Linha selecionada de cabos MFi e capas de proteção real.',
    icon: Package,
    color: 'from-slate-500/20 to-zinc-500/20'
  },
];

export function ServicesSection() {
  return (
    <section id="servicos" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Tudo o que seu <span className="text-apple-blue">iPhone</span> precisa.</h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium">Soluções técnicas avançadas com peças de padrão original.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.title} 
                className="group relative glass-card p-10 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,113,227,0.2)]"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Background Glow Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-apple-blue mb-8 group-hover:bg-apple-blue group-hover:text-white transition-all duration-300 shadow-xl">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">{service.title}</h3>
                  <p className="text-white/40 leading-relaxed text-base group-hover:text-white/60 transition-colors mb-6">{service.description}</p>
                  
                  <div className="flex items-center gap-2 text-apple-blue font-bold text-sm opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                    Saiba mais <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
