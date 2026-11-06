import { useMemo } from "react";
import Reveal from "../components/Reveal";

const heart = (t: number): [number, number] => {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return [200 + x * 11, 175 - y * 10];
};

// Generador pseudo-aleatorio fijo para que las estrellas no cambien en cada render
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

export default function Constellation() {
  const { path, stars, bg } = useMemo(() => {
    const N = 140;
    const pts = Array.from({ length: N + 1 }, (_, i) => heart((i / N) * Math.PI * 2));
    const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

    const K = 22;
    const stars = Array.from({ length: K }, (_, i) => {
      const [x, y] = heart((i / K) * Math.PI * 2 + 0.07);
      return { x, y, r: i % 5 === 0 ? 3.4 : 2, big: i % 5 === 0, d: (i / K) * 4.4 + 0.4 };
    });

    const r = rng(42);
    const bg = Array.from({ length: 64 }, () => ({
      x: r() * 400,
      y: r() * 380,
      r: 0.4 + r() * 1.1,
      o: 0.2 + r() * 0.5,
      d: r() * 4,
    }));
    return { path, stars, bg };
  }, []);

  return (
    <section className="relative z-10 px-6 py-24 sm:px-16 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <Reveal className="md:order-2">
          <p className="label">Una contestación</p>
          <h2 className="mt-6 text-4xl font-light italic leading-[1.12] sm:text-6xl">
            Si pudiera amor regalarte <span className="text-gold">el cielo</span> lo haria..
          </h2>
          <p className="mt-8 max-w-md text-xl leading-relaxed text-[#f1e4cf]/70">
            Pero como no puedo te hice esta mini contestación para ti. Unas pocas estrellas que hacen ver lo que siento por ti
          </p>
        </Reveal>

        <Reveal className="md:order-1">
          <svg viewBox="0 0 400 380" className="mx-auto w-full max-w-[520px] overflow-visible" role="img" aria-label="Un corazón hecho de estrellas">
            <defs>
              <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {bg.map((s, i) => (
              <circle
                key={i}
                className="bgstar"
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill="#f1e4cf"
                opacity={s.o}
                style={{ animationDelay: `${s.d}s` }}
              />
            ))}

            <path
              className="draw"
              d={path}
              pathLength={1}
              fill="none"
              stroke="#cfa76b"
              strokeOpacity={0.55}
              strokeWidth={0.8}
              strokeLinecap="round"
            />

            {stars.map((s, i) => (
              <g key={i} className="star" style={{ "--d": `${s.d}s` } as React.CSSProperties} filter="url(#glow)">
                <circle cx={s.x} cy={s.y} r={s.r} fill="#f6ead6" />
                {s.big && (
                  <path
                    d={`M${s.x} ${s.y - 11} L${s.x + 1.3} ${s.y - 1.3} L${s.x + 11} ${s.y} L${s.x + 1.3} ${s.y + 1.3} L${s.x} ${s.y + 11} L${s.x - 1.3} ${s.y + 1.3} L${s.x - 11} ${s.y} L${s.x - 1.3} ${s.y - 1.3}Z`}
                    fill="#f6ead6"
                    opacity={0.85}
                  />
                )}
              </g>
            ))}
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
