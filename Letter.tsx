import { config } from "../config";
import Reveal from "../components/Reveal";

export default function Letter() {
  const fecha = new Date().toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });

  return (
    <section className="relative z-10 px-5 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <div className="paper px-7 pb-14 pt-12 sm:px-16 sm:pb-20 sm:pt-16">
          <div className="relative z-10">
            <p className="text-right text-sm italic tracking-wide text-[#6d3a30]">{fecha}</p>

            <p className="mt-10 font-hand text-3xl text-wine sm:text-4xl">{config.para},</p>

            <div className="mt-8 space-y-6 text-[1.28rem] leading-[1.85] sm:text-[1.42rem]">
              {config.carta.map((p, i) => (
                <Reveal as="p" key={i} delay={i === 0 ? 0 : 120} className={i === 0 ? "dropcap" : ""}>
                  {p}
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-14 flex flex-col items-end">
              <span className="text-lg italic text-[#6d3a30]">Siempre tuyo,</span>
              <span className="mt-1 -rotate-3 font-hand text-3xl text-wine sm:text-4xl">{config.de}</span>
            </Reveal>

            <Reveal className="mt-12 max-w-sm -rotate-1 font-hand text-[1.05rem] leading-8 text-[#8a4a3a]">
              {config.posdata}
            </Reveal>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
