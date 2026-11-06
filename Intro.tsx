import { useEffect, useState } from "react";
import { config } from "../config";

type Phase = "idle" | "opening" | "zoom" | "leaving" | "gone";

/** Pantalla inicial: un sobre cerrado con sello de lacre que se abre al tocarlo. */
export default function Intro({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    document.body.classList.toggle("locked", phase !== "gone");
    return () => document.body.classList.remove("locked");
  }, [phase]);

  const open = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    window.setTimeout(() => setPhase("zoom"), 2700);
    window.setTimeout(() => {
      setPhase("leaving");
      window.scrollTo(0, 0);
      onOpen();
    }, 3500);
    window.setTimeout(() => setPhase("gone"), 5300);
  };

  if (phase === "gone") return null;

  const cls = [
    "intro",
    phase === "opening" || phase === "zoom" || phase === "leaving" ? "opening" : "",
    phase === "zoom" || phase === "leaving" ? "zoom" : "",
    phase === "leaving" ? "leaving" : "",
  ].join(" ");

  return (
    <div className={cls}>
      <div className="intro-text px-8 text-center">
        <p className="intro-line label" style={{ animationDelay: "0.6s" }}>
          Antes de empezar amor
        </p>
        <p
          className="intro-line mt-5 text-3xl font-light italic leading-snug text-[#f1e4cf] sm:text-4xl"
          style={{ animationDelay: "1.6s" }}
        >
          Quierooo que leas esto
          <br />
          tranquila si?
        </p>
      </div>

      <div className="env-wrap flex flex-col items-center">
        <button className="env" onClick={open} aria-label="Abrir la carta">
          <span className="env-back" />
          <span className="env-letter">
            <span>Para {config.para}</span>
          </span>
          <span className="env-front l" />
          <span className="env-front r" />
          <span className="env-front b" />
          <span className="env-flap" />
          <span className="env-seal">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,200,170,0.55)">
              <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 2.9 4.5 6.6 4.5c2 0 3.5 1.1 4.4 2.6.4.6 1.2.6 1.6 0 .9-1.5 2.4-2.6 4.4-2.6 3.7 0 5.7 3.8 4.2 7.2C19.5 16.4 12 21 12 21z" />
            </svg>
          </span>
        </button>
        <p className="intro-hint label mt-14 text-[0.62rem]!">Toca el sello mi vida</p>
      </div>
    </div>
  );
}
