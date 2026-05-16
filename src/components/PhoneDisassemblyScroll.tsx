import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhoneExplodedView } from './PhoneExplodedView';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: '📱',
    title: 'Tela',
    description: 'Troca com peça de qualidade e acabamento preciso. Vidro temperado original.',
  },
  {
    icon: '🔋',
    title: 'Bateria',
    description: 'Autonomia restaurada com segurança. Células de alta densidade certificadas.',
  },
  {
    icon: '⚡',
    title: 'Conector',
    description: 'Carregamento estável novamente. Conector Lightning/USB-C genuíno.',
  },
  {
    icon: '🔬',
    title: 'Placa Lógica',
    description: 'Diagnóstico técnico profissional. Identificação microscópica de falhas.',
  },
  {
    icon: '🔄',
    title: 'Sistema',
    description: 'Backup, atualização e configuração segura do iOS.',
  },
];

export function PhoneDisassemblyScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneWrapperRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const phoneBodyRef = useRef<SVGGElement>(null);
  const screenRef = useRef<SVGGElement>(null);
  const batteryRef = useRef<SVGGElement>(null);
  const logicBoardRef = useRef<SVGGElement>(null);
  const cameraRef = useRef<SVGGElement>(null);
  const connectorRef = useRef<SVGGElement>(null);
  const screwsRef = useRef<SVGGElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Mobile uses CSS-only version

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: phoneWrapperRef.current,
          pinSpacing: false,
        },
      });

      // Step 0 → 1: Screen separates to the left
      tl.to(
        screenRef.current,
        { x: -90, rotateY: -15, opacity: 0.85, ease: 'none' },
        0
      );
      tl.to(stepRefs.current[0], { opacity: 1, x: 0, ease: 'none' }, 0);

      // Step 1 → 2: Battery slides right
      tl.to(
        batteryRef.current,
        { x: 90, rotateY: 15, opacity: 0.9, ease: 'none' },
        0.2
      );
      tl.to(stepRefs.current[0], { opacity: 0, ease: 'none' }, 0.18);
      tl.to(stepRefs.current[1], { opacity: 1, x: 0, ease: 'none' }, 0.22);

      // Step 2 → 3: Connector slides down
      tl.to(
        connectorRef.current,
        { y: 60, opacity: 0.9, ease: 'none' },
        0.38
      );
      tl.to(stepRefs.current[1], { opacity: 0, ease: 'none' }, 0.36);
      tl.to(stepRefs.current[2], { opacity: 1, x: 0, ease: 'none' }, 0.4);

      // Step 3 → 4: Logic board rises
      tl.to(
        logicBoardRef.current,
        { y: -50, opacity: 1, ease: 'none' },
        0.54
      );
      tl.to(stepRefs.current[2], { opacity: 0, ease: 'none' }, 0.52);
      tl.to(stepRefs.current[3], { opacity: 1, x: 0, ease: 'none' }, 0.56);

      // Step 4 → 5: Camera separates up-right
      tl.to(
        cameraRef.current,
        { x: 60, y: -50, opacity: 1, ease: 'none' },
        0.7
      );
      tl.to(stepRefs.current[3], { opacity: 0, ease: 'none' }, 0.68);
      tl.to(stepRefs.current[4], { opacity: 1, x: 0, ease: 'none' }, 0.72);

      // Final: screws appear, everything settles
      tl.to(
        screwsRef.current,
        { opacity: 1, ease: 'none' },
        0.82
      );
      tl.to(stepRefs.current[4], { opacity: 0, ease: 'none' }, 0.84);
      tl.to(finalTextRef.current, { opacity: 1, y: 0, ease: 'none' }, 0.88);

      // Phone body subtle pulse at end
      tl.to(
        phoneBodyRef.current,
        { filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.3))', ease: 'none' },
        0.9
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Initial state for animation targets
  useEffect(() => {
    if (prefersReducedMotion) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Set initial hidden states for step labels
    stepRefs.current.forEach((el) => {
      if (el) {
        gsap.set(el, { opacity: 0, x: 30 });
      }
    });
    if (finalTextRef.current) {
      gsap.set(finalTextRef.current, { opacity: 0, y: 20 });
    }
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="desmontagem"
      className="relative bg-black"
      style={{ height: '500vh' }}
      aria-label="Animação de desmontagem do iPhone mostrando componentes"
    >
      {/* DESKTOP: sticky phone + animated text */}
      <div
        ref={phoneWrapperRef}
        className="hidden md:flex sticky top-0 h-screen w-full items-center justify-center overflow-hidden"
        style={{ zIndex: 10 }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-apple-blue/8 rounded-full blur-[80px]" />
        </div>

        {/* Section header */}
        <div className="absolute top-12 left-0 right-0 text-center px-4">
          <p className="text-apple-neon text-sm font-semibold tracking-widest uppercase mb-2">
            Precisão técnica
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Cada componente. Cada detalhe.
          </h2>
        </div>

        {/* iPhone */}
        <div className="relative flex items-center justify-center w-full max-w-sm h-[520px]">
          <PhoneExplodedView
            refs={{
              phoneBody: phoneBodyRef,
              screen: screenRef,
              battery: batteryRef,
              logicBoard: logicBoardRef,
              camera: cameraRef,
              connector: connectorRef,
              screws: screwsRef,
            }}
          />
        </div>

        {/* Step labels (desktop) */}
        <div
          ref={stepsContainerRef}
          className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 flex flex-col gap-6 max-w-xs"
        >
          {steps.map((step, i) => (
            <div
              key={step.title}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="text-right"
              style={{ opacity: 0 }}
            >
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="text-lg">{step.icon}</span>
                <span className="text-apple-neon font-bold text-lg">{step.title}</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Final text */}
        <div
          ref={finalTextRef}
          className="absolute bottom-16 left-0 right-0 text-center px-8"
          style={{ opacity: 0 }}
        >
          <p className="text-lg lg:text-xl text-white/80 font-medium max-w-lg mx-auto leading-relaxed">
            Diagnóstico claro. Reparo preciso.{' '}
            <span className="text-apple-neon font-semibold">
              Seu iPhone pronto para voltar à rotina.
            </span>
          </p>
        </div>
      </div>

      {/* MOBILE: simple sequential cards */}
      <div className="md:hidden py-20 px-4">
        <div className="text-center mb-12">
          <p className="text-apple-neon text-sm font-semibold tracking-widest uppercase mb-2">
            Precisão técnica
          </p>
          <h2 className="text-3xl font-bold text-white">Cada componente. Cada detalhe.</h2>
        </div>

        {/* Simplified static iPhone for mobile */}
        <div className="flex justify-center mb-12">
          <PhoneExplodedView
            refs={{
              phoneBody: { current: null },
              screen: { current: null },
              battery: { current: null },
              logicBoard: { current: null },
              camera: { current: null },
              connector: { current: null },
              screws: { current: null },
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <span className="text-2xl flex-shrink-0">{step.icon}</span>
              <div>
                <h3 className="text-apple-neon font-bold mb-1">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/70 font-medium mt-10 text-lg">
          Diagnóstico claro. Reparo preciso.{' '}
          <span className="text-apple-neon font-semibold">
            Seu iPhone pronto para voltar à rotina.
          </span>
        </p>
      </div>
    </section>
  );
}
