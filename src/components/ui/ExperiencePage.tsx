"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experience } from "@/data/experience";
import MotionBackground from "./MotionBackground";
import SectionHeader from "./SectionHeader";

export default function ExperiencePage() {
  const [open, setOpen] = useState<string | null>(experience.items[0].id);

  return (
    <MotionBackground className="min-h-screen">
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <SectionHeader
          eyebrow={experience.eyebrow}
          heading={experience.heading}
        />

        <div className="relative pl-8 md:pl-12">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="absolute bottom-0 left-2 top-0 w-[3px] origin-top bg-gradient-to-b from-[#ff3b30] to-[#ffc857]/20"
          />

          {experience.items.map((item, i) => {
            const isOpen = open === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * 0.06 }}
                className="relative mb-5"
              >
                <span
                  className={`absolute -left-[30px] top-7 h-3.5 w-3.5 rotate-45 transition md:-left-[46px] ${
                    isOpen
                      ? "scale-150 bg-[#ffc857] shadow-[0_0_16px_#ffc857]"
                      : "bg-[#ff3b30] shadow-[0_0_14px_rgba(255,59,48,0.6)]"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className={`w-full border border-l-4 bg-[#111830] p-5 text-left transition hover:translate-x-1 md:p-6 ${
                    isOpen
                      ? "border-[#ff3b30]"
                      : "border-white/10 border-l-[#ff3b30] hover:border-[#ff3b30]"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-2xl leading-tight text-white md:text-3xl">
                        {item.role}
                      </p>
                      <p className="mt-1 text-sm text-[#ffc857]">
                        {item.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-[#ffc857] px-3 py-1 font-mono text-xs text-black">
                        {item.period}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        className="font-display text-3xl leading-none text-[#ff3b30]"
                      >
                        +
                      </motion.span>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="my-5 space-y-2">
                          {item.points.map((p) => (
                            <li
                              key={p}
                              className="flex gap-3 text-sm leading-relaxed text-white/75"
                            >
                              <span className="mt-[6px] text-[10px] text-[#ff3b30]">
                                ■
                              </span>
                              {p}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {item.tech.map((t) => (
                            <span
                              key={t}
                              className="border border-white/25 px-2.5 py-1 font-mono text-[11px] uppercase text-white/85 transition hover:border-[#ffc857] hover:text-[#ffc857]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </MotionBackground>
  );
}
