"use client";

import type { ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import FilmPlayer from "@/components/FilmPlayer";
import Guestbook from "@/components/Guestbook";
import Countdown from "@/components/Countdown";
import AddToCalendar from "@/components/AddToCalendar";
import { Aperture, ArrowDown, Calendar, Diamond, External, Pin, Play } from "@/components/icons";
import { EVENT, RSVP_URL } from "@/lib/constants";
import { useLang } from "./LanguageProvider";

export default function HomeContent() {
  const { t, lang } = useLang();
  const zh = lang === "zh";

  const dateLabel = zh ? EVENT.dateLabelZh : EVENT.dateLabel;
  const timeLabel = zh ? EVENT.timeLabelZh : EVENT.timeLabel;
  const city = zh ? EVENT.venueCityZh : EVENT.venueCity;
  const venueName = zh ? EVENT.venueNameZh : EVENT.venueName;
  const whereSub = zh
    ? `${EVENT.venueHallZh} · ${EVENT.venueCityZh}`
    : `${EVENT.venueHall} · ${EVENT.venueCity}`;
  const whereAlt = zh
    ? `${EVENT.venueName} · ${EVENT.venueHall}`
    : `${EVENT.venueNameZh} · ${EVENT.venueHallZh}`;
  const dress = zh ? EVENT.dressCodeZh : EVENT.dressCode;

  const details: Array<{
    icon: ReactNode;
    k: string;
    v: string;
    sub: string;
    alt?: string;
    href?: string;
    hrefLabel?: string;
  }> = [
    { icon: <Calendar className="w-6 h-6" />, k: t.details.when, v: dateLabel, sub: timeLabel },
    {
      icon: <Pin className="w-6 h-6" />,
      k: t.details.where,
      v: venueName,
      sub: whereSub,
      alt: whereAlt,
      href: EVENT.mapUrl,
      hrefLabel: t.details.viewMap,
    },
    { icon: <Diamond className="w-6 h-6" />, k: t.details.dress, v: dress, sub: t.details.dressSub },
    {
      icon: <Aperture className="w-6 h-6" />,
      k: t.details.theDay,
      v: t.details.theDayValue,
      sub: t.details.theDaySub,
    },
  ];

  const footerNav: Array<[string, string]> = [
    [t.nav.story, "#story"],
    [t.nav.gallery, "#gallery"],
    [t.nav.film, "#film"],
    [t.nav.details, "#details"],
    [t.nav.rsvp, "#rsvp"],
    [t.nav.guestbook, "#guestbook"],
  ];

  return (
    <>
      <SiteHeader />
      <main id="top">
        {/* HERO */}
        {/* The scroll cue sits in normal flow below the names (not pinned to
            the section bottom) so it can never collide with the date on short
            viewports. Type size and vertical gaps also scale with viewport
            height so a squat window doesn't crowd the stack. */}
        <section className="relative min-h-[100svh] flex flex-col items-center text-center overflow-hidden">
          <Diamond
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.06] w-[70vmin] h-[70vmin]"
            aria-hidden
          />
          <div className="shell relative flex-1 flex flex-col items-center justify-center pt-24 pb-6">
            <h1 className="display leading-[0.92]" style={{ fontSize: "clamp(3.6rem, min(15vw, 17svh), 11rem)" }}>
              <span className="block">Wellon</span>
              <span className="display-italic block text-gold my-1 md:my-2" style={{ fontSize: "0.62em" }}>
                &amp;
              </span>
              <span className="block">Vivian</span>
            </h1>
            <div className="mt-[clamp(1.75rem,5svh,3rem)] flex flex-col items-center gap-[clamp(0.75rem,2svh,1.25rem)]">
              <hr className="rule-gold w-16" />
              <p className="label">{t.hero.marrying}</p>
              <p className="font-display italic text-taupe text-xl md:text-2xl">{dateLabel}</p>
            </div>
          </div>
          <a
            href="#invitation"
            className="relative flex flex-col items-center gap-2 pt-6 pb-8 text-taupe"
            aria-label={t.hero.scroll}
          >
            <span className="label" style={{ fontSize: "0.6rem" }}>
              {t.hero.scroll}
            </span>
            <ArrowDown className="w-4 h-4 scroll-cue text-gold" />
          </a>
        </section>

        {/* FILM */}
        <section id="film" className="section on-ink">
          <div className="shell">
            <Reveal className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="inline-flex text-gold mb-6">
                <Play className="w-7 h-7" />
              </span>
              <h2 className="display text-4xl md:text-6xl" style={{ color: "var(--on-ink)" }}>
                {t.film.headingLead}
                <span className="display-italic text-gold-bright">{t.film.headingAccent}</span>
              </h2>
              <p className="lede mt-6">{t.film.intro}</p>
            </Reveal>
            <Reveal delay={100} className="max-w-5xl mx-auto">
              <FilmPlayer src={process.env.NEXT_PUBLIC_FILM_URL} />
            </Reveal>
          </div>
        </section>

        {/* INVITATION */}
        <section id="invitation" className="section bg-paper-2">
          <div className="shell-narrow text-center">
            <Reveal>
              <p className="display" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.9rem)", lineHeight: 1.32 }}>
                {t.invitation.lead}
                <span className="display-italic text-gold">{t.invitation.accent}</span>
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mark-line mt-12">
                <Diamond className="w-4 h-4" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section id="countdown" className="section">
          <div className="shell text-center">
            <Reveal>
              <h2 className="display text-3xl md:text-5xl">
                {t.countdown.headingLead}
                <span className="display-italic text-gold">{t.countdown.headingAccent}</span>
              </h2>
            </Reveal>
            <Reveal delay={100} className="mt-12 md:mt-16">
              <Countdown />
            </Reveal>
            <Reveal delay={180} className="mt-14 flex flex-col items-center gap-6">
              <div className="mark-line w-full max-w-xs">
                <span className="label label-gold">{dateLabel}</span>
              </div>
              <AddToCalendar />
            </Reveal>
          </div>
        </section>

        {/* STORY — replace copy with your own whenever you like */}
        <section id="story" className="section bg-paper-2">
          <div className="shell grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <Reveal as="figure" className="order-2 lg:order-1">
              <div className="frame" style={{ aspectRatio: "2 / 3" }}>
                {/* Cropped to 2:3 by scripts/optimize-gallery.mjs to match this frame. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/gallery/story-us-together.webp"
                  alt={t.story.figure}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
            <Reveal className="order-1 lg:order-2" delay={80}>
              <h2 className="display text-4xl md:text-6xl">
                {t.story.headingLead}
                <span className="display-italic text-gold">{t.story.headingAccent}</span>
              </h2>
              <div className="mt-8 space-y-6 prose-measure text-ink-soft">
                <p>{t.story.p1}</p>
                <p>{t.story.p2}</p>
                <p className="font-display italic text-2xl text-ink pt-2">{t.story.quote}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="section">
          <div className="shell">
            <Reveal className="max-w-2xl mb-12 md:mb-16">
              <h2 className="display text-4xl md:text-6xl">
                {t.gallery.headingLead}
                <span className="display-italic text-gold">{t.gallery.headingAccent}</span>
              </h2>
              <p className="lede mt-6 prose-measure">{t.gallery.intro}</p>
            </Reveal>
            <Reveal delay={100}>
              <Gallery />
            </Reveal>
          </div>
        </section>

        {/* DETAILS */}
        <section id="details" className="section bg-paper-2">
          <div className="shell">
            <Reveal className="text-center mb-14 md:mb-20">
              <h2 className="display text-4xl md:text-6xl">
                {t.details.headingLead}
                <span className="display-italic text-gold">{t.details.headingAccent}</span>
              </h2>
              <p className="lede mt-6 max-w-4xl mx-auto text-balance">{t.details.intro}</p>
            </Reveal>

            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-x-16">
              {details.map((d, i) => (
                <Reveal key={d.k} delay={i * 80} className="flex gap-5 py-8" style={{ borderTop: "1px solid var(--line-soft)" }}>
                  <span className="text-gold shrink-0 mt-1">{d.icon}</span>
                  <div>
                    <p className="label mb-2">{d.k}</p>
                    <p className="font-display text-2xl text-ink leading-tight">{d.v}</p>
                    <p className="text-taupe mt-1" style={{ fontSize: "0.92rem" }}>
                      {d.sub}
                    </p>
                    {d.alt && (
                      <p className="text-taupe" style={{ fontSize: "0.85rem", marginTop: "0.2rem" }}>
                        {d.alt}
                      </p>
                    )}
                    {d.href && (
                      <a
                        href={d.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label link-underline inline-flex items-center gap-1.5 mt-4"
                        style={{ fontSize: "0.6rem" }}
                      >
                        {d.hrefLabel}
                        <External className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120} className="mt-14 flex justify-center">
              <AddToCalendar label={t.details.saveTheDate} />
            </Reveal>
          </div>
        </section>

        {/* RSVP */}
        <section id="rsvp" className="section on-ink">
          <div className="shell">
            {/* The save-the-date print carries the date and venue, so the copy
                beside it stays short: invitation, then the one call to action. */}
            <div className="grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] gap-14 lg:gap-20 items-center">
              <Reveal className="w-full max-w-[21rem] mx-auto lg:max-w-none">
                <figure className="poster">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/poster/our-wedding.webp"
                    width={596}
                    height={843}
                    alt={t.rsvp.posterAlt}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </Reveal>

              <Reveal delay={120} className="text-center lg:text-left">
                <h2 className="display text-4xl md:text-5xl" style={{ color: "var(--on-ink)" }}>
                  {t.rsvp.headingLead}
                  <span className="display-italic text-gold-bright">{t.rsvp.headingAccent}</span>
                  {t.rsvp.headingTail}
                </h2>
                <p className="lede mt-6 prose-measure mx-auto lg:mx-0">{t.rsvp.intro}</p>
                <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4">
                  <a href={RSVP_URL} target="_blank" rel="noopener noreferrer" className="btn">
                    {t.rsvp.open}
                    <External className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-[var(--on-ink-soft)]" style={{ fontSize: "0.85rem" }}>
                    {t.rsvp.respondBy}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* GUESTBOOK */}
        <section id="guestbook" className="section bg-paper-2">
          <div className="shell">
            <Reveal>
              <Guestbook />
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="on-ink pt-20 pb-12">
        <div className="shell text-center">
          <p className="font-display text-4xl md:text-5xl" style={{ color: "var(--on-ink)" }}>
            Wellon <span className="italic text-gold-bright">&amp;</span> Vivian
          </p>
          <div className="mark-line my-8">
            <Diamond className="w-3.5 h-3.5" />
          </div>
          <p className="font-display italic text-[var(--on-ink-soft)] text-lg">{t.footer.withLove}</p>
          <p className="label mt-6" style={{ color: "var(--on-ink-soft)" }}>
            {dateLabel} · {city}
          </p>

          <hr className="rule my-10" style={{ background: "var(--on-ink-line)" }} />
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {footerNav.map(([label, href]) => (
              <a key={href} href={href} className="label link-underline" style={{ fontSize: "0.6rem", color: "var(--on-ink-soft)" }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
