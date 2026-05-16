import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    id: "init",
    title: "Seu iPhone por Inteiro",
    tag: "Engenharia Apple",
    description: "Um ecossistema de alta tecnologia onde cada componente é projetado para trabalhar em perfeita harmonia.",
    bgPos: "0% 0%",
    highlight: null,
  },
  {
    id: "diagnostic",
    title: "Diagnóstico Rápido",
    tag: "Avaliação Completa",
    description: "Realizamos testes avançados para identificar falhas ocultas antes de iniciar qualquer intervenção física.",
    bgPos: "50% 0%",
    highlight: { x: "15%", y: "15%", w: "70%", h: "70%", label: "Varredura do Sistema" },
  },
  {
    id: "opening",
    title: "Abertura com Cuidado",
    tag: "Processo Técnico",
    description: "Seu aparelho é aberto utilizando ferramentas calibradas sob a temperatura correta para manter as vedações originais.",
    bgPos: "100% 0%",
    highlight: { x: "5%", y: "5%", w: "90%", h: "90%", label: "Descolamento de Chassis" },
  },
  {
    id: "battery",
    title: "Bateria e Autonomia",
    tag: "Troca Homologada",
    description: "Substituição da bateria por células de alta qualidade, garantindo que o iOS reporte 100% de saúde e excelente autonomia.",
    bgPos: "0% 50%",
    highlight: { x: "18%", y: "20%", w: "32%", h: "60%", label: "Módulo de Bateria" },
  },
  {
    id: "logic-board",
    title: "Placa Lógica e Conexões",
    tag: "Microeletrônica",
    description: "Reparos avançados em circuitos integrados, soldagem de chips e reconstrução de conexões rompidas.",
    bgPos: "50% 50%",
    highlight: { x: "52%", y: "15%", w: "30%", h: "65%", label: "Placa Lógica A17 Pro" },
  },
  {
    id: "camera",
    title: "Câmeras e Carregamento",
    tag: "Restauração Completa",
    description: "Ajuste de autofoco, substituição de lentes trincadas e reparo dos módulos de câmera e conector de carga.",
    bgPos: "100% 50%",
    highlight: { x: "50%", y: "8%", w: "35%", h: "22%", label: "Sensores de Câmera" },
  },
  {
    id: "details",
    title: "Cada Detalhe Importa",
    tag: "Qualidade Apple",
    description: "Instalação de blindagens, substituição de parafusos específicos e vedação certificada contra água e poeira.",
    bgPos: "0% 100%",
    highlight: { x: "15%", y: "78%", w: "70%", h: "18%", label: "Vedação e Parafusos" },
  },
  {
    id: "final",
    title: "Pronto para a Rotina",
    tag: "Suporte e Garantia",
    description: "Seu iPhone é montado, totalmente testado e devolvido com 90 dias de garantia para você usar com tranquilidade.",
    bgPos: "50% 100%",
    highlight: null,
  }
];

