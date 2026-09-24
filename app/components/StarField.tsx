'use client';

import { useEffect, useMemo, useState } from 'react';

export function StarField() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const stars = useMemo(() => Array.from({ length: 92 }, (_, index) => ({
    id: index,
    left: (index * 37 + 11) % 100,
    top: (index * 61 + 7) % 100,
    delay: (index % 11) * .38,
    duration: 3.1 + (index % 5) * .7,
    size: index % 13 === 0 ? 3 : index % 4 === 0 ? 2 : 1,
    depth: (index % 3) + 1,
  })), []);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      setOffset({ x: (event.clientX / window.innerWidth - .5) * 8, y: (event.clientY / window.innerHeight - .5) * 8 });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div className="star-field" aria-hidden="true">
      {stars.map((star) => (
        <i key={star.id} className="star" style={{
          left: `${star.left}%`, top: `${star.top}%`, width: star.size, height: star.size,
          animationDelay: `${star.delay}s`, animationDuration: `${star.duration}s`,
          translate: `${offset.x * star.depth * .2}px ${offset.y * star.depth * .2}px`,
        }} />
      ))}
    </div>
  );
}
