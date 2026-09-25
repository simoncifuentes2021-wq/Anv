'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { relationship, type Constellation, type Memory } from '../../src/data/relationship';
import { StarField } from './StarField';
import { TimeTogether } from './TimeTogether';
import { MemoryModal } from './MemoryModal';
import { ConstellationMap } from './ConstellationMap';
import { MotionEffects } from './MotionEffects';

const STORAGE_KEY = 'nuestro-universo-progress-v1';

function mainPhrase() {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(relationship.startDate)) return relationship.mainPhrase;
  const start = new Date(`${relationship.startDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return relationship.mainPhrase;
  const days = Math.max(0, Math.floor((Date.now() - start.getTime()) / 86_400_000));
  return `Hace ${new Intl.NumberFormat('es-CL').format(days)} días comenzó nuestro universo.`;
}

function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<{ context: AudioContext; gain: GainNode; oscillators: OscillatorNode[] } | null>(null);

  const toggle = () => {
    if (playing && audioRef.current) {
      audioRef.current.gain.gain.setTargetAtTime(0, audioRef.current.context.currentTime, .25);
      window.setTimeout(() => audioRef.current?.context.close(), 700);
      audioRef.current = null;
      setPlaying(false);
      return;
    }
    const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    const context = new AudioCtor();
    const gain = context.createGain();
    gain.gain.setValueAtTime(0, context.currentTime);
    gain.gain.linearRampToValueAtTime(.035, context.currentTime + 1.2);
    gain.connect(context.destination);
    const oscillators = [110, 164.81, 220].map((frequency, index) => {
      const oscillator = context.createOscillator();
      const noteGain = context.createGain();
      oscillator.type = index === 1 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      noteGain.gain.value = index === 0 ? .5 : .18;
      oscillator.connect(noteGain).connect(gain);
      oscillator.start();
      return oscillator;
    });
    audioRef.current = { context, gain, oscillators };
    setPlaying(true);
  };

  useEffect(() => () => { audioRef.current?.context.close(); }, []);
  return <button type="button" className="music-toggle" onClick={toggle} aria-pressed={playing}><span aria-hidden="true">{playing ? 'Ⅱ' : '♪'}</span>{playing ? 'Silenciar atmósfera' : 'Activar atmósfera'}</button>;
}

function Welcome({ onEnter, entering }: { onEnter: () => void; entering: boolean }) {
  return (
    <section className={`welcome-screen ${entering ? 'is-entering' : ''}`} aria-labelledby="welcome-title">
      <div className="aurora aurora-one" aria-hidden="true" /><div className="aurora aurora-two" aria-hidden="true" />
      <div className="welcome-content">
        <p className="eyebrow">Para {relationship.girlfriendName}</p>
        <span className="orbital-mark" aria-hidden="true"><i /></span>
        <h1 id="welcome-title">Nuestro <em>Universo</em></h1>
        <p className="welcome-copy">Hay historias que se cuentan.<br />La nuestra se explora.</p>
        <button className="enter-button" type="button" onClick={onEnter} disabled={entering}><span>{entering ? 'Iniciando el viaje…' : 'Entrar a nuestro universo'}</span><span aria-hidden="true">↗</span></button>
      </div>
      <p className="anniversary-note">Cinco años · Una historia infinita</p>
    </section>
  );
}

function Intro() {
  return (
    <section className="intro-section" aria-labelledby="intro-title">
      <div className="intro-orbit" aria-hidden="true"><i /><i /><i /><i /><i /><span /></div>
      <p className="overline">Nuestra medida del tiempo</p>
      <h2 id="intro-title">{mainPhrase()}</h2>
      <p className="intro-copy">{relationship.introText}</p>
      <TimeTogether startDate={relationship.startDate} />
      <a className="scroll-cue" href="#map"><span>Descubrir la historia</span><i aria-hidden="true">↓</i></a>
    </section>
  );
}

function ConstellationStory({ constellation, onBack, onMemory }: { constellation: Constellation; onBack: () => void; onMemory: (memory: Memory) => void }) {
  return (
    <section className="story-screen" style={{ '--story-accent': constellation.accent } as React.CSSProperties}>
      <button type="button" className="back-button" onClick={onBack}>← Volver al mapa</button>
      <header className="story-header">
        <div className="story-visual" aria-hidden="true"><span>{constellation.number}</span><i /><i /><i /><i /><i /><i /></div>
        <div><p className="overline">{constellation.year}</p><h2>{constellation.name}</h2><p className="story-phrase">{constellation.shortPhrase}</p><p>{constellation.intro}</p></div>
      </header>
      <div className="memory-list">
        {constellation.memories.map((memory, index) => (
          <button className="memory-card" type="button" key={memory.id} onClick={() => onMemory(memory)}>
            <span className="memory-card-number">0{index + 1}</span>
            <span className="memory-card-art" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={memory.image} alt="" loading="lazy" />
              <i>✦</i>
            </span>
            <span className="memory-card-copy"><small>{memory.place}</small><strong>{memory.title}</strong><em>Leer este recuerdo <b>↗</b></em></span>
          </button>
        ))}
      </div>
      {constellation.song && <a className="song-link" href={constellation.spotifyUrl || relationship.spotifyUrl || '#'} target="_blank" rel="noreferrer"><span>♪</span><small>La canción de este capítulo</small><strong>{constellation.song}</strong></a>}
      <button type="button" className="back-button bottom" onClick={onBack}>← Seguir explorando</button>
    </section>
  );
}

function SecretLetter({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop secret-backdrop" role="presentation">
      <article className="secret-letter" role="dialog" aria-modal="true" aria-labelledby="secret-title">
        <button className="modal-close dark" onClick={onClose} type="button" aria-label="Cerrar carta">×</button>
        <span className="letter-star">✦</span><p className="overline">Una nota escondida</p>
        <h2 id="secret-title">Encontraste algo que solo podía estar aquí.</h2>
        <p>{relationship.secretLetter}</p>
        <footer>Siempre tuyo,<br /><strong>{relationship.myName}</strong></footer>
      </article>
    </div>
  );
}

function Future({ onBack, onCelebrate }: { onBack: () => void; onCelebrate: (kind: 'always' | 'obviously') => void }) {
  return (
    <section className="future-screen">
      <button type="button" className="back-button" onClick={onBack}>← Volver al mapa</button>
      <div className="future-halo" aria-hidden="true"><i /><i /><span>06</span></div>
      <p className="overline">La constelación que todavía no existe</p>
      <h2>El sexto año</h2>
      <p className="future-lead">Si estos cinco años fueron nuestro universo, lo que viene será todo lo que aún nos queda por descubrir.</p>
      <div className="future-capsule">
        <p>{relationship.futureLetter}</p>
        <div className="promise"><small>Mi promesa</small><strong>{relationship.promise}</strong></div>
        <div className="surprise-grid"><div><small>Cuándo</small><strong>{relationship.finalDate}</strong></div><div><small>Dónde</small><strong>{relationship.finalPlace}</strong></div></div>
        <p className="invitation-plan">{relationship.finalInvitation}</p>
      </div>
      <div className="final-question"><p>¿Quieres seguir explorando el universo conmigo?</p><div><button type="button" onClick={() => onCelebrate('always')}>Sí, siempre</button><button type="button" onClick={() => onCelebrate('obviously')}>Obviamente</button></div></div>
    </section>
  );
}

function Celebration({ kind, onClose }: { kind: 'always' | 'obviously'; onClose: () => void }) {
  return (
    <div className={`celebration celebration-${kind}`} role="dialog" aria-modal="true" aria-labelledby="celebration-title">
      <div className="celebration-particles" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ '--i': i } as React.CSSProperties}>✦</i>)}</div>
      <div><p className="overline">Entonces tenemos un plan</p><h2 id="celebration-title">El universo sigue<br /><em>expandiéndose.</em></h2><p>{kind === 'always' ? 'Te elegiría en cada constelación, en cada versión de nosotros.' : 'Sabía que esa sería tu respuesta. Lo mejor todavía no ha pasado.'}</p><button type="button" onClick={onClose}>Volver a nuestras estrellas</button></div>
    </div>
  );
}

export default function UniverseExperience() {
  const [entered, setEntered] = useState(false);
  const [entering, setEntering] = useState(false);
  const [traveling, setTraveling] = useState(false);
  const [view, setView] = useState<'map' | 'future' | string>('map');
  const [visited, setVisited] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')); } catch { return new Set(); }
  });
  const [memory, setMemory] = useState<Memory | null>(null);
  const [secretOpen, setSecretOpen] = useState(false);
  const [celebration, setCelebration] = useState<'always' | 'obviously' | null>(null);
  const constellation = useMemo(() => relationship.constellations.find((item) => item.id === view), [view]);

  const travelTo = (target: string, scrollToMap = false) => {
    setTraveling(true);
    window.setTimeout(() => {
      setView(target);
      window.scrollTo({ top: 0 });
      if (scrollToMap) window.setTimeout(() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' }), 80);
    }, 430);
    window.setTimeout(() => setTraveling(false), 1080);
  };
  const openConstellation = (id: string) => {
    const next = new Set(visited).add(id);
    setVisited(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    travelTo(id);
  };
  const goMap = () => travelTo('map', true);
  const enterUniverse = () => {
    setEntering(true);
    window.setTimeout(() => { setEntered(true); setEntering(false); }, 1050);
  };

  return (
    <main className={`universe ${entered ? 'has-entered' : ''}`}>
      <StarField />
      <MotionEffects scene={`${entered}-${view}`} />
      <div className={`travel-overlay ${traveling ? 'is-active' : ''}`} aria-hidden="true"><i /><i /><span>✦</span></div>
      {!entered ? <Welcome onEnter={enterUniverse} entering={entering} /> : (
        <>
          <nav className="site-nav" aria-label="Navegación principal"><button className="brand" type="button" onClick={goMap}><span>✦</span>Nuestro Universo</button><div className="nav-actions"><div className="progress-wrap"><span>{visited.size}/5 exploradas</span><i><b style={{ width: `${visited.size * 20}%` }} /></i></div><MusicToggle /></div></nav>
          {view === 'map' && <div className="journey"><Intro /><div id="map"><ConstellationMap constellations={relationship.constellations} visited={visited} onSelect={openConstellation} onSecret={() => setSecretOpen(true)} onFuture={() => travelTo('future')} /></div><footer className="site-footer"><span>✦</span><p>Hecho para {relationship.girlfriendName}<br />por {relationship.myName}</p></footer></div>}
          {constellation && <ConstellationStory constellation={constellation} onBack={goMap} onMemory={setMemory} />}
          {view === 'future' && <Future onBack={goMap} onCelebrate={setCelebration} />}
        </>
      )}
      {memory && <MemoryModal memory={memory} onClose={() => setMemory(null)} />}
      {secretOpen && <SecretLetter onClose={() => setSecretOpen(false)} />}
      {celebration && <Celebration kind={celebration} onClose={() => setCelebration(null)} />}
    </main>
  );
}
