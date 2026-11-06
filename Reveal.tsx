import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "h2" | "h3" | "span" | "li" | "blockquote";
};

/** Hace aparecer el contenido suavemente al llegar con el scroll. */
export default function Reveal({ children, className = "", delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `reveal ${seen ? "in" : ""} ${className}`,
      style: { transitionDelay: `${delay}ms` },
    },
    children
  );
}
