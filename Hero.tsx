import { config } from "../config";

export default function Hero({ go }: { go: boolean }) {
  return (
    <section className={`relative z-10 flex min-h-screen flex-col justify-center px-7 sm:px-16 lg:px-28 ${go ? "go" : ""}`}>
      <div className="fade-late absolute left-7 top-10 flex items-center gap-4 sm:left-16 lg:left-28">
        <span className="label">Para {config.para}</span>
        <span className="hidden h-px w-16 bg-gold/50 sm:block" />
      </div>

      <h1 className="font-serif font-light italic leading-[1.02] tracking-tight" style={{ fontSize: "clamp(2.9rem, 10.5vw, 9.5rem)" }}>
        <span className="mask">
          <span style={{ "--d": "300ms" } as React.CSSProperties}>{config.portada[0]}</span>
        </span>
        <span className="mask sm:pl-[12vw]">
          <span style={{ "--d": "550ms" } as React.CSSProperties}>{config.portada[1]}</span>
        </span>
        <span className="mask text-gold sm:pl-[4vw]">
          <span style={{ "--d": "800ms" } as React.CSSProperties}>{config.portada[2]}</span>
        </span>
      </h1>

      <div className="hairline mt-14 w-40 sm:mt-20 sm:w-72" />

      <div className="fade-late absolute bottom-10 left-7 flex items-end gap-4 sm:left-16 lg:left-28">
        <div className="scroll-cue" />
        <span className="label pb-1 text-[0.62rem]!">desliza</span>
      </div>
    </section>
  );
}
