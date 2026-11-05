"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Edit here to add or change codes
const CODES = [
  {
    brand: "Wellversed",
    handle: "@wellversed.in",
    code: "SP10",
    url: "https://www.instagram.com/wellversed.in/",
  },
  {
    brand: "MuscleBlaze",
    handle: "@muscleblaze",
    code: "SANTHOSHMB",
    url: "https://www.instagram.com/muscleblaze/",
  },
];

export default function DiscountCodes() {
  const [copied, setCopied] = useState("");

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      /* clipboard blocked: ignore */
    }
  };

  return (
    <section id="codes" className="relative bg-[#0b1020] px-5 py-20 md:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="font-display inline-block bg-[#ffc857] px-3 py-1 text-xl text-black">
          Save more
        </p>
        <h2 className="font-display mt-4 text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] text-white">
          Use my <span className="text-[#ff3b30]">codes.</span>
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {CODES.map((c) => (
            <motion.div
              key={c.code}
              whileHover={{ y: -6 }}
              className="border-2 border-white/15 p-6 transition hover:border-[#ff3b30]"
            >
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="font-display text-3xl text-white hover:text-[#ffc857]"
              >
                {c.brand}{" "}
                <span className="text-lg text-white/50">{c.handle} ↗</span>
              </a>
              <div className="mt-5 flex items-stretch gap-3">
                <span className="font-display flex-1 border-2 border-dashed border-[#ffc857] px-4 py-3 text-center text-3xl tracking-widest text-[#ffc857]">
                  {c.code}
                </span>
                <button
                  type="button"
                  onClick={() => copy(c.code)}
                  className="font-display bg-[#ff3b30] px-5 text-xl text-white transition hover:bg-white hover:text-black"
                >
                  {copied === c.code ? "Copied ✓" : "Copy"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
