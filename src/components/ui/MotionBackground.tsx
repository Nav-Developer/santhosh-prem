"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

function seeded(n: number) {
  const x = Math.sin(n * 9999) * 10000;
  return x - Math.floor(x);
}

const MOTES = Array.from({ length: 22 }, (_, k) => ({
  left: `${seeded(k + 1) * 100}%`,
  top: `${seeded(k + 50) * 100}%`,
  size: 2 + Math.round(seeded(k + 90) * 2),
  dur: 6 + seeded(k + 130) * 8,
  delay: seeded(k + 170) * 6,
}));

const spotlightMask = (r: number) =>
  `radial-gradient(circle ${r}px at var(--mx) var(--my), #000 0%, transparent 100%)`;

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MotionBackground({ children, className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current?.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className={`relative overflow-hidden bg-[#0a0a0a] ${className}`}
      style={{ "--mx": "72%", "--my": "30%" } as React.CSSProperties}
    >
      {/* faint lime glow under cursor */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(460px circle at var(--mx) var(--my), rgba(198,255,0,0.07), transparent 65%)",
        }}
      />

      {/* diagonal stripes only under the cursor */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(198,255,0,0.28) 0 2px, transparent 2px 24px)",
          maskImage: spotlightMask(280),
          WebkitMaskImage: spotlightMask(280),
        }}
      />

      {/* rising lime sparks */}
      {MOTES.map((m, k) => (
        <motion.span
          key={k}
          className="pointer-events-none absolute rounded-full bg-[#c6ff00]"
          style={{
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
            boxShadow: "0 0 8px #c6ff00",
          }}
          animate={{ y: [0, -170], opacity: [0, 0.7, 0] }}
          transition={{
            duration: m.dur,
            repeat: Infinity,
            delay: m.delay,
            ease: "easeOut",
          }}
        />
      ))}

      <div className="relative z-10">{children}</div>
    </section>
  );
}
