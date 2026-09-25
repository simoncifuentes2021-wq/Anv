'use client';

import { useEffect, useRef } from 'react';

export function MotionEffects({ scene }: { scene: string }) {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let glowX = targetX;
    let glowY = targetY;
    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    };
    const render = () => {
      glowX += (targetX - glowX) * .075;
      glowY += (targetY - glowY) * .075;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
      frame = requestAnimationFrame(render);
    };
    window.addEventListener('pointermove', move, { passive: true });
    frame = requestAnimationFrame(render);
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const timer = window.setTimeout(() => {
      const elements = [...document.querySelectorAll<HTMLElement>('.section-heading, .constellation-node, .future-gate, .story-header, .memory-card, .ludo-secret-trigger, .future-capsule, .final-question, .site-footer')];
      elements.forEach((element, index) => {
        element.classList.add('reveal-ready');
        element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 3) * 90}ms`);
      });
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); sectionObserver.unobserve(entry.target); }
        });
      }, { threshold: .12, rootMargin: '0px 0px -7% 0px' });
      observer = sectionObserver;
      elements.forEach((element) => sectionObserver.observe(element));
    }, 40);
    return () => { window.clearTimeout(timer); observer?.disconnect(); };
  }, [scene]);

  useEffect(() => {
    const cards = [...document.querySelectorAll<HTMLElement>('.memory-card')];
    const cleanups = cards.map((card) => {
      const move = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--tilt-x', `${((event.clientY - rect.top) / rect.height - .5) * -7}deg`);
        card.style.setProperty('--tilt-y', `${((event.clientX - rect.left) / rect.width - .5) * 7}deg`);
        card.style.setProperty('--glow-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty('--glow-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
      };
      const leave = () => { card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg'); };
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerleave', leave);
      return () => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave); };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [scene]);

  return (
    <div className="motion-effects" aria-hidden="true">
      <div className="cursor-glow" ref={glowRef} />
      <div className="cursor-dot" ref={dotRef} />
      <div className="nebula nebula-a" /><div className="nebula nebula-b" /><div className="nebula nebula-c" />
      <div className="shooting-stars"><i /><i /><i /><i /></div>
      <div className="light-ribbons"><i /><i /></div>
    </div>
  );
}
