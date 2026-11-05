"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { chapters } from "@/data/story";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const N = chapters.length;
const pad = (n: number) => String(n).padStart(2, "0");

// ECG heartbeat path (10 pulses across a 1000 x 100 box)
const ECG =
  "M0 50 " +
  Array.from({ length: 10 }, (_, i) => {
    const x = i * 100;
    return `L${x + 30} 50 L${x + 40} 50 L${x + 48} 12 L${x + 58} 90 L${x + 66} 50 L${x + 100} 50`;
  }).join(" ");

export default function StoryScroll() {
  const container = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const ecg = useRef<SVGPathElement>(null);
  const segs = useRef<(HTMLDivElement | null)[]>([]);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        pin: stage.current,
        pinSpacing: false,
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (counter.current)
              counter.current.textContent = pad(
                Math.round(self.progress * (N - 1)) + 1,
              );
          },
        },
      });

      const D = N - 1;

      // horizontal slide
      tl.to(track.current, { xPercent: (-100 * D) / N, duration: D }, 0);

      // giant numbers drift (parallax)
      tl.fromTo(".num", { xPercent: 25 }, { xPercent: -25, duration: D }, 0);

      // heartbeat line draws itself
      tl.fromTo(
        ecg.current,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: D },
        0,
      );

      // set bars fill one by one
      segs.current.forEach((el, k) => {
        if (!el) return;
        if (k === 0) gsap.set(el, { scaleX: 1 });
        else tl.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1 }, k - 1);
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      style={{ height: `${N * 150}vh`, position: "relative" }}
    >
      <div
        ref={stage}
        className="relative h-screen overflow-hidden bg-[#0a0a0a] text-white"
      >
        {/* top bar */}
        <div className="font-display absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 pt-24 text-sm tracking-widest text-white/60 md:px-12 md:text-lg">
          <span className="bg-[#c6ff00] px-3 py-1 text-black">The Journey</span>
          <span>
            SET{" "}
            <span ref={counter} className="text-[#c6ff00]">
              01
            </span>{" "}
            / {pad(N)}
          </span>
        </div>

        {/* horizontal track */}
        <div
          ref={track}
          className="flex h-full will-change-transform"
          style={{ width: `${N * 100}vw` }}
        >
          {chapters.map((c, i) => (
            <div
              key={c.id}
              className="relative flex h-full w-screen shrink-0 items-center px-6 md:px-24"
            >
              <span className="num font-display pointer-events-none absolute right-[2%] top-1/2 -translate-y-1/2 select-none text-[clamp(14rem,40vw,38rem)] leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.1)]">
                {pad(i + 1)}
              </span>

              <div className="relative max-w-2xl">
                <p className="font-display inline-block bg-[#c6ff00] px-3 py-1 text-lg text-black">
                  Set {pad(i + 1)}
                </p>
                <h2 className="font-display mt-5 text-[clamp(3.5rem,9vw,9rem)] leading-[0.9] text-white">
                  {c.title}
                </h2>
                <p className="mt-6 max-w-lg border-l-4 border-[#c6ff00] pl-5 text-lg text-white/70 md:text-2xl">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* heartbeat */}
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-14 z-20 h-24 w-full"
        >
          <path
            d={ECG}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
          <path
            ref={ecg}
            d={ECG}
            fill="none"
            stroke="#c6ff00"
            strokeWidth={3}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            vectorEffect="non-scaling-stroke"
            style={{ filter: "drop-shadow(0 0 6px #c6ff00)" }}
          />
        </svg>

        {/* set progress bars */}
        <div className="absolute inset-x-0 bottom-0 z-30 flex gap-2 px-5 pb-6 md:px-12">
          {chapters.map((c, k) => (
            <div key={c.id} className="h-2 flex-1 bg-white/10">
              <div
                ref={(el) => {
                  segs.current[k] = el;
                }}
                className="h-full origin-left bg-[#c6ff00]"
                style={{ transform: k === 0 ? "scaleX(1)" : "scaleX(0)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
