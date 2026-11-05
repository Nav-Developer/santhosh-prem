"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import assets from "@/assets";
import EnquiryDialog from "../layout/EnquiryDialog";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/data/constant";

const FULL_NAME = "Santhosh Prem ";
const ROLE = "Fitness Trainer · Physique Athlete";
const WORDS = ["Strength", "Physique", "Discipline", "Confidence"];
const TAGLINE = "Iron addict. Contest-prep tested. Let's build your best body.";
const STATS = [
  { k: "5+", v: "Years lifting" },
  { k: "100+", v: "Clients trained" },
  { k: "2026", v: "Muscle Man" },
];
const TAPE_1 = [
  "Hypertrophy",
  "Strength",
  "Fat Loss",
  "Contest Prep",
  "Online Coaching",
  "Diet Plans",
];
const TAPE_2 = ["No excuses", "Train", "Eat", "Sleep", "Repeat", "Iron addict"];
const PHOTO = assets.images.me;

const LIME = "#c6ff00";

function Tape({
  items,
  reverse = false,
  className,
}: {
  items: string[];
  reverse?: boolean;
  className: string;
}) {
  return (
    <div
      className={`absolute -left-[5%] w-[110%] overflow-hidden ${className}`}
    >
      <motion.div
        className="font-display flex w-max whitespace-nowrap py-2.5 text-xl md:text-2xl"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((t, k) => (
          <span key={k} className="mx-6 inline-flex items-center gap-12">
            {t}
            <span>✚</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function HeroMotion() {
  const [i, setI] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* giant outlined name behind everything */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="font-display pointer-events-none absolute inset-x-0 top-[12%] select-none text-center text-[clamp(8rem,28vw,30rem)] leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.08)]"
      >
        {FULL_NAME}
      </motion.div>

      {/* photo: right side, diagonal cut */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 right-0 w-full opacity-30 md:w-[54%] md:opacity-100 md:[clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]"
      >
        <Image
          src={PHOTO}
          alt={FULL_NAME}
          fill
          priority
          sizes="(min-width:768px) 54vw, 100vw"
          className="object-cover object-top grayscale contrast-125"
        />
        {/* fade into black on the left + bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        {/* lime duotone tint */}
        <div className="absolute inset-0 bg-[#c6ff00] mix-blend-multiply opacity-[0.18]" />
      </motion.div>

      {/* lime slash line along the cut */}
      <div
        className="pointer-events-none absolute inset-y-0 right-[54%] hidden w-[3px] origin-top-right -skew-x-[11deg] md:block"
        style={{
          background: LIME,
          transform: "translateX(-1px) skewX(-11deg)",
        }}
      />

      {/* sticker */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: -8 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 160, damping: 12 }}
        className="font-display absolute right-[6%] top-[26%] z-20 hidden bg-[#c6ff00] px-5 py-3 text-center text-black md:block"
      >
        <span className="block text-sm tracking-widest">🏆 District Level</span>
        <span className="block text-3xl leading-none">Muscle Man 2026</span>
      </motion.div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl items-center px-5 pb-52 pt-32 md:min-h-screen md:px-6 md:pb-56 md:pt-36">
        <div className="w-full max-w-2xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-white/70 md:text-sm"
          >
            <span className="h-[2px] w-10 bg-[#c6ff00]" />
            {ROLE}
          </motion.p>

          <h1 className="font-display mt-5 text-[clamp(3.4rem,8.5vw,9rem)] leading-[0.9]">
            <span className="block overflow-hidden">
              <motion.span
                className="block text-white"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Forge your
              </motion.span>
            </span>
            <span className="relative block h-[1.05em] overflow-hidden text-[#c6ff00]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[i]}
                  className="absolute left-0 top-0 block whitespace-nowrap"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {WORDS[i]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-5 max-w-md border-l-4 border-[#c6ff00] pl-4 text-base text-white/70 md:text-xl"
          >
            {TAGLINE}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
            className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:gap-4"
          >
            <a
              href="#projects"
              className="font-display group inline-flex items-center justify-center gap-2 bg-[#c6ff00] px-5 py-4 text-lg text-black transition hover:-translate-y-1 hover:bg-white sm:px-9 md:text-xl"
            >
              Transformations
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
            <button
              type="button"
              onClick={() => setEnquiryOpen(true)}
              className="font-display inline-flex items-center justify-center border-2 border-white px-5 py-4 text-lg text-white transition hover:-translate-y-1 hover:bg-white hover:text-black sm:px-9 md:text-xl"
            >
              Join Now
            </button>
            <EnquiryDialog
              open={enquiryOpen}
              onClose={() => setEnquiryOpen(false)}
              title="Start Your Transformation"
              enquiryLabel="Training Enquiry"
              defaultSubject=""
              defaultMessage=""
              whatsappNumber={WHATSAPP_NUMBER}
              email={CONTACT_EMAIL}
              recipientName={FULL_NAME}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-9 grid max-w-xl grid-cols-3 divide-x divide-white/15 border-y border-white/15"
          >
            {STATS.map((s) => (
              <div key={s.v} className="px-3 py-4 first:pl-0 md:px-6">
                <p className="font-display text-4xl text-[#c6ff00] md:text-6xl">
                  {s.k}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50 md:text-xs">
                  {s.v}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* crossing tapes */}
      <Tape
        items={TAPE_2}
        reverse
        className="bottom-[34px] z-30 rotate-[1.6deg] bg-white text-black"
      />
      <Tape
        items={TAPE_1}
        className="bottom-[22px] z-40 -rotate-[1.6deg] bg-[#c6ff00] text-black"
      />
    </section>
  );
}
