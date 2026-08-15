"use client";

import { useEffect, useState } from "react";
import { Close, Menu } from "./icons";
import { useLang } from "./LanguageProvider";
import LanguageToggle from "./LanguageToggle";

export default function SiteHeader() {
  const { t } = useLang();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#story", label: t.nav.story },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#film", label: t.nav.film },
    { href: "#details", label: t.nav.details },
    { href: "#guestbook", label: t.nav.guestbook },
  ];

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header" data-solid={solid || open}>
      <div className="shell flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="font-display text-ink text-lg md:text-xl tracking-tight" style={{ letterSpacing: "0.02em" }}>
          W <span className="italic text-gold">&amp;</span> V
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="label link-underline" style={{ fontSize: "0.68rem" }}>
              {l.label}
            </a>
          ))}
          <LanguageToggle />
          <a href="#rsvp" className="btn" style={{ padding: "0.7rem 1.5rem" }}>
            {t.nav.rsvp}
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="text-ink p-2 -mr-2"
            aria-label={open ? "Close menu" : t.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer — an always-opaque panel that slides in (never fades,
          so page content can't show through mid-animation). When closed it
          slides fully above the viewport (its height + the 64px header offset)
          so it never covers the top bar. */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-y-0 pointer-events-auto" : "translate-y-[calc(-100%_-_5rem)] pointer-events-none"
        }`}
        style={{ borderTop: "1px solid var(--line-soft)" }}
      >
        <nav className="shell flex flex-col py-8 gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-ink text-3xl py-3"
              style={{ borderBottom: "1px solid var(--line-soft)" }}
            >
              {l.label}
            </a>
          ))}
          <a href="#rsvp" onClick={() => setOpen(false)} className="btn mt-6 w-full">
            {t.nav.rsvp}
          </a>
        </nav>
      </div>
    </header>
  );
}
