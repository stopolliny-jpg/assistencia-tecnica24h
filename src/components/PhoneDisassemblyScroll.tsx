import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    title: "Diagnóstico rápido para o seu iPhone.",
    description: "Atendimento especializado com avaliação transparente e precisa.",
    // Coordinates: Top Left
    pos: '0% 0%',
  },
  {
    title: "Abertura técnica com cuidado.",
    description: "Equipamentos de precisão para garantir a integridade dos selos internos.",
    // Coordinates: Top Center
    pos: '50% 0%',
  },
  {
    title: "Inspeção de componentes.",
    description: "Análise profunda de cada conector e barramento de dados.",
    // Coordinates: Top Right
    pos: '100% 0%',
  },
  {
    title: "Troca de bateria segura.",
    description: "Restauração completa da autonomia com células de alta densidade.",
    // Coordinates: Mid Left
    pos: '0% 48%',
  },
  {
    title: "Análise da Placa Lógica.",
    description: "Reparos em nível de componente e micro-soldagem avançada.",
    // Coordinates: Mid Center
    pos: '35% 48%',
  },
  {
    title: "Reparo de Câmeras e Sensores.",
    description: "Recuperação de foco, estabilização e nitidez original.",
    // Coordinates: Mid Right
    pos: '68% 44%',
  },
  {
    title: "Exploded View Técnica.",
    description: "Cada detalhe analisado minuciosamente antes da remontagem.",
    // Coordinates: Mid Right Bottom-ish
    pos: '100% 55%',
  },
  {
    title: "Seu iPhone pronto.",
    description: "Remontagem precisa e testes de qualidade rigorosos.",
    // Coordinates: Bottom Center
    pos: '50% 95%',
  },
];

export function PhoneDisassemblyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=500%',
          pin: true,
          scrub: 1,
        },
      });

      STAGES.forEach((_, index) => {
        if (index === 0) return;

        // Crossfade between frames
        tl.to(`.frame-${index - 1}`, { opacity: 0, duration: 1 }, `step${index}`)
          .to(`.frame-${index}`, { opacity: 1, duration: 1 }, `step${index}`)
          // Text animation
          .to(`.text-stage-${index - 1}`, { opacity: 0, y: -20, duration: 0.5 }, `step${index}`)
          .fromTo(`.text-stage-${index}`, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.5 }, 
            `step${index}+=0.5`
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-black">
      <div ref={triggerRef} className="h-screen w-full relative hidden md:flex items-center justify-center overflow-hidden">
        
        {/* Background Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-apple-blue/5 rounded-full blur-[150px]" />
        </div>

        {/* Frames Layer */}
        <div className="relative w-full max-w-5xl aspect-video z-10">
          {STAGES.map((stage, index) => (
            <div
              key={index}
              className={`frame-${index} absolute inset-0 transition-opacity duration-300 pointer-events-none`}
              style={{
                backgroundImage: "url('/src/assets/phone-disassembly/phone-frames.png')",
                backgroundSize: '320%', // Zoom in to see one frame at a time
                backgroundPosition: stage.pos,
                backgroundRepeat: 'no-repeat',
                opacity: index === 0 ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* Text Overlay Layer */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 pointer-events-none">
          <div className="max-w-2xl w-full text-center px-6">
            {STAGES.map((stage, index) => (
              <div 
                key={index} 
                className={`text-stage-${index} absolute bottom-24 left-1/2 -translate-x-1/2 w-full px-6 transition-all duration-500 ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
              >
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                  {stage.title}
                </h3>
                <p className="text-xl text-white/50 max-w-xl mx-auto">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
           {STAGES.map((_, i) => (
             <div key={i} className="w-1 h-8 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full bg-apple-blue transition-all duration-300 opacity-0`} />
             </div>
           ))}
        </div>
      </div>

      {/* Mobile Version - Responsive Cards */}
      <div className="md:hidden bg-black py-24 px-6 border-t border-white/5">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">O que fazemos por dentro.</h2>
          <p className="text-white/40">Conheça nosso processo técnico detalhado.</p>
        </div>
        
        <div className="space-y-12">
          {STAGES.map((stage, index) => (
            <div key={index} className="glass-card p-6 overflow-hidden">
              <div 
                className="w-full aspect-video rounded-2xl mb-8 bg-no-repeat bg-center"
                style={{
                  backgroundImage: "url('/src/assets/phone-disassembly/phone-frames.png')",
                  backgroundSize: '320%',
                  backgroundPosition: stage.pos,
                }}
              />
              <h3 className="text-2xl font-bold text-white mb-3">{stage.title}</h3>
              <p className="text-white/50 leading-relaxed">{stage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
