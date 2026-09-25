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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = new Audio('/musicafondo.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = .32;
    audioRef.current = audio;

    const handleFinalAudio = (event: Event) => {
      const action = (event as CustomEvent<'play' | 'stop' | 'finale'>).detail;
      if (fadeRef.current !== null) window.clearInterval(fadeRef.current);
      if (action === 'finale' && !audio.paused) {
        const initialVolume = audio.volume;
        const startedAt = performance.now();
        fadeRef.current = window.setInterval(() => {
          const progress = Math.min((performance.now() - startedAt) / 1100, 1);
          audio.volume = Math.max(0, initialVolume * (1 - progress));
          if (progress < 1) return;
          if (fadeRef.current !== null) window.clearInterval(fadeRef.current);
          fadeRef.current = null;
          audio.pause();
          audio.volume = .32;
          setPlaying(false);
        }, 35);
        return;
      }
      if (!audio.paused) audio.volume = action === 'play' ? .07 : .32;
    };
    window.addEventListener('nuestro-universo:final-audio', handleFinalAudio);
    return () => {
      window.removeEventListener('nuestro-universo:final-audio', handleFinalAudio);
      if (fadeRef.current !== null) window.clearInterval(fadeRef.current);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      if (audio.ended) audio.currentTime = 0;
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return <button type="button" className="music-toggle" onClick={toggle} aria-pressed={playing}><span aria-hidden="true">{playing ? 'Ⅱ' : '♪'}</span>{playing ? 'Pausar música' : 'Activar música'}</button>;
}

function FinalAudioMessage({ onComplete }: { onComplete: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const announce = (action: 'play' | 'stop' | 'finale') => {
    window.dispatchEvent(new CustomEvent('nuestro-universo:final-audio', { detail: action }));
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      announce('stop');
      return;
    }
    try {
      if (audio.ended) audio.currentTime = 0;
      await audio.play();
      setPlaying(true);
      announce('play');
    } catch {
      setPlaying(false);
      announce('stop');
    }
  };

  useEffect(() => () => {
    audioRef.current?.pause();
    window.dispatchEvent(new CustomEvent('nuestro-universo:final-audio', { detail: 'stop' }));
  }, []);

  return (
    <section className="final-audio" aria-labelledby="final-audio-title">
      <span className="final-audio-star" aria-hidden="true">✦</span>
      <p className="overline">Un último detalle</p>
      <h3 id="final-audio-title">Antes de terminar…</h3>
      <p>Hay algo cortito que quiero que escuches con el corazón.</p>
      <button type="button" onClick={toggle} aria-pressed={playing}>
        <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>
        {playing ? 'Pausar mi mensaje' : 'Escuchar mi mensaje'}
      </button>
      <div className="final-audio-progress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
      <audio
        ref={audioRef}
        src="/audio.ogg"
        preload="metadata"
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
        }}
        onEnded={(event) => {
          event.currentTarget.currentTime = 0;
          setProgress(0);
          setPlaying(false);
          announce('finale');
          window.setTimeout(onComplete, 320);
        }}
      />
    </section>
  );
}

function FinaleReveal({ onClose }: { onClose: () => void }) {
  const [wishRevealed, setWishRevealed] = useState(false);
  const herInitial = relationship.girlfriendName.trim().charAt(0) || 'M';
  const myInitial = relationship.myName.trim().charAt(0) || 'S';

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div className={`finale-reveal ${wishRevealed ? 'wish-is-revealed' : ''}`} role="dialog" aria-modal="true" aria-labelledby="finale-title">
      <button className="finale-close" type="button" onClick={onClose} aria-label="Cerrar momento final" autoFocus>×</button>
      <div className="finale-sky" aria-hidden="true">
        {Array.from({ length: 48 }, (_, index) => (
          <i key={index} style={{
            left: `${(index * 47 + 9) % 98}%`,
            top: `${(index * 67 + 6) % 94}%`,
            width: `${2 + (index % 3)}px`,
            height: `${2 + (index % 3)}px`,
            animationDelay: `${(index % 12) * .13}s`,
          }} />
        ))}
      </div>
      <div className="finale-constellation" aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
        <div className="finale-monogram"><b>{herInitial}</b><em>✦</em><b>{myInitial}</b></div>
      </div>
      <div className="finale-content">
        <p className="overline">Nuestra constelación</p>
        <h2 id="finale-title">De todas las historias posibles,<br /><em>siempre volvería a elegir la nuestra.</em></h2>
        {!wishRevealed ? (
          <button className="wish-button" type="button" onClick={() => setWishRevealed(true)}>
            <span aria-hidden="true">✦</span><small>Pide un deseo…</small>
          </button>
        ) : (
          <div className="wish-message" aria-live="polite">
            <p className="wish-answer">El mío ya se cumplió cuando llegaste tú.</p>
            <p>{relationship.girlfriendName}, quiero seguir construyendo mi vida contigo, cumpliendo nuestros sueños, promesas y aventuras, siempre juntitos y de la mano de Dios. Te amo con todo mi corazón.</p>
            <button type="button" onClick={onClose}>Y esto recién comienza…</button>
          </div>
        )}
      </div>
    </div>
  );
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

function ConstellationStory({ constellation, onBack, onMemory, onLudo }: { constellation: Constellation; onBack: () => void; onMemory: (memory: Memory) => void; onLudo: () => void }) {
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
      {constellation.id === 'el-comienzo' && (
        <button className="ludo-secret-trigger" type="button" onClick={onLudo}>
          <span className="mini-die" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <span><small>Hay un recuerdo escondido</small><strong>La partida que cambió todo</strong><em>Toca para lanzar el dado <b>↗</b></em></span>
        </button>
      )}
      {constellation.song && <a className="song-link" href={constellation.spotifyUrl || relationship.spotifyUrl || '#'} target="_blank" rel="noreferrer"><span>♪</span><small>La canción de este capítulo</small><strong>{constellation.song}</strong></a>}
      <button type="button" className="back-button bottom" onClick={onBack}>← Seguir explorando</button>
    </section>
  );
}

