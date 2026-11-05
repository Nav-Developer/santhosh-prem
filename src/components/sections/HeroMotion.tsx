// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import {
//   animate,
//   motion,
//   useInView,
//   useMotionValue,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import assets from "@/assets";
// import ScrambleText from "@/components/ui/ScrambleText";

// const FULL_NAME = "Santhosh Prem";
// const ROLE = "Fitness Coach · Creator · Fitnanba Founder";
// const WORDS = ["Strength", "Discipline", "Confidence", "Results"];
// const TAGLINE = "I help you get into the best shape of your life.";
// const STATS = [
//   { to: 2, suffix: "M+", v: "Followers" },
//   { to: 2225, suffix: "+", v: "Posts" },
//   { to: 4, suffix: "", v: "Programs" },
// ];
// const TAPE_1 = [
//   "Body Recomp",
//   "Weight Loss",
//   "Lean Gaining",
//   "PCOD / Thyroid",
//   "Online Coaching",
//   "Diet Plans",
// ];
// const TAPE_2 = ["Train", "Eat", "Sleep", "Repeat", "Fitnanba", "No excuses"];
// const PHOTO = assets.images.me;

// function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
//   const ref = useRef<HTMLSpanElement>(null);
//   const inView = useInView(ref, { once: true });
//   const [val, setVal] = useState(0);
//   useEffect(() => {
//     if (!inView) return;
//     const c = animate(0, to, {
//       duration: 1.6,
//       ease: "easeOut",
//       onUpdate: (v) => setVal(Math.round(v)),
//     });
//     return () => c.stop();
//   }, [inView, to]);
//   return (
//     <span ref={ref}>
//       {val.toLocaleString("en-IN")}
//       {suffix}
//     </span>
//   );
// }

// function Tape({
//   items,
//   reverse = false,
//   className,
// }: {
//   items: string[];
//   reverse?: boolean;
//   className: string;
// }) {
//   return (
//     <div
//       className={`absolute -left-[5%] w-[110%] overflow-hidden ${className}`}
//     >
//       <motion.div
//         className="font-display flex w-max whitespace-nowrap py-2 text-2xl md:text-3xl"
//         animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
//         transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
//       >
//         {[...items, ...items, ...items, ...items].map((t, k) => (
//           <span key={k} className="mx-6 inline-flex items-center gap-12">
//             {t}
//             <span>✚</span>
//           </span>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// export default function HeroMotion() {
//   const [i, setI] = useState(0);

//   const mx = useMotionValue(0);
//   const my = useMotionValue(0);
//   const sx = useSpring(mx, { stiffness: 80, damping: 20 });
//   const sy = useSpring(my, { stiffness: 80, damping: 20 });
//   const imgX = useTransform(sx, [-0.5, 0.5], [-20, 20]);
//   const imgY = useTransform(sy, [-0.5, 0.5], [-14, 14]);
//   const nameX = useTransform(sx, [-0.5, 0.5], [16, -16]);
//   const glowX = useTransform(sx, [-0.5, 0.5], ["30%", "80%"]);

//   useEffect(() => {
//     const t = setInterval(() => setI((p) => (p + 1) % WORDS.length), 2800);
//     return () => clearInterval(t);
//   }, []);

//   const go = (id: string) => (e: React.MouseEvent) => {
//     e.preventDefault();
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <section
//       className="relative min-h-screen overflow-hidden bg-[#0b1020]"
//       onMouseMove={(e) => {
//         const r = e.currentTarget.getBoundingClientRect();
//         mx.set((e.clientX - r.left) / r.width - 0.5);
//         my.set((e.clientY - r.top) / r.height - 0.5);
//       }}
//     >
//       {/* cursor-following glow */}
//       <motion.div
//         className="pointer-events-none absolute inset-0"
//         style={{
//           background: useTransform(
//             glowX,
//             (x) =>
//               `radial-gradient(600px circle at ${x} 40%, rgba(255,200,87,0.14), transparent 60%)`,
//           ),
//         }}
//       />

//       {/* giant outlined name */}
//       <motion.div
//         initial={{ opacity: 0, y: 60 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, delay: 0.2 }}
//         className="pointer-events-none absolute inset-x-0 top-[10%]"
//       >
//         <motion.div
//           style={{ x: nameX }}
//           className="font-display select-none text-center text-[clamp(9rem,32vw,34rem)] leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.07)]"
//         >
//           {FULL_NAME}
//         </motion.div>
//       </motion.div>

