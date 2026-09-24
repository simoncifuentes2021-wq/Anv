'use client';

import { useEffect, useState } from 'react';
import type { Memory } from '../../src/data/relationship';

export function MemoryModal({ memory, onClose }: { memory: Memory; onClose: () => void }) {
  const [imageFailed, setImageFailed] = useState(/recuerdo-\d+\./.test(memory.image));
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', close);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', close); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <article className="memory-modal" role="dialog" aria-modal="true" aria-labelledby="memory-title">
        <button className="modal-close" onClick={onClose} type="button" aria-label="Cerrar recuerdo">×</button>
        <div className="memory-media">
          {memory.video ? <video src={memory.video} controls poster={memory.image} /> : !imageFailed && (
            // A native image keeps user-supplied local paths simple and portable.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={memory.image} alt={`Fotografía de ${memory.title}`} onError={() => setImageFailed(true)} />
          )}
          {(imageFailed || (!memory.image && !memory.video)) && <div className="media-placeholder"><span>✦</span><small>Añade aquí tu fotografía</small><code>{memory.image}</code></div>}
          <span className="memory-index">RECUERDO</span>
        </div>
        <div className="memory-body">
          <p className="memory-meta">{memory.date}<span />{memory.place}</p>
          <h2 id="memory-title">{memory.title}</h2>
          <p>{memory.description}</p>
          <blockquote>“{memory.quote}”</blockquote>
        </div>
      </article>
    </div>
  );
}
