"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "NestJS",
  "MongoDB",
  "GSAP",
];

export default function UnderConstruction() {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 50, y: 50 });

  return (
    <section
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07040f] px-6 text-white"
      style={{
        background: `radial-gradient(
          circle at ${position.x}% ${position.y}%,
          rgba(109, 40, 217, 0.18),
          transparent 45%
        ), #07040f`,
      }}
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,.2) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,.2) 1px,transparent 1px)",
          backgroundSize: "55px 55px",
          maskImage: "radial-gradient(ellipse at center,black,transparent 75%)",
        }}
      />

      {/* Ambient floating particles */}
      {Array.from({ length: 24 }, (_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-violet-300"
          style={{
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 53 + 17) % 100}%`,
          }}
          animate={{
            y: [0, -45, 0],
            opacity: [0.15, 0.9, 0.15],
            scale: [0.7, 1.4, 0.7],
          }}
          transition={{
            duration: 3 + (i % 5),
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Left content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-white/[0.04] px-4 py-2 font-mono text-xs text-violet-200"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-emerald-400"
            />
            CURRENTLY IN DEVELOPMENT
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-3 font-mono text-sm text-gray-400"
          >
            Something new is taking shape.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Under
            <br />
            <span className="bg-gradient-to-r from-purple-300 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              Construction.
            </span>
          </motion.h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-400 sm:text-lg">
            I’m crafting something worth the wait. This corner of my portfolio
            is still under development — come back soon to see what’s next.
          </p>

          {/* Animated progress indicator */}
          <div className="mt-8 max-w-sm">
            <div className="mb-3 flex justify-between font-mono text-xs text-gray-500">
              <span>BUILDING SOMETHING AWESOME</span>
              <motion.span
                animate={{ opacity: [1, 0.45, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-violet-300"
              >
                IN PROGRESS
              </motion.span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full w-1/3 rounded-full bg-gradient-to-r from-blue-400 via-violet-500 to-purple-400"
                animate={{ x: ["-100%", "300%"] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/")}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-semibold shadow-lg shadow-purple-500/20 transition hover:scale-105"
            >
              ← Back to Home
            </button>

            <button
              onClick={() => router.push("/#contact")}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold transition hover:border-purple-400/50 hover:bg-white/[0.08]"
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Right animated illustration */}
        <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
          {/* Glow */}
          <motion.div
            className="absolute h-64 w-64 rounded-full bg-purple-600/20 blur-[90px]"
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Orbiting rings */}
          <motion.div
            className="absolute h-72 w-72 rounded-full border border-purple-400/20 sm:h-80 sm:w-80"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_15px_#60a5fa]" />
          </motion.div>

          <motion.div
            className="absolute h-60 w-60 rounded-full border border-dashed border-violet-300/20 sm:h-64 sm:w-64"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />

          {/* Main glass card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative w-full max-w-[340px] rounded-3xl border border-white/10 bg-[#110b20]/85 p-5 shadow-[0_0_80px_rgba(124,58,237,0.15)] backdrop-blur-xl"
          >
            <div className="mb-7 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <span className="font-mono text-[10px] text-gray-500">
                project.build
              </span>
            </div>

            {/* Animated construction icon */}
            <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-violet-400/10 bg-gradient-to-br from-violet-500/10 via-[#0b0715] to-blue-500/10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute h-36 w-36 rounded-full border border-dashed border-violet-400/30"
              />

              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-4, 4, -4] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-violet-300/20 bg-gradient-to-br from-violet-500/30 to-blue-500/20 shadow-[0_0_50px_rgba(139,92,246,0.25)]"
              >
                <svg viewBox="0 0 100 100" className="h-14 w-14" fill="none">
                  <path
                    d="M50 12 90 82H10L50 12Z"
                    stroke="#c4b5fd"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M50 38V56M50 68V69"
                    stroke="#93c5fd"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              <motion.span
                animate={{ y: [-20, 20], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute right-12 top-8 text-xl text-violet-300"
              >
                ✦
              </motion.span>
              <motion.span
                animate={{ y: [15, -15], opacity: [0.1, 1, 0.1] }}
                transition={{ duration: 2.8, repeat: Infinity }}
                className="absolute bottom-8 left-12 text-sm text-blue-300"
              >
                ✧
              </motion.span>
            </div>

            <div className="mt-5">
              <h2 className="text-xl font-bold">Something is brewing.</h2>
              <p className="mt-1 text-sm text-gray-400">
                Designing. Developing. Perfecting.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-emerald-400"
                />
                <span className="font-mono text-xs text-emerald-300">
                  BUILD IN PROGRESS
                </span>
              </div>
              <span className="font-mono text-xs text-gray-500">v1.0.0</span>
            </div>
          </motion.div>
        </div>

        {/* Technology ticker */}
        <div className="overflow-hidden border-t border-white/10 pt-5 md:col-span-2">
          <motion.div
            className="flex w-max gap-8 font-mono text-xs text-violet-200/70"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {[
              ...technologies,
              ...technologies,
              ...technologies,
              ...technologies,
            ].map((tech, i) => (
              <span key={i} className="flex items-center gap-8">
                {tech}
                <span className="text-purple-500">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
