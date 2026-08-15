"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { getDict, LANG_COOKIE, LANGS, type Dict, type Lang } from "@/lib/i18n";

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void; toggle: () => void };

const LanguageContext = createContext<Ctx | null>(null);

function readStoredLang(): Lang | null {
  try {
    const stored = window.localStorage.getItem(LANG_COOKIE);
    if (stored && LANGS.includes(stored as Lang)) return stored as Lang;
  } catch {
    /* localStorage unavailable (private mode) — ignore */
  }
  const m = document.cookie.match(new RegExp(`(?:^|; )${LANG_COOKIE}=([^;]+)`));
  return m && LANGS.includes(m[1] as Lang) ? (m[1] as Lang) : null;
}

export function LanguageProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(LANG_COOKIE, l);
    } catch {
      /* ignore */
    }
    document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
  }, []);

  const toggle = useCallback(() => setLang(lang === "en" ? "zh" : "en"), [lang, setLang]);

  // On mount (static export renders with the default language), restore the
  // guest's saved preference from localStorage / cookie.
  useEffect(() => {
    const stored = readStoredLang();
    if (stored) setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t: getDict(lang), setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
