"use client";

import { useState } from "react";
import { MEALS } from "@/lib/constants";
import type { FormState } from "@/lib/types";
import { formMessages } from "@/lib/i18n";
import { getSupabase } from "@/lib/supabase";
import { validateRsvp } from "@/lib/validate";
import { Check, Diamond } from "./icons";
import { useLang } from "./LanguageProvider";

const initial: FormState = { status: "idle" };

export default function RsvpForm() {
  const { t, lang } = useLang();
  const [state, setState] = useState<FormState>(initial);
  const [pending, setPending] = useState(false);
  const [attending, setAttending] = useState<string>("");

  const errs = state.status === "error" ? state.fieldErrors ?? {} : {};
  const vals = state.status === "error" ? state.values ?? {} : {};

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    const formData = new FormData(e.currentTarget);
    const result = validateRsvp(formData, lang);

    if (result.kind === "spam") {
      setState({ status: "success", message: "" });
      return;
    }
    if (result.kind === "invalid") {
      setState(result.state);
      return;
    }

    setPending(true);
    const supabase = getSupabase();
    if (!supabase) {
      setState({ status: "error", message: formMessages[lang].rsvp.saveError });
      setPending(false);
      return;
    }
    const { error } = await supabase.from("rsvps").insert(result.row);
    setPending(false);
    if (error) {
      setState({ status: "error", message: formMessages[lang].rsvp.saveError });
      return;
    }
    setState({ status: "success", message: result.success });
  }

  if (state.status === "success") {
    return (
      <div className="reveal is-in text-center max-w-xl mx-auto py-6">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[var(--gold-bright)] text-[var(--gold-bright)] mb-7">
          <Check className="w-7 h-7" />
        </span>
        <p className="font-display text-3xl md:text-4xl display" style={{ color: "var(--on-ink)" }}>
          {t.rsvp.successTitle}
        </p>
        <p className="lede mt-5">{state.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto" noValidate>
      {/* Honeypot + language, hidden from guests */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="lang" value={lang} />

      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
        <label className="field">
          <span className="label">{t.rsvp.fullName}</span>
          <input name="name" type="text" placeholder={t.rsvp.namePh} defaultValue={vals.name} autoComplete="name" />
          {errs.name && <span className="field-error">{errs.name}</span>}
        </label>

        <label className="field">
          <span className="label">{t.rsvp.email}</span>
          <input name="email" type="email" placeholder="you@email.com" defaultValue={vals.email} autoComplete="email" />
          {errs.email && <span className="field-error">{errs.email}</span>}
        </label>
      </div>

      <fieldset className="mt-9">
        <span className="label block mb-3">{t.rsvp.join}</span>
        <div className="grid grid-cols-2 gap-3">
          <label className="choice">
            <input
              type="radio"
              name="attending"
              value="yes"
              defaultChecked={vals.attending === "yes"}
              onChange={() => setAttending("yes")}
            />
            <span>
              <Diamond className="w-3.5 h-3.5" /> {t.rsvp.accept}
            </span>
          </label>
          <label className="choice">
            <input
              type="radio"
              name="attending"
              value="no"
              defaultChecked={vals.attending === "no"}
              onChange={() => setAttending("no")}
            />
            <span>{t.rsvp.decline}</span>
          </label>
        </div>
        {errs.attending && <span className="field-error mt-2 block">{errs.attending}</span>}
      </fieldset>

      {/* Revealed only when attending */}
      <div
        className="grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          gridTemplateRows: attending === "yes" ? "1fr" : "0fr",
          opacity: attending === "yes" ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7 pt-9">
            <label className="field">
              <span className="label">{t.rsvp.partySize}</span>
              <input name="guests" type="number" min={1} max={12} defaultValue={vals.guests || "1"} placeholder="1" />
              {errs.guests && <span className="field-error">{errs.guests}</span>}
            </label>

            <label className="field">
              <span className="label">{t.rsvp.meal}</span>
              <select name="meal" defaultValue={vals.meal || "Standard"}>
                {MEALS.map((m) => (
                  <option key={m} value={m}>
                    {t.meals[m] ?? m}
                  </option>
                ))}
              </select>
            </label>

            <label className="field sm:col-span-2">
              <span className="label">{t.rsvp.song}</span>
              <input name="song" type="text" placeholder={t.rsvp.songPh} defaultValue={vals.song} />
            </label>
          </div>
        </div>
      </div>

      <label className="field mt-9">
        <span className="label">{t.rsvp.note}</span>
        <textarea name="note" placeholder={t.rsvp.notePh} defaultValue={vals.note} />
      </label>

      {state.status === "error" && state.message && (
        <p className="field-error mt-6" role="alert">
          {state.message}
        </p>
      )}

      <div className="mt-9 flex flex-col sm:flex-row items-center gap-5">
        <button type="submit" className="btn w-full sm:w-auto" disabled={pending}>
          {pending ? t.rsvp.sending : t.rsvp.send}
        </button>
        <p className="text-[var(--on-ink-soft)]" style={{ fontSize: "0.85rem" }}>
          {t.rsvp.respondBy}
        </p>
      </div>
    </form>
  );
}
