"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { WHATSAPP_NUMBER } from "@/data/constant";
import { COACHING_GOALS, SOURCES } from "@/data/link";

const inputCls =
  "w-full border-2 border-white/15 bg-transparent px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#ff3b30]";

export default function CoachingSection() {
  const [step, setStep] = useState(0);
  const [goalId, setGoalId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const [reason, setReason] = useState("");

  const goal = COACHING_GOALS.find((g) => g.id === goalId);
  const digits = phone.replace(/\D/g, "").slice(-10);
  const phoneOk = digits.length === 10;
  const detailsOk =
    name.trim() && phoneOk && source && reason.trim().length >= 10;

  const send = () => {
    if (!goal) return;
    const msg = [
      `Hi Santhosh! 👋`,
      ``,
      `*Goal:* ${goal.title} (${goal.duration})`,
      `*Name:* ${name.trim()}`,
      `*Phone:* +91 ${digits}`,
      `*Heard about you from:* ${source}`,
      ``,
      `*Why I want to transform:*`,
      reason.trim(),
      ``,
      `I'm sending my current photo below 📸`,
    ].join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section
      id="coaching"
      className="relative bg-[#0b1020] px-5 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-display inline-block bg-[#ffc857] px-3 py-1 text-lg text-black">
          Paid Coaching
        </p>
        <h2 className="font-display mt-4 text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] text-white">
          Choose your goal. <span className="text-[#ff3b30]">Start now.</span>
        </h2>

        {/* progress */}
        <div className="mt-8 flex gap-2">
          {["Goal", "Details", "Send"].map((l, k) => (
            <button
              key={l}
              type="button"
              disabled={k > step}
              onClick={() => setStep(k)}
              className="flex-1 text-left disabled:cursor-default"
            >
              <div className="h-1.5 bg-white/10">
                <motion.div
                  className="h-full bg-[#ff3b30]"
                  animate={{ width: k <= step ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span
                className={`font-display mt-1 block text-sm ${k <= step ? "text-white" : "text-white/30"}`}
              >
                {k + 1}. {l}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 min-h-[22rem]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {COACHING_GOALS.map((g) => (
                  <motion.button
                    key={g.id}
                    type="button"
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setGoalId(g.id);
                      setStep(1);
                    }}
                    className={`group border-2 p-6 text-left transition ${
                      goalId === g.id
                        ? "border-[#ff3b30] bg-[#ff3b30]/10"
                        : "border-white/15 hover:border-[#ff3b30]"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-4xl">{g.icon}</span>
                      <span className="font-display bg-[#ffc857] px-2 py-1 text-sm text-black">
                        {g.duration}
                      </span>
                    </div>
                    <h3 className="font-display mt-4 text-3xl text-white">
                      {g.title}
                    </h3>
                    <p className="mt-2 text-white/60">{g.desc}</p>
                    <span className="font-display mt-4 inline-block text-[#ff3b30] transition group-hover:translate-x-2">
                      Pick this →
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="grid gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <input
                    className={inputCls}
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className={`${inputCls} ${phone && !phoneOk ? "!border-[#ffc857]" : ""}`}
                    placeholder="Phone (calling number)"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <p className="font-display mb-2 text-lg text-white/70">
                    Where did you hear about me?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SOURCES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSource(s)}
                        className={`font-display border-2 px-4 py-2 text-lg transition ${
                          source === s
                            ? "border-[#ff3b30] bg-[#ff3b30] text-white"
                            : "border-white/20 text-white/70 hover:border-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={4}
                  className={inputCls}
                  placeholder="Why do you want to transform? Tell me in detail."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="font-display border-2 border-white/30 px-6 py-3 text-lg text-white hover:border-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!detailsOk}
                    onClick={() => setStep(2)}
                    className="font-display bg-[#ff3b30] px-8 py-3 text-lg text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
                  >
                    Review →
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && goal && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="grid gap-6"
              >
                <div className="border-l-4 border-[#ff3b30] bg-white/5 p-6 text-white/80">
                  <p className="font-display text-3xl text-white">
                    {goal.icon} {goal.title} · {goal.duration}
                  </p>
                  <p className="mt-3">
                    {name} · +91 {digits}
                  </p>
                  <p className="text-white/50">via {source}</p>
                  <p className="mt-3 italic text-white/70">
                    &ldquo;{reason}&rdquo;
                  </p>
                </div>

                <p className="text-sm text-white/60">
                  WhatsApp will open with this prefilled. Send your current
                  photo in the chat (men: shirtless clear pic, women: regular
                  pic) so he can check your body composition.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="font-display border-2 border-white/30 px-6 py-3 text-lg text-white hover:border-white"
                  >
                    Edit
                  </button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={send}
                    className="font-display bg-[#25D366] px-8 py-3 text-xl text-black"
                  >
                    Send on WhatsApp →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
