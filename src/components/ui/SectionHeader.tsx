"use client";

import { motion } from "framer-motion";

type Props = {
  eyebrow: string;
  heading: string;
  subheading?: string;
  gradientEnd?: string; // kept so old calls don't break
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = "left",
}: Props) {
  const center = align === "center";
  return (
    <div
      className={`mb-14 flex flex-col ${center ? "items-center text-center" : "items-start"}`}
    >
      <motion.span
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="font-display bg-[#ffc857] px-3 py-1 text-sm tracking-[0.2em] text-black"
      >
        {eyebrow}
      </motion.span>

      <span className="mt-3 block overflow-hidden [clip-path:inset(0_-100vw_0_0)]">
        <motion.h2
          initial={{ y: "110%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] text-white"
        >
          {heading}
        </motion.h2>
      </span>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-4 h-[5px] w-24 origin-left bg-[#ff3b30]"
      />

      {subheading && (
        <p className="mt-5 max-w-xl text-base text-white/65 md:text-lg">
          {subheading}
        </p>
      )}
    </div>
  );
}
