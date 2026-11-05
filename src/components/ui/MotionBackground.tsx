"use client";

import { useEffect, useRef } from "react";

const GAP = 32;
const MOUSE_R = 150;
const RING_W = 70;
const RING_LIFE = 2.4; // seconds
const RING_SPEED = 520; // px/s

type Ripple = { x: number; y: number; t: number };

type Props = { children: React.ReactNode; className?: string };

export default function MotionBackground({ children, className = "" }: Props) {
  const wrap = useRef<HTMLElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const ripples = useRef<Ripple[]>([]);

  useEffect(() => {
    const el = wrap.current;
    const c = cvs.current;
    if (!el || !c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let lastPulse = 0;

    const resize = () => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    function draw(now: number) {
      raf = 0;
      if (!visible) return;

      if (!reduce && now - lastPulse > 3200) {
        lastPulse = now;
        ripples.current.push({ x: w * 0.72, y: h * 0.38, t: now });
      }
      ripples.current = ripples.current.filter(
        (r) => (now - r.t) / 1000 < RING_LIFE,
      );

      ctx!.clearRect(0, 0, w, h);
      const m = mouse.current;

      // soft glow under cursor
      if (m.x > -999) {
        const g = ctx!.createRadialGradient(m.x, m.y, 0, m.x, m.y, 260);
        g.addColorStop(0, "rgba(255,59,48,0.16)");
        g.addColorStop(1, "rgba(255,59,48,0)");
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, w, h);
      }

      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      const offX = (w - (cols - 1) * GAP) / 2;
      const offY = (h - (rows - 1) * GAP) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = offX + i * GAP;
          let y = offY + j * GAP;
          let boost = 0;

          if (!reduce) {
            const dx = x - m.x;
            const dy = y - m.y;
            const d = Math.hypot(dx, dy);
            if (d < MOUSE_R && d > 0.01) {
              const f = 1 - d / MOUSE_R;
              x += (dx / d) * f * 18;
              y += (dy / d) * f * 18;
              boost = f;
            }

            for (const r of ripples.current) {
              const age = (now - r.t) / 1000;
              const radius = age * RING_SPEED;
              const rx = x - r.x;
              const ry = y - r.y;
              const dd = Math.hypot(rx, ry);
              const diff = Math.abs(dd - radius);
              if (diff < RING_W && dd > 0.01) {
                const f = (1 - diff / RING_W) * (1 - age / RING_LIFE);
                x += (rx / dd) * f * 14;
                y += (ry / dd) * f * 14;
                if (f > boost) boost = f;
              }
            }
          }

          const size = 1.3 + boost * 3.4;
          const alpha = 0.16 + boost * 0.84;
          ctx!.fillStyle =
            boost > 0.55
              ? `rgba(255,200,87,${alpha})`
              : `rgba(255,${Math.round(90 + boost * 160)},${Math.round(80 - boost * 40)},${alpha})`;
          ctx!.beginPath();
          ctx!.arc(x, y, size, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    }

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(performance.now());
    });
    ro.observe(el);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(draw);
    });
    io.observe(el);

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const rel = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <section
      ref={wrap}
      onPointerMove={(e) => {
        mouse.current = rel(e);
      }}
      onPointerLeave={() => {
        mouse.current = { x: -9999, y: -9999 };
      }}
      onPointerDown={(e) => {
        const p = rel(e);
        ripples.current.push({ ...p, t: performance.now() });
      }}
      className={`relative overflow-hidden bg-[#0b1020] ${className}`}
    >
      <canvas
        ref={cvs}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* depth: corner glows + edge fade */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(255,59,48,0.18),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(255,200,87,0.10),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1020] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0b1020] to-transparent" />

      <div className="relative z-10">{children}</div>
    </section>
  );
}
