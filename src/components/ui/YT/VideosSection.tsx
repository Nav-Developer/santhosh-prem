// "use client";

// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// /* ------------------------------------------------------------------ */
// /*  EDIT HERE: just paste the video links. IDs are picked up for you.  */
// /* ------------------------------------------------------------------ */

// const YOUTUBE_LINKS: string[] = [
//   // "https://www.youtube.com/watch?v=XXXXXXXXXXX",
//   // "https://www.youtube.com/shorts/XXXXXXXXXXX",
//   // "https://youtu.be/XXXXXXXXXXX",
// ];

// const INSTAGRAM_LINKS: string[] = [
//   // "https://www.instagram.com/reel/XXXXXXXXXXX/",
//   // "https://www.instagram.com/p/XXXXXXXXXXX/",
// ];

// const YOUTUBE_CHANNEL = "https://www.youtube.com/@santhosh_prem";
// const INSTAGRAM_PROFILE = "https://www.instagram.com/santhosh_prem/";

// /* ------------------------------------------------------------------ */

// type Tab = "youtube" | "instagram";

// function youtubeInfo(url: string) {
//   const m =
//     url.match(/[?&]v=([\w-]{11})/) ||
//     url.match(/youtu\.be\/([\w-]{11})/) ||
//     url.match(/shorts\/([\w-]{11})/) ||
//     url.match(/embed\/([\w-]{11})/);
//   return m ? { id: m[1], short: url.includes("/shorts/") } : null;
// }

// function instagramCode(url: string) {
//   const m = url.match(/instagram\.com\/(?:reel|reels|p|tv)\/([\w-]+)/);
//   return m ? m[1] : null;
// }

// function YouTubeCard({ url }: { url: string }) {
//   const info = youtubeInfo(url);
//   const [play, setPlay] = useState(false);
//   if (!info) return null;

//   return (
//     <div
//       className={`relative overflow-hidden border-2 border-white/15 bg-[#111830] ${
//         info.short ? "aspect-[9/16]" : "aspect-video"
//       }`}
//     >
//       {play ? (
//         <iframe
//           src={`https://www.youtube-nocookie.com/embed/${info.id}?autoplay=1&rel=0`}
//           title="YouTube video"
//           allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
//           allowFullScreen
//           className="absolute inset-0 h-full w-full"
//         />
//       ) : (
//         <button
//           type="button"
//           onClick={() => setPlay(true)}
//           aria-label="Play video"
//           className="group absolute inset-0 h-full w-full"
//         >
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img
//             src={`https://i.ytimg.com/vi/${info.id}/hqdefault.jpg`}
//             alt=""
//             loading="lazy"
//             className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//           />
//           <span className="absolute inset-0 bg-black/30 transition group-hover:bg-black/10" />
//           <span className="font-display absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#ff3b30] pl-1 text-3xl text-white transition group-hover:scale-110">
//             ▶
//           </span>
//         </button>
//       )}
//     </div>
//   );
// }

// function InstagramCard({ url }: { url: string }) {
//   const code = instagramCode(url);
//   const [play, setPlay] = useState(false);
//   if (!code) return null;

//   return (
//     <div className="relative aspect-[9/16] overflow-hidden border-2 border-white/15 bg-[#111830]">
//       {play ? (
//         <iframe
//           src={`https://www.instagram.com/p/${code}/embed`}
//           title="Instagram post"
//           loading="lazy"
//           allowFullScreen
//           className="absolute inset-0 h-full w-full bg-white"
//         />
//       ) : (
//         <button
//           type="button"
//           onClick={() => setPlay(true)}
//           aria-label="Play reel"
//           className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#ff3b30]/30 via-[#111830] to-[#ffc857]/20"
//         >
//           <span className="font-display flex h-16 w-16 items-center justify-center bg-[#ff3b30] pl-1 text-3xl text-white transition group-hover:scale-110">
//             ▶
//           </span>
//           <span className="font-display text-2xl text-white">Play reel</span>
//           <span className="text-sm text-white/50">Instagram</span>
//         </button>
//       )}
//     </div>
//   );
// }

// export default function VideosSection() {
//   const [tab, setTab] = useState<Tab>("youtube");

//   const yt = YOUTUBE_LINKS.filter((u) => youtubeInfo(u));
//   const ig = INSTAGRAM_LINKS.filter((u) => instagramCode(u));

//   const tabs: { id: Tab; label: string; count: number }[] = [
//     { id: "youtube", label: "YouTube", count: yt.length },
//     { id: "instagram", label: "Instagram", count: ig.length },
//   ];

//   const list = tab === "youtube" ? yt : ig;
//   const profile = tab === "youtube" ? YOUTUBE_CHANNEL : INSTAGRAM_PROFILE;

//   return (
//     <section id="videos" className="relative bg-[#0b1020] px-5 py-24 md:px-12">
//       <div className="mx-auto max-w-6xl">
//         <p className="font-display inline-block bg-[#ffc857] px-3 py-1 text-xl text-black">
//           Watch
//         </p>
//         <h2 className="font-display mt-4 text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-white">
//           Latest <span className="text-[#ff3b30]">videos.</span>
//         </h2>

//         <div className="mt-8 flex flex-wrap gap-3">
//           {tabs.map((t) => (
//             <button
//               key={t.id}
//               type="button"
//               onClick={() => setTab(t.id)}
//               className={`font-display border-2 px-6 py-2 text-xl transition ${
//                 tab === t.id
//                   ? "border-[#ff3b30] bg-[#ff3b30] text-white"
//                   : "border-white/20 text-white/70 hover:border-white"
//               }`}
//             >
//               {t.label}
//               {t.count > 0 && (
//                 <span className="ml-2 text-base opacity-70">{t.count}</span>
//               )}
//             </button>
//           ))}
//         </div>

//         <div className="mt-8">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={tab}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.25 }}
//               className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
//             >
//               {list.length === 0 ? (
//                 <p className="text-white/60 sm:col-span-2 lg:col-span-3">
//                   Videos coming soon.
//                 </p>
//               ) : tab === "youtube" ? (
//                 list.map((u) => <YouTubeCard key={u} url={u} />)
//               ) : (
//                 list.map((u) => <InstagramCard key={u} url={u} />)
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <a
//           href={profile}
//           target="_blank"
//           rel="noreferrer"
//           className="font-display mt-10 inline-block border-2 border-white/30 px-8 py-3 text-xl text-white transition hover:border-[#ffc857] hover:text-[#ffc857]"
//         >
//           {tab === "youtube" ? "More on YouTube ↗" : "More on Instagram ↗"}
//         </a>
//       </div>
//     </section>
//   );
// }