const DICE_DOTS: Record<number, Array<[number, number]>> = {
  1: [[2, 2]],
  2: [[1, 1], [3, 3]],
  3: [[1, 1], [2, 2], [3, 3]],
  4: [[1, 1], [1, 3], [3, 1], [3, 3]],
  5: [[1, 1], [1, 3], [2, 2], [3, 1], [3, 3]],
  6: [[1, 1], [1, 3], [2, 1], [2, 3], [3, 1], [3, 3]],
};

function LudoSecret({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'ready' | 'rolling' | 'landed' | 'revealed'>('ready');
  const [face, setFace] = useState(1);
  const sequenceTimersRef = useRef<number[]>([]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
      sequenceTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, [onClose]);

  const rollDice = () => {
    if (phase !== 'ready') return;
    setPhase('rolling');
    sequenceTimersRef.current = [
      window.setTimeout(() => {
      setFace(6);
        setPhase('landed');
      }, 2100),
      window.setTimeout(() => setPhase('revealed'), 4100),
    ];
  };

  const hasLanded = phase === 'landed' || phase === 'revealed';

  return (
    <div className={`ludo-secret phase-${phase} ${hasLanded ? 'has-landed' : ''} ${phase === 'revealed' ? 'is-revealed' : ''}`} role="dialog" aria-modal="true" aria-labelledby="ludo-secret-title">
      <button className="ludo-close" type="button" onClick={onClose} aria-label="Cerrar recuerdo de Ludo" autoFocus>×</button>
      <div className="ludo-card">
        <div className="ludo-visual">
          <div className="ludo-board" aria-hidden="true"><i /><i /><i /><i /><span className="ludo-path" /></div>
          <span className="ludo-pawn pawn-one" aria-hidden="true"><i /></span>
          <span className="ludo-pawn pawn-two" aria-hidden="true"><i /></span>
          <span className="pawn-meeting" aria-hidden="true">✦</span>
          <span className="dice-sparks" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} style={{ '--spark': index } as React.CSSProperties} />)}</span>
          <button className={`ludo-die ${phase === 'rolling' ? 'is-rolling' : ''}`} type="button" onClick={rollDice} disabled={phase !== 'ready'} aria-label="Tirar el dado 3D">
            <span className="dice-float">
              <span className={`dice-cube show-${face}`}>
                {Object.entries(DICE_DOTS).map(([side, dots]) => (
                  <span className={`dice-face dice-face-${side}`} key={side}>
                    {dots.map(([row, column], index) => <i key={index} style={{ gridRow: row, gridColumn: column }} />)}
                  </span>
                ))}
              </span>
            </span>
            <span className="dice-shadow" aria-hidden="true" />
          </button>
        </div>
        <div className="ludo-copy">
          <p className="overline">Un recuerdo escondido</p>
          <h2 id="ludo-secret-title">La partida que<br /><em>cambió todo.</em></h2>
          {phase !== 'revealed' ? (
            <div className={`ludo-intro ludo-intro-${phase}`} key={phase} aria-live="polite">
              <p>{phase === 'ready' ? 'Hay partidas que se olvidan. Pero hubo una que, sin saberlo, comenzó nuestra historia.' : phase === 'rolling' ? 'A veces el destino solo necesita una pequeña casualidad para cambiarlo todo…' : 'El destino cayó en seis. Ahora nuestras fichas vuelven a encontrarse.'}</p>
              {phase === 'ready' ? <button type="button" onClick={rollDice}>Tirar el dado</button> : <span className="ludo-status"><i />{phase === 'rolling' ? 'El destino está jugando' : 'Dos caminos, un encuentro'}</span>}
            </div>
          ) : (
            <div className="ludo-message" aria-live="polite">
              <blockquote>“Todo comenzó con una partida de Ludo, sin imaginar que el verdadero premio sería encontrarte a ti.”</blockquote>
              <p>Entre tantas personas, tantas partidas y tantas posibilidades, la vida hizo que coincidiéramos. Desde ese momento comenzamos a construir nuestra propia historia.</p>
              <button type="button" onClick={onClose}>Volver al comienzo de nosotros</button>
            </div>
          )}
        </div>
      </div>
    </div>
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

function Future({ onBack, onCelebrate, onFinale }: { onBack: () => void; onCelebrate: (kind: 'always' | 'obviously') => void; onFinale: () => void }) {
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
      <FinalAudioMessage onComplete={onFinale} />
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
  const [finaleOpen, setFinaleOpen] = useState(false);
  const [ludoOpen, setLudoOpen] = useState(false);
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
          {constellation && <ConstellationStory constellation={constellation} onBack={goMap} onMemory={setMemory} onLudo={() => setLudoOpen(true)} />}
          {view === 'future' && <Future onBack={goMap} onCelebrate={setCelebration} onFinale={() => setFinaleOpen(true)} />}
        </>
      )}
      {memory && <MemoryModal memory={memory} onClose={() => setMemory(null)} />}
      {secretOpen && <SecretLetter onClose={() => setSecretOpen(false)} />}
      {celebration && <Celebration kind={celebration} onClose={() => setCelebration(null)} />}
      {finaleOpen && <FinaleReveal onClose={() => setFinaleOpen(false)} />}
      {ludoOpen && <LudoSecret onClose={() => setLudoOpen(false)} />}
    </main>
  );
}
