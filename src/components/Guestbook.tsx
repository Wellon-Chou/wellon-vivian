"use client";

import { useEffect, useRef, useState } from "react";
import type { FormState, GuestMessage } from "@/lib/types";
import { formMessages } from "@/lib/i18n";
import { getSupabase } from "@/lib/supabase";
import { validateMessage } from "@/lib/validate";
import { Quote, Check } from "./icons";
import { useLang } from "./LanguageProvider";

const initial: FormState = { status: "idle" };

function formatDate(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function Guestbook() {
  const { t, lang } = useLang();
  const locale = lang === "zh" ? "zh-CN" : "en-SG";
  const [state, setState] = useState<FormState>(initial);
  const [pending, setPending] = useState(false);
  const [wall, setWall] = useState<GuestMessage[]>([]);
  const [justPosted, setJustPosted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const errs = state.status === "error" ? state.fieldErrors ?? {} : {};
  const vals = state.status === "error" ? state.values ?? {} : {};

  // Load the public guestbook wall from Supabase on mount.
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id,created_at,name,message")
        .order("created_at", { ascending: false })
        .limit(60);
      if (cancelled || error || !data) return;
      setWall(
        data.map((m) => ({
          id: m.id,
          createdAt: m.created_at,
          name: m.name,
          message: m.message,
        }))
      );
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    const formData = new FormData(e.currentTarget);
    const result = validateMessage(formData, lang);

    if (result.kind === "invalid") {
      setState(result.state);
      return;
    }
    if (result.kind === "valid") {
      setPending(true);
      const supabase = getSupabase();
      if (!supabase) {
        setState({ status: "error", message: formMessages[lang].message.sendError });
        setPending(false);
        return;
      }
      const { error } = await supabase.from("messages").insert(result.row);
      setPending(false);
      if (error) {
        setState({ status: "error", message: formMessages[lang].message.sendError });
        return;
      }
      // Optimistically add the new note to the top of the wall.
      setWall((w) => [
        {
          id: `local-${w.length}-${result.row.name}`,
          createdAt: new Date().toISOString(),
          name: result.row.name,
          message: result.row.message,
        },
        ...w,
      ]);
    }
    // spam (honeypot) falls through here too: pretend success, insert nothing.
    setState({ status: "success", message: "" });
    setJustPosted(true);
    formRef.current?.reset();
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-14 lg:gap-20 items-start">
      {/* Form column */}
      <div className="lg:sticky lg:top-28">
        <h2 className="display text-4xl md:text-5xl">
          {t.guestbook.headingLead}
          <span className="display-italic text-gold">{t.guestbook.headingAccent}</span>
        </h2>
        <p className="lede mt-5 prose-measure">{t.guestbook.intro}</p>

        {justPosted ? (
          <div className="mt-9 flex items-start gap-4">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-gold text-gold shrink-0">
              <Check className="w-6 h-6" />
            </span>
            <div>
              <p className="font-display text-2xl text-ink">{t.guestbook.thankYou}</p>
              <p className="text-taupe mt-1">
                {t.guestbook.posted}{" "}
                <button
                  type="button"
                  className="link-underline"
                  onClick={() => setJustPosted(false)}
                >
                  {t.guestbook.writeAnother}
                </button>
              </p>
            </div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-9">
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <input type="hidden" name="lang" value={lang} />
            <label className="field">
              <span className="label">{t.guestbook.yourName}</span>
              <input name="name" type="text" placeholder={t.guestbook.yourName} defaultValue={vals.name} autoComplete="name" />
              {errs.name && <span className="field-error">{errs.name}</span>}
            </label>
            <label className="field mt-7">
              <span className="label">{t.guestbook.yourMessage}</span>
              <textarea name="message" rows={4} placeholder={t.guestbook.messagePh} defaultValue={vals.message} />
              {errs.message && <span className="field-error">{errs.message}</span>}
            </label>
            {state.status === "error" && state.message && !Object.keys(errs).length && (
              <p className="field-error mt-4" role="alert">
                {state.message}
              </p>
            )}
            <button type="submit" className="btn btn-ghost mt-8" disabled={pending}>
              {pending ? t.guestbook.sending : t.guestbook.sign}
            </button>
          </form>
        )}
      </div>

      {/* Wall column */}
      <div>
        {wall.length === 0 ? (
          <div className="frame flex items-center justify-center text-center p-12" style={{ minHeight: "18rem" }}>
            <p className="text-taupe max-w-xs">
              <Quote className="w-8 h-8 text-gold mx-auto mb-4" />
              {t.guestbook.empty}
            </p>
          </div>
        ) : (
          <ul className="columns-1 sm:columns-2 gap-5" style={{ columnFill: "balance" }}>
            {wall.map((m) => (
              <li
                key={m.id}
                className="break-inside-avoid mb-5 bg-paper-2 p-6"
                style={{ border: "1px solid var(--line-soft)" }}
              >
                <Quote className="w-6 h-6 text-gold mb-3" />
                <p className="text-ink-soft" style={{ lineHeight: 1.65 }}>
                  {m.message}
                </p>
                <p className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="font-display italic text-ink text-lg">{m.name}</span>
                  <span className="label" style={{ fontSize: "0.58rem" }}>
                    {formatDate(m.createdAt, locale)}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
