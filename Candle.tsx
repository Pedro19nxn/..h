import { useEffect, useRef } from "react";

/** Una luz cálida, como de vela, que sigue al cursor con suavidad. */
export default function Candle() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 3;
    let x = tx;
    let y = ty;
    let raf = 0;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = (time: number) => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      const flicker = 1 + Math.sin(time / 230) * 0.03 + Math.sin(time / 97) * 0.02;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${flicker})`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="candle" aria-hidden />;
}