//       {/* photo: full colour */}
//       <motion.div
//         initial={{ opacity: 0, x: 80 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
//         className="absolute inset-y-0 right-0 w-full overflow-hidden opacity-30 md:w-[54%] md:opacity-100 md:[clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]"
//       >
//         <motion.div
//           style={{ x: imgX, y: imgY, scale: 1.08 }}
//           className="absolute inset-0"
//         >
//           <Image
//             src={PHOTO}
//             alt={FULL_NAME}
//             fill
//             priority
//             sizes="(min-width:768px) 54vw, 100vw"
//             className="object-cover object-top contrast-110 saturate-110"
//           />
//         </motion.div>
//         <div className="absolute inset-0 bg-gradient-to-r from-[#0b1020] via-[#0b1020]/20 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0b1020] to-transparent" />
//       </motion.div>

//       {/* slash line */}
//       <div
//         className="pointer-events-none absolute inset-y-0 right-[54%] hidden w-[4px] md:block"
//         style={{
//           background: "linear-gradient(180deg,#ffc857,#ff3b30)",
//           transform: "translateX(-1px) skewX(-11deg)",
//         }}
//       />

//       {/* sticker */}
//       <motion.div
//         initial={{ scale: 0, rotate: -30 }}
//         animate={{ scale: 1, rotate: -8 }}
//         whileHover={{ rotate: 2, scale: 1.08 }}
//         transition={{ delay: 1.2, type: "spring", stiffness: 160, damping: 12 }}
//         className="font-display absolute right-[6%] top-[26%] z-20 hidden cursor-default bg-[#ffc857] px-5 py-3 text-center text-black md:block"
//       >
//         <span className="block text-sm tracking-widest">
//           🎓 Stanford · Nutrition Science
//         </span>
//         <span className="block text-3xl leading-none">
//           2M+ Strong Community
//         </span>
//       </motion.div>

//       {/* content */}
//       <div className="relative z-20 mx-auto flex w-full max-w-7xl items-center px-5 pb-52 pt-32 md:min-h-screen md:px-6 md:pb-56 md:pt-36">
//         <div className="w-full max-w-3xl">
//           <motion.p
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3 }}
//             className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-white/70 md:text-sm"
//           >
//             <span className="h-[2px] w-10 bg-[#ffc857]" />
//             {ROLE}
//           </motion.p>

//           <h1 className="font-display mt-5 text-[clamp(3.6rem,9vw,9.5rem)] leading-[0.88]">
//             <motion.span
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.5 }}
//               className="block text-white"
//             >
//               Build your
//             </motion.span>
//             <span className="block whitespace-nowrap bg-gradient-to-r from-[#ff3b30] via-[#ff8a3d] to-[#ffc857] bg-clip-text text-transparent">
//               <ScrambleText key={WORDS[i]} text={`${WORDS[i]}.`} />
//             </span>
//           </h1>

//           <motion.p
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.9 }}
//             className="mt-5 max-w-md border-l-4 border-[#ffc857] pl-4 text-base text-white/70 md:text-xl"
//           >
//             {TAGLINE}
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.05 }}
//             className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:gap-4"
//           >
//             <a
//               href="#coaching"
//               onClick={go("coaching")}
//               className="font-display group inline-flex items-center justify-center gap-2 bg-[#ffc857] px-5 py-4 text-xl text-black transition hover:-translate-y-1 hover:bg-white sm:px-9 md:text-2xl"
//             >
//               Start Coaching
//               <span className="transition group-hover:translate-x-1">→</span>
//             </a>
//             <a
//               href="#shop"
//               onClick={go("shop")}
//               className="font-display inline-flex items-center justify-center border-2 border-white px-5 py-4 text-xl text-white transition hover:-translate-y-1 hover:bg-white hover:text-black sm:px-9 md:text-2xl"
//             >
//               Shop Gear
//             </a>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.3 }}
//             className="mt-9 grid max-w-xl grid-cols-3 divide-x divide-white/15 border-y border-white/15"
//           >
//             {STATS.map((s) => (
//               <div key={s.v} className="px-3 py-4 first:pl-0 md:px-6">
//                 <p className="font-display text-5xl text-[#ffc857] md:text-7xl">
//                   <CountUp to={s.to} suffix={s.suffix} />
//                 </p>
//                 <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50 md:text-xs">
//                   {s.v}
//                 </p>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>

//       <Tape
//         items={TAPE_2}
//         reverse
//         className="bottom-[40px] z-30 rotate-[1.6deg] bg-white text-black"
//       />
//       <Tape
//         items={TAPE_1}
//         className="bottom-[24px] z-40 -rotate-[1.6deg] bg-[#ff3b30] text-white"
//       />
//     </section>
//   );
// }
