"use client";

import { useEffect, useRef, useState } from "react";
import { googleCalendarUrl, icsDataUri } from "@/lib/calendar";
import { Calendar, External, Download } from "./icons";
import { useLang } from "./LanguageProvider";

/* A small popover: Google (link) or Apple/Outlook (.ics download). */

export default function AddToCalendar({ label }: { label?: string }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonLabel = label ?? t.calendar.add;

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative inline-block" ref={wrapRef}>
      <button
        type="button"
        className="btn btn-ghost"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Calendar className="w-4 h-4" /> {buttonLabel}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 -translate-x-1/2 mt-3 z-30 w-60 bg-paper p-2"
          style={{ border: "1px solid var(--line)", boxShadow: "var(--shadow-soft)" }}
        >
          <a
            role="menuitem"
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between gap-3 px-4 py-3 text-ink hover:bg-paper-2 transition-colors"
          >
            <span className="font-display text-lg">{t.calendar.google}</span>
            <External className="w-4 h-4 text-gold shrink-0" />
          </a>
          <a
            role="menuitem"
            href={icsDataUri()}
            download="wellon-vivian-wedding.ics"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between gap-3 px-4 py-3 text-ink hover:bg-paper-2 transition-colors"
            style={{ borderTop: "1px solid var(--line-soft)" }}
          >
            <span className="font-display text-lg">{t.calendar.apple}</span>
            <Download className="w-4 h-4 text-gold shrink-0" />
          </a>
        </div>
      )}
    </div>
  );
}
