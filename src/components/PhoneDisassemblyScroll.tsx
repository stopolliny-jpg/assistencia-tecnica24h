import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhoneExplodedView } from './PhoneExplodedView';

gsap.registerPlugin(ScrollTrigger);

export function PhoneDisassemblyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Initial State: All stacked
      // 2. Screen moves up and fades slightly
      tl.to('#phone-screen', { y: '-120%', opacity: 0.3, scale: 1.05, duration: 2 }, 'step1')
        .from('.text-step-1', { opacity: 0, x: -50, duration: 1 }, 'step1');

      // 3. Camera module moves out
      tl.to('#phone-camera', { x: '80%', y: '-40%', scale: 1.2, duration: 2 }, 'step2')
        .to('.text-step-1', { opacity: 0, duration: 0.5 }, 'step2')
        .from('.text-step-2', { opacity: 0, x: 50, duration: 1 }, 'step2');

      // 4. Battery moves to the left
      tl.to('#phone-battery', { x: '-100%', rotate: -5, duration: 2 }, 'step3')
        .to('.text-step-2', { opacity: 0, duration: 0.5 }, 'step3')
        .from('.text-step-3', { opacity: 0, y: 30, duration: 1 }, 'step3');

      // 5. Logic Board moves to the right
      tl.to('#phone-logic-board', { x: '100%', rotate: 5, duration: 2 }, 'step4')
        .to('.text-step-3', { opacity: 0, duration: 0.5 }, 'step4')
        .from('.text-step-4', { opacity: 0, x: 50, duration: 1 }, 'step4');

      // 6. Connector module moves down
      tl.to('#phone-connector', { y: '120%', opacity: 0.5, duration: 2 }, 'step5')
        .to('.text-step-4', { opacity: 0, duration: 0.5 }, 'step5')
        .from('.text-step-5', { opacity: 0, scale: 0.8, duration: 1 }, 'step5');
        
      // 7. Final view
      tl.to('.text-step-5', { opacity: 0, duration: 0.5 }, 'final')
        .from('.text-final', { opacity: 0, y: 50, duration: 1 }, 'final');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black overflow-hidden hidden md:block">
      <div ref={triggerRef} className="h-screen w-full flex items-center justify-center relative px-4">
        
        {/* Texts - Absolute positions around the phone */}
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="max-w-7xl w-full h-full relative">
            
            {/* Step 1: Screen */}
            <div className="text-step-1 absolute left-10 top-1/4 max-w-xs opacity-0">
              <h3 className="text-3xl font-bold text-apple-neon mb-2">Tela Retina</h3>
              <p className="text-white/60">Troca com peça de alta fidelidade e calibração de cores original.</p>
            </div>

            {/* Step 2: Camera */}
            <div className="text-step-2 absolute right-10 top-1/3 max-w-xs opacity-0">
              <h3 className="text-3xl font-bold text-apple-neon mb-2">Lentes & Foco</h3>
              <p className="text-white/60">Recuperação de foco e limpeza interna de sensores.</p>
            </div>

            {/* Step 3: Battery */}
            <div className="text-step-3 absolute left-10 bottom-1/4 max-w-xs opacity-0">
              <h3 className="text-3xl font-bold text-apple-neon mb-2">Energia</h3>
              <p className="text-white/60">Baterias de alta densidade com ciclo de vida prolongado.</p>
            </div>

            {/* Step 4: Logic Board */}
            <div className="text-step-4 absolute right-10 bottom-1/3 max-w-xs opacity-0">
              <h3 className="text-3xl font-bold text-apple-neon mb-2">Placa Lógica</h3>
              <p className="text-white/60">Reparos em micro-soldagem e diagnósticos avançados de IC.</p>
            </div>

            {/* Step 5: Connector */}
            <div className="text-step-5 absolute left-1/2 -translate-x-1/2 bottom-20 text-center max-w-md opacity-0">
              <h3 className="text-3xl font-bold text-apple-neon mb-2">Conectividade</h3>
              <p className="text-white/60">Restauração de carga rápida e transmissão de dados estável.</p>
            </div>

            {/* Final Text */}
            <div className="text-final absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Diagnóstico Claro.<br/>Reparo Preciso.</h2>
              <p className="text-xl text-white/50 max-w-2xl">
                Seu iPhone pronto para voltar à rotina com a performance que você espera.
              </p>
            </div>

          </div>
        </div>

        {/* The Phone */}
        <PhoneExplodedView />
      </div>

      {/* Mobile Fallback Placeholder for the same section space if needed, 
          but usually we just hide this section on mobile and show simple cards */}
    </div>
  );
}
