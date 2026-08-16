import type { FormState } from "./types";
import { formMessages, type Lang } from "./i18n";

/* Client-side validation for the guest-message form, so the browser can
   validate before writing to Supabase. Error/confirmation copy comes from i18n
   formMessages. (RSVPs are collected by an external form service — see
   RSVP_URL in lib/constants.ts — so nothing is validated or stored here.) */

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

export type MessageRow = { name: string; message: string };

/** Result: `spam` = honeypot tripped (pretend success, insert nothing);
   `invalid` = show field errors; `valid` = insert `row`, then show `success`. */
export type Validated<Row> =
  | { kind: "spam" }
  | { kind: "invalid"; state: Extract<FormState, { status: "error" }> }
  | { kind: "valid"; row: Row; success: string };

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
