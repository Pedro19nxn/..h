import { useEffect, useRef, useState } from "react";
import { config } from "../config";
import Reveal from "../components/Reveal";

const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
};

const Icon = {
  play: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.2v13.6a1 1 0 0 0 1.5.86l11-6.8a1 1 0 0 0 0-1.72l-11-6.8A1 1 0 0 0 8 5.2z" />
    </svg>
  ),
  pause: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="5" width="4.2" height="14" rx="1" />
      <rect x="13.8" y="5" width="4.2" height="14" rx="1" />
    </svg>
  ),
  back: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12 5a8 8 0 1 1-7.5 5.2" />
      <path d="M4 4.5v5h5" />
      <text x="12" y="15" fontSize="7" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="Jost">10</text>
    </svg>
  ),
  fwd: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12 5a8 8 0 1 0 7.5 5.2" />
      <path d="M20 4.5v5h-5" />
      <text x="12" y="15" fontSize="7" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="Jost">10</text>
    </svg>
  ),
  loop: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 2l4 4-4 4" />
      <path d="M3 11V9a3 3 0 0 1 3-3h15" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M21 13v2a3 3 0 0 1-3 3H3" />
    </svg>
  ),
  vol: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  ),
};

export default function Player() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [vol, setVol] = useState(0.8);
  const [loop, setLoop] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (audio.current) audio.current.volume = vol;
  }, [vol]);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      a.play().catch(() => setError(true));
    } else {
      a.pause();
    }
  };
  const skip = (d: number) => {
    const a = audio.current;
    if (!a) return;
    a.currentTime = Math.min(Math.max(0, a.currentTime + d), a.duration || a.currentTime + d);
  };
  const seek = (v: number) => {
    if (audio.current) audio.current.currentTime = v;
    setCur(v);
  };

  const pct = dur ? (cur / dur) * 100 : 0;

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-24 sm:px-10">
      <Reveal className="mb-14 text-center">
        <p className="label">Y para terminar amor</p>
        <h2 className="mt-6 text-4xl font-light italic leading-[1.12] sm:text-6xl">
          Una canción que te dedico <span className="text-gold">con todo mi amor</span> porque te amo mucho
        </h2>
      </Reveal>

      <Reveal delay={150} className="w-full max-w-4xl">
        <div className={`deck p-6 sm:p-10 ${playing ? "playing" : ""}`}>
          {/*
            ═══════════════════════════════════════════════
            🎵 AQUÍ ESTÁ EL MP3
            El archivo se cambia en  src/config.ts  (cancion.archivo)
            y el .mp3 va dentro de la carpeta  /public
            ═══════════════════════════════════════════════
          */}
          <audio
            ref={audio}
            src={config.cancion.archivo}
            preload="metadata"
            loop={loop}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onTimeUpdate={(e) => setCur(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => {
              setDur(e.currentTarget.duration);
              setError(false);
            }}
            onError={() => setError(true)}
          />

          <div className="grid items-center gap-10 md:grid-cols-[0.95fr_1fr] md:gap-14">
            {/* Disco */}
            <div className="relative mx-auto w-full max-w-[340px]">
              <div className="platter">
                <div className="vinyl">
                  <div className="vlabel">
                    <svg className="relative -mt-[2px]" width="30%" viewBox="0 0 24 24" fill="rgba(241,228,207,0.55)">
                      <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 2.9 4.5 6.6 4.5c2 0 3.5 1.1 4.4 2.6.4.6 1.2.6 1.6 0 .9-1.5 2.4-2.6 4.4-2.6 3.7 0 5.7 3.8 4.2 7.2C19.5 16.4 12 21 12 21z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Brazo */}
              <svg className="arm" viewBox="0 0 100 130" fill="none">
                <circle cx="86" cy="13" r="10" fill="#2a1418" stroke="#cfa76b" strokeOpacity="0.5" />
                <circle cx="86" cy="13" r="3.5" fill="#cfa76b" />
                <path d="M86 13 L86 78 L58 118" stroke="#d9c8a8" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="48" y="112" width="16" height="10" rx="2" transform="rotate(35 56 117)" fill="#cfa76b" />
              </svg>
            </div>

            {/* Controles */}
            <div className="min-w-0">
              <div className="flex items-center justify-between">
                <span className="label text-[0.62rem]!">{playing ? "Sonando" : "En pausa"}</span>
                <div className="eq flex h-4 items-end gap-[3px]" aria-hidden>
                  <span /><span /><span /><span /><span />
                </div>
              </div>

              <h3 className="mt-5 truncate text-4xl font-light italic leading-tight sm:text-5xl">{config.cancion.titulo}</h3>
              <p className="mt-1 text-lg text-gold">{config.cancion.artista}</p>

              <div className="mt-10">
                <input
                  type="range"
                  className="bar"
                  min={0}
                  max={dur || 0}
                  step={0.1}
                  value={cur}
                  onChange={(e) => seek(Number(e.target.value))}
                  style={{ "--p": `${pct}%` } as React.CSSProperties}
                  aria-label="Progreso de la canción"
                />
                <div className="tnum mt-1 flex justify-between font-sans text-[0.7rem] font-light tracking-widest text-[#f1e4cf]/60">
                  <span>{fmt(cur)}</span>
                  <span>{dur ? fmt(dur) : "--:--"}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-6 sm:gap-8">
                <button className="ctl" onClick={() => skip(-10)} aria-label="Retroceder 10 segundos">
                  {Icon.back}
                </button>
                <button className="ctl playbtn" onClick={toggle} aria-label={playing ? "Pausar" : "Reproducir"}>
                  {playing ? Icon.pause : Icon.play}
                </button>
                <button className="ctl" onClick={() => skip(10)} aria-label="Adelantar 10 segundos">
                  {Icon.fwd}
                </button>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button
                  className={`ctl ${loop ? "text-gold!" : "opacity-50"}`}
                  onClick={() => setLoop((l) => !l)}
                  aria-label="Repetir"
                  aria-pressed={loop}
                >
                  {Icon.loop}
                </button>
                <span className="ml-auto text-[#f1e4cf]/60">{Icon.vol}</span>
                <input
                  type="range"
                  className="bar !w-28"
                  min={0}
                  max={1}
                  step={0.01}
                  value={vol}
                  onChange={(e) => setVol(Number(e.target.value))}
                  style={{ "--p": `${vol * 100}%` } as React.CSSProperties}
                  aria-label="Volumen"
                />
              </div>

              <p className="mt-8 border-t border-gold/15 pt-5 text-lg italic text-[#f1e4cf]/65">
                {error ? "La canción aún no está lista…" : config.cancion.nota}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-24 flex flex-col items-center text-center" delay={100}>
        <svg className="heartbeat" width="26" height="26" viewBox="0 0 24 24" fill="#a82a35">
          <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 2.9 4.5 6.6 4.5c2 0 3.5 1.1 4.4 2.6.4.6 1.2.6 1.6 0 .9-1.5 2.4-2.6 4.4-2.6 3.7 0 5.7 3.8 4.2 7.2C19.5 16.4 12 21 12 21z" />
        </svg>
        <p className="mt-6 font-hand text-3xl text-[#f1e4cf]/90">{config.de}</p>
        <p className="label mt-3 text-[0.6rem]!">hecho para {config.para}</p>
      </Reveal>
    </section>
  );
}
