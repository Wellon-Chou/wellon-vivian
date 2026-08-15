"use client";

import { useLang } from "./LanguageProvider";

/* A small EN / 中文 pill toggle. The active language is highlighted. */

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={`inline-flex items-center ${className}`}
      role="group"
      aria-label="Language"
      style={{ border: "1px solid var(--line)", borderRadius: "999px" }}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className="label transition-colors"
        style={{
          fontSize: "0.6rem",
          padding: "0.4rem 0.7rem",
          borderRadius: "999px",
          background: lang === "en" ? "var(--ink)" : "transparent",
          color: lang === "en" ? "var(--paper)" : "var(--taupe)",
        }}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("zh")}
        aria-pressed={lang === "zh"}
        className="label transition-colors"
        style={{
          fontSize: "0.68rem",
          padding: "0.4rem 0.7rem",
          borderRadius: "999px",
          background: lang === "zh" ? "var(--ink)" : "transparent",
          color: lang === "zh" ? "var(--paper)" : "var(--taupe)",
          letterSpacing: "0.1em",
        }}
      >
        中文
      </button>
    </div>
  );
}
