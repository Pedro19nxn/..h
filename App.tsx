import { useEffect, useState } from "react";
import Candle from "./components/Candle";
import Intro from "./components/Intro";
import Petals from "./components/Petals";
import Hero from "./sections/Hero";
import Letter from "./sections/Letter";
import Counter from "./sections/Counter";
import Constellation from "./sections/Constellation";
import Reasons from "./sections/Reasons";
import Player from "./sections/Player";

function Progress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed right-0 top-0 z-40 h-full w-[2px] bg-gold/10" aria-hidden>
      <div className="w-full bg-gold/70" style={{ height: `${p * 100}%` }} />
    </div>
  );
}

function Ornament() {
  return (
    <div className="relative z-10 flex items-center justify-center gap-4 py-4 opacity-70" aria-hidden>
      <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Candle />
      <Petals visible={opened} />
      <div className="grain" aria-hidden />
      <Progress />
      <Intro onOpen={() => setOpened(true)} />

      <main>
        <Hero go={opened} />
        <Letter />
        <Ornament />
        <Counter />
        <Constellation />
        <Reasons />
        <Ornament />
        <Player />
      </main>
    </>
  );
}
