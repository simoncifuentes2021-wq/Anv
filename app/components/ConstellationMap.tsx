'use client';

import type { Constellation } from '../../src/data/relationship';

type Props = {
  constellations: Constellation[];
  visited: Set<string>;
  onSelect: (id: string) => void;
  onSecret: () => void;
  onFuture: () => void;
};

export function ConstellationMap({ constellations, visited, onSelect, onSecret, onFuture }: Props) {
  const unlocked = visited.size === constellations.length;
  return (
    <section className="map-section" aria-labelledby="map-title">
      <div className="section-heading">
        <p className="overline">Nuestro atlas celeste</p>
        <h2 id="map-title">Cinco constelaciones.<br /><em>Una misma historia.</em></h2>
        <p>Elige una estrella para abrir un año. Cada etapa guarda tres recuerdos que puedes convertir en los tuyos.</p>
      </div>

      <div className="constellation-map">
        <div className="map-path" aria-hidden="true" />
        {constellations.map((constellation, index) => (
          <button
            type="button"
            key={constellation.id}
            className={`constellation-node node-${index + 1} ${visited.has(constellation.id) ? 'is-visited' : ''}`}
            onClick={() => onSelect(constellation.id)}
            style={{ '--node-accent': constellation.accent } as React.CSSProperties}
            aria-label={`Explorar ${constellation.name}, ${constellation.year}`}
          >
            <span className="node-number">{constellation.number}</span>
            <span className="node-sky" aria-hidden="true"><i /><i /><i /><i /><i /><b className="orbiting-spark" /></span>
            <span className="node-copy"><small>{constellation.year}</small><strong>{constellation.name}</strong><em>{visited.has(constellation.id) ? 'Explorada' : 'Por descubrir'} <b>↗</b></em></span>
            <span className="node-signal" aria-hidden="true"><i /></span>
          </button>
        ))}

        <button type="button" className="secret-star" onClick={onSecret} aria-label="Explorar una estrella diferente"><span>✦</span></button>
      </div>

      <button type="button" className={`future-gate ${unlocked ? 'is-unlocked' : ''}`} onClick={onFuture} disabled={!unlocked}>
        <span className="gate-orbit" aria-hidden="true"><i /></span>
        <span><small>{unlocked ? 'Portal abierto' : `${visited.size} de ${constellations.length} constelaciones`}</small><strong>El sexto año</strong><em>{unlocked ? 'Cruzar el umbral →' : 'Explora todos los años para desbloquearlo'}</em></span>
      </button>
    </section>
  );
}
