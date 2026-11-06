import { config } from "../config";
import Reveal from "../components/Reveal";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export default function Reasons() {
  return (
    <section className="relative z-10 px-6 py-24 sm:px-16 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="label">Razones</p>
          <h2 className="mt-6 max-w-xl text-4xl font-light italic leading-[1.12] sm:text-6xl">
            Algunas de las miles <br className="hidden sm:block" />
            que tengo para quererte.
          </h2>
        </Reveal>

        <ol className="mt-20 grid gap-x-24 gap-y-16 sm:mt-28 md:grid-cols-2">
          {config.razones.map((r, i) => (
            <Reveal as="li" key={i} className={`list-none ${i % 2 === 1 ? "md:mt-24" : ""}`}>
              <div className="reason-line mb-6 w-full" />
              <div className="flex gap-6">
                <span className="mt-2 w-10 shrink-0 font-sans text-xs font-light tracking-[0.3em] text-gold">{ROMAN[i] ?? i + 1}</span>
                <p className="text-2xl font-light italic leading-snug text-[#f6ead6] sm:text-[1.7rem]">{r}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
