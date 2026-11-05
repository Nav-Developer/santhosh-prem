"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/data/constant";
import { COACHING_GOALS, SOURCES } from "@/data/link";

const STEPS = ["Goal", "About you", "Contact", "Send"];
const GENDERS = ["Male", "Female", "Other"];

const inputCls =
  "w-full border-2 border-white/15 bg-transparent px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#ff3b30] disabled:cursor-not-allowed disabled:opacity-50";
const labelCls =
  "font-display mb-1 block text-base tracking-wide text-white/60";

const slide = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

type Channel = "whatsapp" | "email";

type Form = {
  name: string;
  age: string;
  gender: string;
  email: string;
  country: string;
  city: string;
  weight: string;
  height: string;
  food: string;
  insta: string;
  wa: string;
  call: string;
  source: string;
  reason: string;
};

const EMPTY: Form = {
  name: "",
  age: "",
  gender: "",
  email: "",
  country: "",
  city: "",
  weight: "",
  height: "",
  food: "",
  insta: "",
  wa: "",
  call: "",
  source: "",
  reason: "",
};

/* ---------- defined OUTSIDE the main component so inputs keep focus ---------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "tel" | "numeric" | "email";
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <input
        type={type}
        inputMode={inputMode}
        className={inputCls}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Nav({
  back,
  next,
  nextLabel,
  ok,
  go,
}: {
  back: number;
  next: number;
  nextLabel: string;
  ok: boolean;
  go: (n: number) => void;
}) {
  return (
    <div className="flex gap-3 pt-2">
      <button
        type="button"
        onClick={() => go(back)}
        className="font-display border-2 border-white/30 px-6 py-3 text-xl text-white hover:border-white"
      >
        Back
      </button>
      <button
        type="button"
        disabled={!ok}
        onClick={() => go(next)}
        className="font-display bg-[#ff3b30] px-8 py-3 text-xl text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
      >
        {nextLabel}
      </button>
    </div>
  );
}

/* ------------------------------- main ------------------------------- */

