import type { Attending, FormState } from "./types";
import { formMessages, type Lang } from "./i18n";

/* Client-side validation for the RSVP and guest-message forms. Ported from the
   old server actions (src/app/actions.ts) so the browser can validate before
   writing to Supabase. Error/confirmation copy is reused from i18n formMessages
   so the forms render exactly as before. */

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export type RsvpRow = {
  name: string;
  email: string;
  attending: Attending;
  guests: number;
  meal: string;
  song: string;
  note: string;
};

export type MessageRow = { name: string; message: string };

/** Result: `spam` = honeypot tripped (pretend success, insert nothing);
   `invalid` = show field errors; `valid` = insert `row`, then show `success`. */
export type Validated<Row> =
  | { kind: "spam" }
  | { kind: "invalid"; state: Extract<FormState, { status: "error" }> }
  | { kind: "valid"; row: Row; success: string };

export function validateRsvp(formData: FormData, lang: Lang): Validated<RsvpRow> {
  const m = formMessages[lang].rsvp;

  // Honeypot: bots fill hidden fields; humans never see it.
  if (str(formData.get("company"))) return { kind: "spam" };

  const name = str(formData.get("name"));
  const email = str(formData.get("email"));
  const attending = str(formData.get("attending")) as Attending;
  const guestsRaw = str(formData.get("guests"));
  const meal = str(formData.get("meal"));
  const song = str(formData.get("song"));
  const note = str(formData.get("note"));

  const values = { name, email, attending, guests: guestsRaw, meal, song, note };
  const fieldErrors: Record<string, string> = {};

  if (name.length < 2) fieldErrors.name = m.name;
  if (!isEmail(email)) fieldErrors.email = m.email;
  if (attending !== "yes" && attending !== "no") fieldErrors.attending = m.attending;

  let guests = 1;
  if (attending === "yes") {
    guests = Number.parseInt(guestsRaw || "1", 10);
    if (!Number.isFinite(guests) || guests < 1 || guests > 12) fieldErrors.guests = m.guests;
  } else {
    guests = 0;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { kind: "invalid", state: { status: "error", message: m.check, fieldErrors, values } };
  }

  return {
    kind: "valid",
    row: {
      name,
      email,
      attending,
      guests,
      meal: attending === "yes" ? meal || "No preference" : "",
      song: attending === "yes" ? song : "",
      note,
    },
    success: attending === "yes" ? m.successYes : m.successNo,
  };
}

export function validateMessage(formData: FormData, lang: Lang): Validated<MessageRow> {
  const m = formMessages[lang].message;

  if (str(formData.get("company"))) return { kind: "spam" };

  const name = str(formData.get("name"));
  const message = str(formData.get("message"));
  const values = { name, message };
  const fieldErrors: Record<string, string> = {};

  if (name.length < 2) fieldErrors.name = m.name;
  if (message.length < 2) fieldErrors.message = m.message;
  if (message.length > 1200) fieldErrors.message = m.tooLong;

  if (Object.keys(fieldErrors).length > 0) {
    return { kind: "invalid", state: { status: "error", message: m.check, fieldErrors, values } };
  }

  return { kind: "valid", row: { name, message }, success: m.success };
}
