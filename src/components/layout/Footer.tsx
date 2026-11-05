"use client";

import { motion } from "framer-motion";
import {
  DEV_INSTAGRAM,
  FITNANBA,
  INSTAGRAM,
  WEBSITE_URL,
  WHATSAPP_NUMBER,
  WORDS,
  YOUTUBE,
} from "@/data/constant";

const nav = [
  { label: "About", href: "#about" },
  { label: "Coaching", href: "/join" },
  { label: "Shop", href: "#shop" },
];

export default function Footer() {
  const go = (href: string) => (e: React.MouseEvent) => {
    // real page links (e.g. /join) navigate normally
    if (!href.startsWith("#")) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t-4 border-[#ff3b30] bg-[#0b1020] text-white/60">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,59,48,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-6 pt-16 md:px-10">
        {/* big words */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-between">
          {WORDS.map((w, k) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: k * 0.1 }}
              whileHover={{ y: -8, color: k % 2 ? "#ffc857" : "#ff3b30" }}
              className="font-display cursor-default text-[clamp(3rem,10vw,9rem)] leading-none text-white/90 transition-colors"
            >
              {w}
              <span className="text-[#ff3b30]">.</span>
            </motion.span>
          ))}
        </div>

        {/* actions */}
        <div className="mt-12 flex flex-col items-center justify-between gap-8 border-y border-white/10 py-8 md:flex-row">
          <nav className="flex gap-6">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={go(n.href)}
                className="font-display text-2xl text-white/70 transition hover:text-[#ffc857]"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="font-display border-2 border-white/30 px-5 py-2 text-xl text-white transition hover:-translate-y-1 hover:border-[#ffc857] hover:text-[#ffc857]"
            >
              Instagram ↗
            </a>
            <a
              href={FITNANBA}
              target="_blank"
              rel="noreferrer"
              className="font-display border-2 border-white/30 px-5 py-2 text-xl text-white transition hover:-translate-y-1 hover:border-[#ffc857] hover:text-[#ffc857]"
            >
              Fitnanba ↗
            </a>
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noreferrer"
              className="font-display border-2 border-white/30 px-5 py-2 text-xl text-white transition hover:-translate-y-1 hover:border-[#ff3b30] hover:text-[#ff3b30]"
            >
              YouTube ↗
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="font-display bg-[#25D366] px-5 py-2 text-xl text-black transition hover:-translate-y-1"
            >
              WhatsApp →
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="font-display bg-[#ff3b30] px-5 py-2 text-xl text-white transition hover:-translate-y-1 hover:bg-white hover:text-black"
            >
              Top ↑
            </button>
          </div>
        </div>

        {/* legal + credit */}
        <div className="mt-6 space-y-1 text-center text-xs uppercase tracking-[0.18em] text-white/50">
          <p>
            © {new Date().getFullYear()} Santhosh Prem. All rights reserved.
          </p>
          <p>
            Designed & Developed by{" "}
            <a
              href={WEBSITE_URL}
              target="_blank"
              rel="noreferrer"
              className="text-[#ffc857] transition hover:text-white"
            >
              Naveen Kumar
            </a>{" "}
            ·{" "}
            <a
              href={DEV_INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-2 transition hover:text-[#ffc857] hover:underline"
            >
              Instagram ↗
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
