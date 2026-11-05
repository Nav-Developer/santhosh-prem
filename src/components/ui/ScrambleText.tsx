"use client";

import { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}=+*^?#ABCDEFGHJKLMNPRSTUVWXYZ0123456789";

export default function ScrambleText({
  text,
  duration = 700,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const settled = Math.floor(p * text.length);
      setOut(
        text
          .split("")
          .map((ch, i) =>
            ch === " " || i < settled
              ? ch
              : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(""),
      );
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration]);

  return <span className={className}>{out}</span>;
}
