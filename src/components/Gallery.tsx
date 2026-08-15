"use client";

import { useCallback, useEffect, useState } from "react";
import { Aperture, Close, ArrowRight } from "./icons";
import { useLang } from "./LanguageProvider";

export type Photo = {
  /** Put files in /public and set src to e.g. "/gallery/ceremony.jpg". */
  src?: string;
  alt: string;
};

/* Gallery wall — a curated 8-frame mosaic (see `.gallery-wall` in globals.css)
   that tiles a clean rectangle with two larger feature frames. Captions come
   from the i18n dictionary (t.gallery.photos). Add `src` per photo to drop in a
   real image (cropped to fill its frame). */
const WALL_SIZE = 8;
const TILE_RATIO = "4 / 5"; // lightbox placeholder

export default function Gallery({ photos }: { photos?: Photo[] }) {
  const { t } = useLang();
  const resolved: Photo[] = (photos ?? t.gallery.photos.map((alt) => ({ alt }))).slice(0, WALL_SIZE);
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const move = useCallback(
    (dir: number) =>
      setActive((i) => (i === null ? i : (i + dir + resolved.length) % resolved.length)),
    [resolved.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, move]);

  return (
    <>
      <div className="gallery-wall">
        {resolved.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className="group frame text-left"
            style={{ gridArea: `p${i + 1}` }}
            aria-label={`${t.gallery.view}: ${p.alt}`}
          >
            {p.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            ) : (
              <span className="frame-note">
                <Aperture className="w-6 h-6 text-gold" />
                <span className="label" style={{ fontSize: "0.62rem" }}>
                  {p.alt}
                </span>
                <span className="text-taupe" style={{ fontSize: "0.72rem" }}>
                  {t.gallery.photoAdd}
                </span>
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(16,12,7,0.94)" }}
          role="dialog"
          aria-modal="true"
          aria-label={resolved[active].alt}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-5 right-5 text-[var(--on-ink)] p-2"
            aria-label="Close"
          >
            <Close className="w-7 h-7" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            className="absolute left-3 md:left-8 text-[var(--on-ink)] p-3 rotate-180"
            aria-label="Previous photo"
          >
            <ArrowRight className="w-7 h-7" />
          </button>

          <figure
            className="max-w-5xl w-full flex flex-col items-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="frame w-full"
              style={
                resolved[active].src
                  ? { maxHeight: "82vh", background: "transparent", border: 0 }
                  : { aspectRatio: TILE_RATIO, maxHeight: "82vh" }
              }
            >
              {resolved[active].src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resolved[active].src}
                  alt={resolved[active].alt}
                  style={{ objectFit: "contain", width: "100%", height: "auto", maxHeight: "82vh" }}
                />
              ) : (
                <span className="frame-note">
                  <Aperture className="w-8 h-8 text-gold" />
                  <span className="label">{resolved[active].alt}</span>
                  <span className="text-taupe">{t.gallery.photoAdd}</span>
                </span>
              )}
            </div>
            <figcaption
              className="font-display italic text-[var(--on-ink)] text-lg"
              style={{ letterSpacing: "0.01em" }}
            >
              {resolved[active].alt}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            className="absolute right-3 md:right-8 text-[var(--on-ink)] p-3"
            aria-label="Next photo"
          >
            <ArrowRight className="w-7 h-7" />
          </button>
        </div>
      )}
    </>
  );
}
