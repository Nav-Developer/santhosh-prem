"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WA = "919XXXXXXXXX";

export default function StickyCTA() {
  const [barVisible, setBarVisible] = useState(false);
  const [barDismissed, setBarDismissed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  useEffect(() => {
    try {
      if (sessionStorage.getItem("bar-dismissed")) setBarDismissed(true);
    } catch {}
    const onScroll = () => setBarVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showBar = barVisible && !barDismissed;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const sharp = { borderRadius: 0 } as const;

  return (
    <>
      {/* WhatsApp button */}
      <a
        href={`https://wa.me/${WA}?text=Hi%20Santhosh Prem %2C%20I%20want%20to%20start%20training`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp Santhosh Prem "
        className={`fixed right-4 z-[60] grid h-14 w-14 place-items-center bg-[#c6ff00] text-black shadow-[0_0_24px_rgba(198,255,0,0.45)] transition-all hover:bg-white md:right-6 ${
          showBar ? "bottom-4 md:bottom-28" : "bottom-4 md:bottom-6"
        }`}
      >
        <WhatsAppIcon />
      </a>

      {/* Sticky enquiry bar (desktop) */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed inset-x-0 bottom-0 z-50 hidden border-t-4 border-[#c6ff00] bg-[#0a0a0a] md:block"
          >
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
              <div className="shrink-0">
                <p className="font-display text-2xl text-[#c6ff00]">
                  Start your transformation
                </p>
                <p className="text-xs text-white/60">
                  Online + in-person · Custom plans · Contest-prep tested
                </p>
              </div>

              {status === "done" ? (
                <p className="font-display flex-1 text-center text-xl text-[#c6ff00]">
                  Got it! I&apos;ll reach out shortly.
                </p>
              ) : (
                <form
                  onSubmit={submit}
                  className="flex flex-1 items-center gap-3"
                >
                  <input
                    name="name"
                    required
                    placeholder="Your Name"
                    className="field"
                    style={sharp}
                  />
                  <input
                    name="phone"
                    required
                    type="tel"
                    pattern="[0-9+\s]{10,14}"
                    placeholder="Phone Number"
                    className="field"
                    style={sharp}
                  />
                  <input
                    name="goal"
                    required
                    placeholder="Your Goal (fat loss, muscle...)"
                    className="field"
                    style={sharp}
                  />
                  <button
                    disabled={status === "sending"}
                    className="font-display shrink-0 bg-[#c6ff00] px-8 py-3.5 text-lg text-black transition hover:bg-white disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Join Now →"}
                  </button>
                </form>
              )}
              {status === "error" && (
                <span className="text-xs text-red-400">Try again</span>
              )}

              <button
                aria-label="Dismiss"
                onClick={() => {
                  setBarDismissed(true);
                  try {
                    sessionStorage.setItem("bar-dismissed", "1");
                  } catch {}
                }}
                className="grid h-10 w-10 shrink-0 place-items-center border-2 border-white/30 text-white transition hover:border-[#c6ff00] hover:text-[#c6ff00]"
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
