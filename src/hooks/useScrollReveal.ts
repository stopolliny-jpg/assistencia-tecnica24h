import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal single elements (.motion-reveal)
      gsap.utils.toArray<HTMLElement>('.motion-reveal').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // 2. Reveal card groups with stagger (.motion-card-group & .motion-card)
      gsap.utils.toArray<HTMLElement>('.motion-card-group').forEach((group) => {
        const cards = group.querySelectorAll('.motion-card');
        if (cards.length > 0) {
          gsap.fromTo(cards,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: group,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }
      });

      // 3. Title & Subtitle reveals
      gsap.utils.toArray<HTMLElement>('.motion-title').forEach((title) => {
        gsap.fromTo(title,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      // 4. Form inputs stagger reveal (.motion-form)
      gsap.utils.toArray<HTMLElement>('.motion-form').forEach((form) => {
        const fields = form.querySelectorAll('input, select, textarea, button, label');
        if (fields.length > 0) {
          gsap.fromTo(fields,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: form,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }
      });

      // 5. Parallax effect (.motion-parallax)
      gsap.utils.toArray<HTMLElement>('.motion-parallax').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.12');
        gsap.to(el, {
          yPercent: -100 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });

    });

    return () => ctx.revert();
  }, []);
}
export default useScrollReveal;
