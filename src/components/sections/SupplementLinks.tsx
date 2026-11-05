"use client";

import { SUPPLEMENTS } from "@/data/link";
import { motion } from "framer-motion";

export default function SupplementLinks() {
  return (
    <section id="shop" className="bg-[#111830] px-5 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-display inline-block bg-[#ff3b30] px-3 py-1 text-lg text-white">
          The Stack
        </p>
        <h2 className="font-display mt-4 text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] text-white">
          What I actually <span className="text-[#ffc857]">use.</span>
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUPPLEMENTS.map((s, k) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: k * 0.08 }}
              whileHover={{ y: -8, rotate: -1 }}
              className="group flex flex-col justify-between border-2 border-white/15 bg-[#0b1020] p-6 transition-colors hover:border-[#ffc857]"
            >
              <span className="text-5xl transition-transform group-hover:scale-125">
                {s.emoji}
              </span>
              <div className="mt-10">
                <p className="font-mono text-xs uppercase tracking-widest text-white/50">
                  {s.tag}
                </p>
                <h3 className="font-display mt-1 text-3xl text-white">
                  {s.name}
                </h3>
                <span className="font-display mt-3 inline-block text-lg text-[#ffc857] transition group-hover:translate-x-2">
                  Shop now →
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <p className="mt-6 text-xs text-white/40">
          Affiliate links. Buying through them supports the channel at no extra
          cost to you.
        </p>
      </div>
    </section>
  );
}
