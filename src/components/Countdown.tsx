"use client";

import { useEffect, useState } from "react";
import { targetTimestamp } from "@/lib/constants";
import { useLang } from "./LanguageProvider";

type Parts = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function compute(target: number): Parts {
  let ms = target - Date.now();
  const done = ms <= 0;
  if (ms < 0) ms = 0;
  const days = Math.floor(ms / 86400000);
  ms -= days * 86400000;
  const hours = Math.floor(ms / 3600000);
  ms -= hours * 3600000;
  const minutes = Math.floor(ms / 60000);
  ms -= minutes * 60000;
  const seconds = Math.floor(ms / 1000);
  return { days, hours, minutes, seconds, done };
}

const pad = (n: number) => String(n).padStart(2, "0");

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-display text-ink tabular leading-none"
        style={{ fontSize: "clamp(2.6rem, 8vw, 5rem)" }}
        suppressHydrationWarning
      >
        {value}
      </span>
      <span className="label mt-3" style={{ fontSize: "0.6rem" }}>
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const { t } = useLang();
  const target = targetTimestamp();
  const [parts, setParts] = useState<Parts>(() => compute(target));

  useEffect(() => {
    const id = setInterval(() => setParts(compute(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (parts.done) {
    return (
      <p className="display display-italic text-gold text-center" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>
        {t.countdown.done}
      </p>
    );
  }

  return (
    <div className="flex items-start justify-center gap-4 sm:gap-8 md:gap-12">
      <Unit value={String(parts.days)} label={parts.days === 1 ? t.countdown.day : t.countdown.days} />
      <span className="mark mt-6 sm:mt-8" aria-hidden />
      <Unit value={pad(parts.hours)} label={t.countdown.hours} />
      <span className="mark mt-6 sm:mt-8" aria-hidden />
      <Unit value={pad(parts.minutes)} label={t.countdown.minutes} />
      <span className="mark mt-6 sm:mt-8" aria-hidden />
      <Unit value={pad(parts.seconds)} label={t.countdown.seconds} />
    </div>
  );
}
