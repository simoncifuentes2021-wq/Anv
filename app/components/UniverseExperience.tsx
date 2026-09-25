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

type RomanticAudio = { context: AudioContext; master: GainNode; loopTimer: number };

const SCORE_LENGTH = 32;
const CHORDS = [
  [130.81, 164.81, 196, 246.94],
  [110, 130.81, 164.81, 196],
  [87.31, 130.81, 164.81, 220],
  [98, 146.83, 196, 220],
];
const MELODY = [
  [1.1, 523.25], [3.2, 659.25], [5.4, 783.99], [7, 659.25],
  [9.3, 493.88], [11.5, 659.25], [13.7, 880], [15.2, 783.99],
  [17.4, 523.25], [19.6, 698.46], [21.8, 659.25], [23.5, 523.25],
  [25.4, 587.33], [27.2, 783.99], [29.1, 659.25], [30.6, 523.25],
];

function createReverb(context: AudioContext) {
  const duration = 3.2;
  const impulse = context.createBuffer(2, context.sampleRate * duration, context.sampleRate);
  for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
    const data = impulse.getChannelData(channel);
    for (let index = 0; index < data.length; index += 1) {
      const fade = Math.pow(1 - index / data.length, 2.8);
      data[index] = (Math.random() * 2 - 1) * fade;
    }
  }
  const reverb = context.createConvolver();
  reverb.buffer = impulse;
  return reverb;
}

function scheduleScore(context: AudioContext, destination: AudioNode, startsAt: number) {
  CHORDS.forEach((chord, chordIndex) => {
    const chordStart = startsAt + chordIndex * 8;
    chord.forEach((frequency, noteIndex) => {
      [-5, 5].forEach((detune, voiceIndex) => {
        const oscillator = context.createOscillator();
        const envelope = context.createGain();
        oscillator.type = voiceIndex === 0 ? 'sine' : 'triangle';
        oscillator.frequency.setValueAtTime(frequency, chordStart);
        oscillator.detune.setValueAtTime(detune, chordStart);
        envelope.gain.setValueAtTime(.0001, chordStart);
        envelope.gain.exponentialRampToValueAtTime(noteIndex === 0 ? .026 : .017, chordStart + 2.2);
        envelope.gain.setValueAtTime(noteIndex === 0 ? .026 : .017, chordStart + 5.4);
        envelope.gain.exponentialRampToValueAtTime(.0001, chordStart + 7.9);
        oscillator.connect(envelope).connect(destination);
        oscillator.start(chordStart);
        oscillator.stop(chordStart + 8);
      });
    });
  });

  MELODY.forEach(([offset, frequency], index) => {
    const noteStart = startsAt + offset;
    const noteDuration = index % 4 === 2 ? 2.8 : 2.1;
    const bell = context.createOscillator();
    const glow = context.createOscillator();
    const bellEnvelope = context.createGain();
    const glowEnvelope = context.createGain();
    bell.type = 'sine';
    glow.type = 'triangle';
    bell.frequency.setValueAtTime(frequency, noteStart);
    glow.frequency.setValueAtTime(frequency * 2, noteStart);
    bellEnvelope.gain.setValueAtTime(.0001, noteStart);
    bellEnvelope.gain.exponentialRampToValueAtTime(.075, noteStart + .025);
    bellEnvelope.gain.exponentialRampToValueAtTime(.0001, noteStart + noteDuration);
    glowEnvelope.gain.setValueAtTime(.0001, noteStart);
    glowEnvelope.gain.exponentialRampToValueAtTime(.014, noteStart + .018);
    glowEnvelope.gain.exponentialRampToValueAtTime(.0001, noteStart + 1.2);
    bell.connect(bellEnvelope).connect(destination);
    glow.connect(glowEnvelope).connect(destination);
    bell.start(noteStart);
    glow.start(noteStart);
    bell.stop(noteStart + noteDuration + .05);
    glow.stop(noteStart + 1.25);
  });
}

function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<RomanticAudio | null>(null);

  const toggle = async () => {
    if (audioRef.current) {
      const activeAudio = audioRef.current;
      const now = activeAudio.context.currentTime;
      window.clearInterval(activeAudio.loopTimer);
      activeAudio.master.gain.cancelScheduledValues(now);
      activeAudio.master.gain.setValueAtTime(Math.max(activeAudio.master.gain.value, .0001), now);
      activeAudio.master.gain.exponentialRampToValueAtTime(.0001, now + 1.1);
      audioRef.current = null;
      setPlaying(false);
      window.setTimeout(() => { void activeAudio.context.close(); }, 1250);
      return;
    }

    const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    const context = new AudioCtor();
    try {
      if (context.state === 'suspended') await context.resume();

      const now = context.currentTime;
      const master = context.createGain();
      const warmth = context.createBiquadFilter();
      const compressor = context.createDynamicsCompressor();
      const dry = context.createGain();
      const wet = context.createGain();
      const reverb = createReverb(context);

      master.gain.setValueAtTime(.0001, now);
      master.gain.exponentialRampToValueAtTime(.72, now + 2.4);
      warmth.type = 'lowpass';
      warmth.frequency.setValueAtTime(2900, now);
      warmth.Q.setValueAtTime(.55, now);
      dry.gain.setValueAtTime(.78, now);
      wet.gain.setValueAtTime(.25, now);
      compressor.threshold.setValueAtTime(-20, now);
      compressor.knee.setValueAtTime(18, now);
      compressor.ratio.setValueAtTime(4, now);

      master.connect(warmth);
      warmth.connect(dry).connect(compressor);
      warmth.connect(reverb).connect(wet).connect(compressor);
      compressor.connect(context.destination);

      let nextLoopStart = now + .08;
      const queueScore = () => {
        while (nextLoopStart < context.currentTime + SCORE_LENGTH + 2) {
          scheduleScore(context, master, nextLoopStart);
          nextLoopStart += SCORE_LENGTH;
        }
      };
      queueScore();
      const loopTimer = window.setInterval(queueScore, 15000);

      audioRef.current = { context, master, loopTimer };
      setPlaying(true);
    } catch {
      void context.close();
      setPlaying(false);
    }
  };

  useEffect(() => () => {
    if (!audioRef.current) return;
    window.clearInterval(audioRef.current.loopTimer);
    void audioRef.current.context.close();
  }, []);
  return <button type="button" className="music-toggle" onClick={toggle} aria-pressed={playing}><span aria-hidden="true">{playing ? 'Ⅱ' : '♪'}</span>{playing ? 'Silenciar melodía' : 'Activar melodía'}</button>;
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