export function PhoneDisassemblyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth < 768) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=500%', // 500vh scroll depth
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Camera dynamic zoom-in effect on scroll
      tl.to('.hud-image-viewport', { scale: 1.08, duration: 7 }, 0);

      STAGES.forEach((_, idx) => {
        if (idx === 0) return;
        const stepLabel = `step${idx}`;

        // Transition frames
        tl.to(`.phone-frame-${idx - 1}`, { opacity: 0, duration: 1 }, stepLabel)
          .to(`.phone-frame-${idx}`, { opacity: 1, duration: 1 }, stepLabel);

        // Transition HUD box overlay
        if (STAGES[idx - 1].highlight) {
          tl.to(`.hud-box-${idx - 1}`, { opacity: 0, scale: 0.95, duration: 0.4 }, stepLabel);
        }
        if (STAGES[idx].highlight) {
          tl.fromTo(`.hud-box-${idx}`, 
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
            `${stepLabel}+=0.3`
          );
        }

        // Transition texts
        tl.to(`.stage-text-${idx - 1}`, { opacity: 0, y: -25, duration: 0.5 }, stepLabel)
          .fromTo(`.stage-text-${idx}`, 
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.5 }, 
            `${stepLabel}+=0.3`
          );

        // Progress bar fill
        const pct = (idx / (STAGES.length - 1)) * 100;
        tl.to('.progress-fill', { height: `${pct}%`, duration: 0.5 }, stepLabel);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="phone-motion" ref={containerRef} className="relative bg-black border-y border-white/5 overflow-hidden">
      
      {/* DESKTOP STICKY SCROLL SECTION */}
      <div ref={triggerRef} className="h-screen w-full relative hidden md:flex items-center justify-center overflow-hidden">
        
        {/* Cinematic Backdrop Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 z-0" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-apple-blue/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl w-full h-full mx-auto px-12 flex items-center justify-between z-10 relative">
          
          {/* LEFT COLUMN: THE PHONE CONTAINER */}
          <div className="w-[55%] h-full flex items-center justify-center relative select-none">
            
            <div className="hud-image-viewport relative w-full max-w-[500px] lg:max-w-[550px] aspect-[3/2] overflow-hidden rounded-[2.5rem] border border-white/10 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.9)] transform transition-transform duration-300">
              
              {/* Stacked Absolute Spritesheet Frames */}
              {STAGES.map((stage, idx) => (
                <div
                  key={stage.id}
                  className={`phone-frame-${idx} absolute inset-0 w-full h-full bg-[url('/phone-disassembly.png')] bg-[length:300%_300%] bg-no-repeat transition-opacity duration-300`}
                  style={{
                    backgroundPosition: stage.bgPos,
                    opacity: idx === 0 ? 1 : 0,
                    zIndex: 10 + idx,
                  }}
                />
              ))}

              {/* HUD OVERLAY */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                {STAGES.map((stage, idx) => {
                  if (!stage.highlight) return null;
                  const h = stage.highlight;
                  return (
                    <div
                      key={stage.id}
                      className={`hud-box-${idx} absolute border border-apple-neon/80 border-dashed rounded-2xl bg-apple-blue/5 flex flex-col justify-between p-3 transition-all duration-300`}
                      style={{
                        left: h.x,
                        top: h.y,
                        width: h.w,
                        height: h.h,
                        opacity: 0, // Animated by GSAP
                      }}
                    >
                      {/* Bounding box label */}
                      <span className="absolute -top-7 left-0 bg-apple-neon/20 border border-apple-neon/30 text-apple-neon text-[10px] font-black py-0.5 px-3 rounded-full uppercase tracking-wider backdrop-blur-md whitespace-nowrap shadow-xl">
                        {h.label}
                      </span>
                      
                      {/* High-tech Glowing Corners */}
                      <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-apple-neon" />
                      <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-apple-neon" />
                      <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-apple-neon" />
                      <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-apple-neon" />
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: SYNCHRONIZED STEP TEXTS */}
          <div className="w-[40%] h-full flex flex-col justify-center relative pl-12 border-l border-white/5">
            
            {/* PROGRESS INDICATOR BAR */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[320px] bg-white/10 rounded-full overflow-hidden">
              <div className="progress-fill w-full h-0 bg-gradient-to-b from-apple-blue to-apple-neon transition-all duration-200" />
            </div>

            <div className="relative h-[280px] w-full flex items-center">
              {STAGES.map((stage, idx) => (
                <div
                  key={stage.id}
                  className={`stage-text-${idx} absolute inset-0 flex flex-col justify-center pointer-events-none`}
                  style={{ opacity: idx === 0 ? 1 : 0 }}
                >
                  <span className="text-apple-neon font-bold text-xs uppercase tracking-widest mb-3 block">
                    {stage.tag}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight">
                    {stage.title}
                  </h3>
                  <p className="text-lg text-white/50 leading-relaxed max-w-md font-medium">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* MOBILE VERSION: LIGHTWEIGHT CARD TIMELINE USING REAL IMAGES */}
      <div className="md:hidden bg-zinc-950 py-24 px-6 border-t border-white/5 relative z-10">
        <div className="mb-16 text-center max-w-md mx-auto">
          <span className="inline-block py-1 px-3 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-apple-neon mb-4">
            Processo de Reparo
          </span>
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">O que fazemos por dentro.</h2>
          <p className="text-sm text-white/40 leading-relaxed">Conheça nosso processo técnico de reparo certificado para cada etapa do seu iPhone.</p>
        </div>

        <div className="space-y-12 max-w-md mx-auto">
          {STAGES.map((stage) => (
            <div 
              key={stage.id} 
              className="glass-card p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors flex flex-col gap-6"
            >
              {/* Top border ambient glow */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-apple-blue/40 to-transparent opacity-60" />
              
              {/* Cropped Sprite Frame */}
              <div 
                className="w-full aspect-[3/2] bg-[url('/phone-disassembly.png')] bg-[length:300%_300%] bg-no-repeat rounded-xl border border-white/10 shadow-2xl relative"
                style={{ backgroundPosition: stage.bgPos }}
              >
                {/* HUD Overlay inside mobile image */}
                {stage.highlight && (
                  <div 
                    className="absolute border border-apple-neon/60 border-dashed rounded-lg bg-apple-blue/5 flex items-center justify-center"
                    style={{
                      left: stage.highlight.x,
                      top: stage.highlight.y,
                      width: stage.highlight.w,
                      height: stage.highlight.h,
                    }}
                  >
                    <span className="bg-apple-neon/20 border border-apple-neon/30 text-apple-neon text-[7px] font-black py-0.5 px-1.5 rounded-full uppercase tracking-wider scale-75 origin-center">
                      {stage.highlight.label}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <span className="text-xs font-bold text-apple-neon uppercase tracking-widest mb-2 block">
                  {stage.tag}
                </span>
                <h3 className="text-2xl font-bold text-white mb-3">{stage.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
