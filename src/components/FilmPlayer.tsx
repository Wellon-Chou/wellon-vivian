"use client";

import { useState } from "react";
import { Play } from "./icons";
import { useLang } from "./LanguageProvider";

/* Click-to-load facade: no third-party iframe (and no tracking) until the
   guest chooses to watch. Two ways to supply the film:
   - `src`: a self-hosted file (e.g. /film/wedding-film.mp4) — plays inline
     with a native <video>.
   - `embedUrl`: a YouTube/Vimeo *embed* URL (e.g.
     https://www.youtube.com/embed/XXXX).
   `src` takes precedence when both are set. */

export default function FilmPlayer({
  src,
  embedUrl,
  poster,
  title = "Wellon & Vivian — The Wedding Film",
}: {
  src?: string;
  embedUrl?: string;
  poster?: string;
  title?: string;
}) {
  const { t } = useLang();
  const [playing, setPlaying] = useState(false);
  const hasFilm = Boolean(src || embedUrl);

  return (
    <div className="frame" style={{ aspectRatio: "16 / 9", background: "#0f0b06" }}>
      {playing && src ? (
        <video
          src={src}
          poster={poster}
          title={title}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="w-full h-full"
          style={{ background: "#0f0b06", objectFit: "contain" }}
        />
      ) : playing && embedUrl ? (
        <iframe
          src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          style={{ border: 0 }}
        />
      ) : (
        <button
          type="button"
          onClick={() => hasFilm && setPlaying(true)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-5"
          aria-label={hasFilm ? `${t.film.play} — ${title}` : t.film.filmAdd}
          style={{
            cursor: hasFilm ? "pointer" : "default",
            background: poster
              ? `linear-gradient(rgba(15,11,6,0.35), rgba(15,11,6,0.55)), url(${poster}) center/cover`
              : "radial-gradient(120% 100% at 50% 0%, #1c150c 0%, #0f0b06 70%)",
          }}
        >
          <span className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border border-[var(--gold-bright)] text-[var(--gold-bright)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
            <Play className="w-8 h-8 md:w-9 md:h-9 translate-x-0.5" />
          </span>
          <span className="label" style={{ color: "var(--on-ink-soft)" }}>
            {hasFilm ? t.film.play : t.film.filmAdd}
          </span>
        </button>
      )}
    </div>
  );
}
