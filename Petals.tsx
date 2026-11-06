import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  vy: number;
  sway: number;
  phase: number;
  rot: number;
  vr: number;
  flip: number;
  vf: number;
  kind: 0 | 1; // 0 pétalo, 1 brasa dorada
  color: string;
  alpha: number;
};

const PETAL_COLORS = ["#8e1b2c", "#a82a35", "#6f1424", "#b4452f", "#7a1a2a"];

function spawn(w: number, h: number, anywhere: boolean): Particle {
  const kind: 0 | 1 = Math.random() < 0.62 ? 0 : 1;
  const size = kind === 0 ? 7 + Math.random() * 9 : 0.8 + Math.random() * 1.8;
  return {
    x: Math.random() * w,
    y: anywhere ? Math.random() * h : kind === 0 ? -30 : h + 10,
    size,
    vy: kind === 0 ? 0.35 + Math.random() * 0.8 : -(0.12 + Math.random() * 0.35),
    sway: 0.4 + Math.random() * 1.1,
    phase: Math.random() * Math.PI * 2,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.02,
    flip: Math.random() * Math.PI * 2,
    vf: 0.01 + Math.random() * 0.025,
    kind,
    color: kind === 0 ? PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)] : "#e8c48c",
    alpha: kind === 0 ? 0.55 + Math.random() * 0.4 : 0.25 + Math.random() * 0.6,
  };
}

/** Pétalos que caen y brasas doradas que suben, en un canvas de fondo. */
export default function Petals({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0;
    let h = 0;
    let raf = 0;
    let parts: Particle[] = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, Math.max(26, w / 22)) * (reduce ? 0.3 : 1));
      parts = Array.from({ length: count }, () => spawn(w, h, true));
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const frame = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.y += p.vy;
        p.x += Math.sin(t * 0.012 + p.phase) * p.sway * (p.kind === 0 ? 0.6 : 0.2);
        p.rot += p.vr;
        p.flip += p.vf;

        if (p.kind === 0 ? p.y > h + 30 : p.y < -10) {
          parts[i] = spawn(w, h, false);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        if (p.kind === 0) {
          ctx.rotate(p.rot);
          ctx.scale(Math.cos(p.flip) * 0.8 + 0.2 * Math.sign(Math.cos(p.flip) || 1), 1);
          ctx.globalAlpha = p.alpha;
          const s = p.size;
          const g = ctx.createLinearGradient(0, -s, 0, s);
          g.addColorStop(0, p.color);
          g.addColorStop(1, "#3a0a14");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.bezierCurveTo(s * 0.95, -s * 0.5, s * 0.8, s * 0.7, 0, s);
          ctx.bezierCurveTo(-s * 0.8, s * 0.7, -s * 0.95, -s * 0.5, 0, -s);
          ctx.fill();
        } else {
          const tw = 0.5 + 0.5 * Math.sin(t * 0.03 + p.phase * 3);
          ctx.globalAlpha = p.alpha * tw;
          ctx.shadowColor = "#e8a25c";
          ctx.shadowBlur = 10;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[3] h-full w-full"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 4s ease 0.5s" }}
    />
  );
}
