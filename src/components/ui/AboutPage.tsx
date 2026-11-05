"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import assets from "@/assets";
import { about } from "@/data/about";
import MotionBackground from "./MotionBackground";
import SectionHeader from "./SectionHeader";
import CountUp from "./CountUp";

const RED = "#ff3b30";
const WIPE = [0.76, 0, 0.24, 1] as const;

export default function AboutPage() {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 15,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <MotionBackground className="min-h-screen">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <SectionHeader eyebrow={about.eyebrow} heading={about.heading} />

        <div className="grid items-start gap-12 md:grid-cols-[5fr_7fr]">
          {/* LEFT: photo + stats */}
          <div>
            <div style={{ perspective: 900 }}>
              <motion.div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => {
                  mx.set(0);
                  my.set(0);
                  setHover(false);
                }}
                onMouseMove={onMove}
                onClick={() => setHover((h) => !h)}
                animate={{
                  boxShadow: hover ? `4px 4px 0 ${RED}` : `12px 12px 0 ${RED}`,
                  x: hover ? 4 : 0,
                  y: hover ? 4 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  aspectRatio: "4 / 5",
                  border: `3px solid ${RED}`,
                  cursor: "pointer",
                  background: "#111830",
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src={assets.images.trainerHover}
                  alt="Santhosh Prem"
                  fill
                  priority
                  sizes="(min-width:900px) 40vw, 100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    filter: "grayscale(1) contrast(1.2)",
                  }}
                />

                <motion.div
                  initial={false}
                  animate={{
                    clipPath: hover
                      ? "inset(0% 0% 0% 0%)"
                      : "inset(100% 0% 0% 0%)",
                  }}
                  transition={{ duration: 0.6, ease: WIPE }}
                  className="absolute inset-0"
                >
                  <motion.div
                    initial={false}
                    animate={{ scale: hover ? 1 : 1.15 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={assets.images.trainer}
                      alt="Santhosh Prem"
                      fill
                      sizes="(min-width:900px) 40vw, 100vw"
                      style={{
                        objectFit: "cover",
                        objectPosition: "top",
                        filter: "contrast(1.1) saturate(1.2)",
                      }}
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{
                    bottom: hover ? "100%" : "0%",
                    opacity: hover ? 0 : 1,
                  }}
                  transition={{ duration: 0.6, ease: WIPE }}
                  className="pointer-events-none absolute inset-x-0 h-1"
                  style={{ background: RED, boxShadow: `0 0 18px ${RED}` }}
                />

                <motion.div
                  initial={false}
                  animate={{ opacity: hover ? 0 : 0.2 }}
                  className="pointer-events-none absolute inset-0 bg-[#ff3b30] mix-blend-multiply"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-60% to-black/90" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden p-5">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={hover ? "h" : "d"}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`font-display text-2xl ${hover ? "text-[#ffc857]" : "text-white"}`}
                    >
                      {hover ? "See the real me →" : about.imageCaption}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {about.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="border border-white/10 border-t-4 border-t-[#ffc857] bg-[#111830] p-3 md:p-4"
                >
                  <p className="font-display text-3xl leading-none text-[#ff3b30] md:text-4xl">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/60">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: bio + focus + timeline */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border-l-4 border-[#ff3b30] pl-5 text-lg text-white/80 md:text-2xl"
            >
              {about.bio}
            </motion.p>

            <p className="font-display mt-10 text-xl text-[#ffc857]">
              What I coach
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {about.focus.map((f, i) => (
                <motion.button
                  key={f.title}
                  type="button"
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className={`border-2 p-4 text-left transition-colors ${
                    active === i
                      ? "border-[#ff3b30] bg-[#ff3b30]/10"
                      : "border-white/15 hover:border-white/50"
                  }`}
                >
                  <span className="text-3xl">{f.icon}</span>
                  <p className="font-display mt-2 text-2xl text-white">
                    {f.title}
                  </p>
                  <AnimatePresence initial={false}>
                    {active === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden text-sm text-white/65"
                      >
                        {f.text}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>

            <p className="font-display mt-12 text-xl text-[#ffc857]">
              The road
            </p>
            <div className="relative mt-4 pl-8">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="absolute bottom-0 left-2 top-0 w-[3px] origin-top bg-gradient-to-b from-[#ff3b30] to-[#ffc857]/20"
              />
              {about.timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative mb-6"
                >
                  <span className="absolute -left-[30px] top-2 h-3.5 w-3.5 rotate-45 bg-[#ff3b30] shadow-[0_0_14px_rgba(255,59,48,0.7)] transition group-hover:scale-150 group-hover:bg-[#ffc857]" />
                  <p className="font-display text-2xl text-white transition group-hover:text-[#ffc857]">
                    <span className="mr-3 text-[#ff3b30]">{t.year}</span>
                    {t.title}
                  </p>
                  <p className="mt-1 text-white/60">{t.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionBackground>
  );
}
