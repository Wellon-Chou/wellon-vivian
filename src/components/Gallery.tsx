"use client";

import { Aperture } from "./icons";
import { useLang } from "./LanguageProvider";
import { GALLERY_PHOTOS } from "@/lib/photos";

export type Photo = {
  /** Grid tile — a file in /public, e.g. "/gallery/04-veil.webp". */
  src?: string;
  /** Landscape frame — takes a double-width tile on the wall. */
  wide?: boolean;
  alt: string;
};

/* Gallery wall — an orientation-aware mosaic (see `.gallery-wall` in
   globals.css): portraits take one column, landscapes two, and the photo set in
   lib/photos.ts is ordered so the rows tile a clean rectangle. Captions come
   from the i18n dictionary (t.gallery.photos), matched by index, and serve as
   the alt text. The wall is display-only — no lightbox. */

export default function Gallery({ photos }: { photos?: Photo[] }) {
  const { t } = useLang();
  const resolved: Photo[] =
    photos ?? t.gallery.photos.map((alt, i) => ({ ...GALLERY_PHOTOS[i], alt }));

  return (
    <div className="gallery-wall">
      {resolved.map((p, i) => (
        <figure key={i} className={`frame${p.wide ? " frame-wide" : ""}`}>
          {p.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
          ) : (
            <figcaption className="frame-note">
              <Aperture className="w-6 h-6 text-gold" />
              <span className="label" style={{ fontSize: "0.62rem" }}>
                {p.alt}
              </span>
              <span className="text-taupe" style={{ fontSize: "0.72rem" }}>
                {t.gallery.photoAdd}
              </span>
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
