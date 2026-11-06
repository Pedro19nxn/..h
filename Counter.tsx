import { useEffect, useState } from "react";
import { config } from "../config";
import Reveal from "../components/Reveal";

function parts(start: number, now: number) {
  const diff = Math.max(0, now - start);
  return {
    dias: Math.floor(diff / 86400000),
    horas: Math.floor(diff / 3600000) % 24,
    min: Math.floor(diff / 60000) % 60,
    seg: Math.floor(diff / 1000) % 60,
  };
}

export default function Counter() {
  const start = new Date(config.inicio).getTime();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const t = parts(start, now);
  const items = [
    { n: t.dias, l: "días" },
    { n: t.horas, l: "horas" },
    { n: t.min, l: "minutos" },
    { n: t.seg, l: "segundos" },
  ];

  return (
    <section className="relative z-10 px-6 py-28 sm:px-16 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="label">Desde que te conocí amor..</p>
          <p className="mt-6 max-w-md text-2xl font-light italic leading-snug text-[#f1e4cf]/80 sm:text-3xl">
            El tiempo no se detuvo.. pero si me dió la razón más bonita de vivirlo y es a tu lado.
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-16 grid grid-cols-2 gap-y-14 sm:mt-24 sm:grid-cols-4">
          {items.map((it, i) => (
            <div key={it.l} className={`px-2 sm:px-8 ${i > 0 ? "sm:border-l sm:border-gold/20" : "sm:pl-0"} ${i % 2 === 1 ? "border-l border-gold/20 pl-8 sm:pl-8" : ""}`}>
              <div className="tnum font-light leading-none text-[#f6ead6]" style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)" }}>
                {String(it.n).padStart(it.l === "días" ? 1 : 2, "0")}
              </div>
              <div className="label mt-4 text-[0.65rem]!">{it.l}</div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-16 text-right text-lg italic text-gold/80">Y desde el inicio sigues siendo tu....</p>
        </Reveal>
      </div>
    </section>
  );
}
