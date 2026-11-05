"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { chapters } from "@/data/story";
import ScrambleText from "@/components/ui/ScrambleText";

const N = chapters.length;
const pad = (n: number) => String(n).padStart(2, "0");
const ACCENTS = ["#ff3b30", "#ffc857", "#ff8a3d", "#ff3b30", "#ffc857"];

export default function StoryScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setIdx(Math.min(N - 1, Math.max(0, Math.floor(p * N))));
  });

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: el.offsetTop + ((i + 0.5) / N) * total,
      behavior: "smooth",
    });
  };

  const c = chapters[idx];
  const accent = ACCENTS[idx % ACCENTS.length];

  return (
    <div ref={ref} style={{ height: `${N * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0b1020] text-white">
        {/* chapter glow */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{
            background: `radial-gradient(700px circle at 75% 50%, ${accent}33, transparent 65%)`,
          }}
          transition={{ duration: 0.8 }}
        />

        {/* big rolling number */}
        <div className="pointer-events-none absolute right-[3%] top-1/2 -translate-y-1/2 select-none">
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -120, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-display block text-[clamp(14rem,42vw,40rem)] leading-none text-transparent"
              style={{ WebkitTextStroke: `2px ${accent}55` }}
            >
              {pad(idx + 1)}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* header */}
        <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 pt-24 md:px-12">
          <span className="font-display bg-[#ffc857] px-3 py-1 text-xl text-black">
            The Journey
          </span>
          <span className="font-display text-xl tracking-widest text-white/60">
            {pad(idx + 1)} / {pad(N)}
          </span>
        </div>

        {/* rail */}
        <div className="absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-5 md:left-10 md:flex">
          {chapters.map((ch, k) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => jump(k)}
              aria-label={ch.title}
              className="group flex items-center gap-3"
            >
              <span
                className="block h-3 w-3 rotate-45 border-2 transition-all duration-300"
                style={{
                  borderColor: ACCENTS[k % ACCENTS.length],
                  background:
                    k <= idx ? ACCENTS[k % ACCENTS.length] : "transparent",
                  transform: `rotate(45deg) scale(${k === idx ? 1.6 : 1})`,
                }}
              />
              <span
                className={`font-display text-lg transition-all ${
                  k === idx
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-70"
                }`}
              >
                {ch.title}
              </span>
            </button>
          ))}
        </div>

        {/* content */}
        <div className="relative z-20 flex h-full items-center px-6 md:pl-40 md:pr-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45 }}
              className="max-w-3xl"
            >
              <p
                className="font-display inline-block px-3 py-1 text-xl text-black"
                style={{ background: accent }}
              >
                Chapter {pad(idx + 1)}
              </p>
              <h2 className="font-display mt-5 text-[clamp(4rem,11vw,11rem)] leading-[0.85] text-white">
                <ScrambleText text={c.title} duration={600} />
              </h2>
              <p
                className="mt-6 max-w-lg border-l-4 pl-5 text-lg text-white/75 md:text-2xl"
                style={{ borderColor: accent }}
              >
                {c.text}
              </p>
              {idx === N - 1 && (
                <a
                  href="#coaching"
                  className="font-display mt-8 inline-block bg-[#ffc857] px-8 py-4 text-2xl text-black transition hover:-translate-y-1 hover:bg-white"
                >
                  Start Coaching →
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* progress bar */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-30 h-2 origin-left"
          style={{
            scaleX: scrollYProgress,
            background: "linear-gradient(90deg,#ff3b30,#ffc857)",
          }}
        />
      </div>
    </div>
  );
}