export default function CoachingSection() {
  const [step, setStep] = useState(0);
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [goalId, setGoalId] = useState("");
  const [f, setF] = useState<Form>(EMPTY);
  const [same, setSame] = useState(false);

  const set = (k: keyof Form) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const goal = COACHING_GOALS.find((g) => g.id === goalId);
  const digits = (s: string) => s.replace(/\D/g, "");
  const call = same ? f.wa : f.call;

  const aboutOk =
    !!f.name.trim() &&
    !!f.age.trim() &&
    !!f.gender &&
    /\S+@\S+\.\S+/.test(f.email) &&
    !!f.country.trim() &&
    !!f.city.trim() &&
    !!f.weight.trim() &&
    !!f.height.trim() &&
    !!f.food.trim();

  const contactOk =
    !!f.insta.trim() &&
    digits(f.wa).length >= 10 &&
    digits(call).length >= 10 &&
    !!f.source &&
    f.reason.trim().length >= 10;

  const lines = () =>
    goal
      ? [
          `Goal: ${goal.title} (${goal.duration})`,
          `Name: ${f.name.trim()}`,
          `Age: ${f.age.trim()}`,
          `Gender: ${f.gender}`,
          `Email: ${f.email.trim()}`,
          `Country: ${f.country.trim()}`,
          `City: ${f.city.trim()}`,
          `Weight: ${f.weight.trim()}`,
          `Height: ${f.height.trim()}`,
          `Favorite food: ${f.food.trim()}`,
          `Instagram: ${f.insta.trim()}`,
          `WhatsApp: ${f.wa.trim()}`,
          `Calling number: ${call.trim()}`,
          `Heard about you from: ${f.source}`,
          ``,
          `Why I want to transform:`,
          f.reason.trim(),
        ]
      : [];

  const send = () => {
    if (!goal) return;

    if (channel === "whatsapp") {
      const body = lines().map((l, i) => (i === 0 ? `*${l}*` : l));
      const msg = [
        `Hi Santhosh! 👋 I want to start coaching.`,
        ``,
        ...body,
        ``,
        `I'm sending my current photo below 📸`,
      ].join("\n");
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      const msg = [
        `Hi Santhosh,`,
        ``,
        `I want to start coaching. Here are my details:`,
        ``,
        ...lines(),
        ``,
        `My current photo is attached.`,
      ].join("\n");
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        `Coaching enquiry: ${goal.title} (${f.name.trim()})`,
      )}&body=${encodeURIComponent(msg)}`;
    }
  };

  return (
    <section
      id="coaching"
      className="relative bg-[#0b1020] px-5 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-display inline-block bg-[#ffc857] px-3 py-1 text-xl text-black">
          Paid Coaching
        </p>
        <h2 className="font-display mt-4 text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-white">
          Choose your goal. <span className="text-[#ff3b30]">Start now.</span>
        </h2>

        {/* progress */}
        <div className="mt-8 flex gap-2">
          {STEPS.map((l, k) => (
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
                className={`font-display mt-1 block text-base ${
                  k <= step ? "text-white" : "text-white/30"
                }`}
              >
                {k + 1}. {l}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 min-h-[22rem]">
          <AnimatePresence mode="wait">
            {/* STEP 0: GOAL */}
            {step === 0 && (
              <motion.div
                key="s0"
                {...slide}
                className="grid gap-5 sm:grid-cols-2"
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
                    className={`group overflow-hidden border-2 text-left transition ${
                      goalId === g.id
                        ? "border-[#ff3b30] bg-[#ff3b30]/10"
                        : "border-white/15 hover:border-[#ff3b30]"
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111830]">
                      <Image
                        src={g.img}
                        alt={g.title}
                        fill
                        sizes="(min-width:640px) 45vw, 100vw"
                        className="object-cover object-top transition duration-500 group-hover:scale-105"
                      />
                      <span className="font-display absolute right-3 top-3 bg-[#ffc857] px-2 py-1 text-base text-black">
                        {g.duration}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-3xl text-white">
                        {g.title}
                      </h3>
                      <p className="mt-2 text-white/60">{g.desc}</p>
                      <span className="font-display mt-3 inline-block text-lg text-[#ff3b30] transition group-hover:translate-x-2">
                        Pick this →
                      </span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* STEP 1: ABOUT YOU */}
            {step === 1 && (
              <motion.div key="s1" {...slide} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Name"
                    value={f.name}
                    onChange={set("name")}
                    placeholder="Your name"
                  />
                  <Field
                    label="Age"
                    value={f.age}
                    onChange={set("age")}
                    placeholder="e.g. 24"
                    inputMode="numeric"
                  />
                </div>

                <div>
                  <span className={labelCls}>Gender</span>
                  <div className="flex flex-wrap gap-2">
                    {GENDERS.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => set("gender")(g)}
                        className={`font-display border-2 px-5 py-2 text-xl transition ${
                          f.gender === g
                            ? "border-[#ff3b30] bg-[#ff3b30] text-white"
                            : "border-white/20 text-white/70 hover:border-white"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <Field
                  label="Email ID"
                  value={f.email}
                  onChange={set("email")}
                  type="email"
                  inputMode="email"
                  placeholder="you@example.com"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Country"
                    value={f.country}
                    onChange={set("country")}
                    placeholder="India"
                  />
                  <Field
                    label="City"
                    value={f.city}
                    onChange={set("city")}
                    placeholder="Coimbatore"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Weight"
                    value={f.weight}
                    onChange={set("weight")}
                    placeholder="e.g. 78 kg"
                  />
                  <Field
                    label="Height"
                    value={f.height}
                    onChange={set("height")}
                    placeholder="e.g. 172 cm"
                  />
                </div>

                <Field
                  label="Favorite food"
                  value={f.food}
                  onChange={set("food")}
                  placeholder="Biryani, dosa..."
                />

                <Nav
                  back={0}
                  next={2}
                  nextLabel="Next →"
                  ok={aboutOk}
                  go={setStep}
                />
              </motion.div>
            )}

            {/* STEP 2: CONTACT */}
            {step === 2 && (
              <motion.div key="s2" {...slide} className="grid gap-5">
                <Field
                  label="Instagram ID"
                  value={f.insta}
                  onChange={set("insta")}
                  placeholder="@yourhandle"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Phone (WhatsApp)"
                    value={f.wa}
                    onChange={set("wa")}
                    inputMode="tel"
                    placeholder="+91 98765 43210"
                  />
                  <div>
                    <Field
                      label="Phone (calling number)"
                      value={call}
                      onChange={set("call")}
                      disabled={same}
                      inputMode="tel"
                      placeholder="+91 98765 43210"
                    />
                    <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm text-white/60">
                      <input
                        type="checkbox"
                        checked={same}
                        onChange={(e) => setSame(e.target.checked)}
                        className="h-4 w-4 accent-[#ff3b30]"
                      />
                      Same as WhatsApp
                    </label>
                  </div>
                </div>

                <div>
                  <span className={labelCls}>Where did you hear about me?</span>
                  <div className="flex flex-wrap gap-2">
                    {SOURCES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => set("source")(s)}
                        className={`font-display border-2 px-4 py-2 text-xl transition ${
                          f.source === s
                            ? "border-[#ff3b30] bg-[#ff3b30] text-white"
                            : "border-white/20 text-white/70 hover:border-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className={labelCls}>
                    Why do you want to transform?
                  </span>
                  <textarea
                    rows={4}
                    className={inputCls}
                    placeholder="Tell me the main reason, in detail."
                    value={f.reason}
                    onChange={(e) => set("reason")(e.target.value)}
                  />
                </label>

                <Nav
                  back={1}
                  next={3}
                  nextLabel="Review →"
                  ok={contactOk}
                  go={setStep}
                />
              </motion.div>
            )}

            {/* STEP 3: SEND */}
            {step === 3 && goal && (
              <motion.div key="s3" {...slide} className="grid gap-6">
                <div className="grid gap-5 border-l-4 border-[#ff3b30] bg-white/5 p-5 md:grid-cols-[180px_1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden md:aspect-square">
                    <Image
                      src={goal.img}
                      alt={goal.title}
                      fill
                      sizes="180px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="text-white/80">
                    <p className="font-display text-3xl text-white">
                      {goal.title} · {goal.duration}
                    </p>
                    <p className="mt-2">
                      {f.name}, {f.age}, {f.gender} · {f.city}, {f.country}
                    </p>
                    <p className="text-white/60">
                      {f.weight} · {f.height} · {f.email}
                    </p>
                    <p className="text-white/60">
                      {f.insta} · WA {f.wa} · Call {call}
                    </p>
                    <p className="mt-2 italic text-white/70">
                      &ldquo;{f.reason}&rdquo;
                    </p>
                  </div>
                </div>

                <div>
                  <span className={labelCls}>Send via</span>
                  <div className="grid grid-cols-2 gap-3 sm:max-w-md">
                    {(["whatsapp", "email"] as Channel[]).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setChannel(c)}
                        className={`font-display border-2 px-4 py-3 text-xl transition ${
                          channel === c
                            ? "border-[#ffc857] bg-[#ffc857] text-black"
                            : "border-white/20 text-white/70 hover:border-white"
                        }`}
                      >
                        {c === "whatsapp" ? "💬 WhatsApp" : "✉️ Email"}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-white/60">
                  {channel === "whatsapp"
                    ? "WhatsApp opens with everything prefilled. Send your current photo in the chat (men: shirtless clear pic, women: regular pic)."
                    : "Your email app opens with everything prefilled. Attach your current photo (men: shirtless clear pic, women: regular pic) before sending."}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="font-display border-2 border-white/30 px-6 py-3 text-xl text-white hover:border-white"
                  >
                    Edit
                  </button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={send}
                    className={`font-display px-8 py-3 text-2xl text-black ${
                      channel === "whatsapp" ? "bg-[#25D366]" : "bg-[#ffc857]"
                    }`}
                  >
                    {channel === "whatsapp"
                      ? "Send on WhatsApp →"
                      : "Send via Email →"}
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
