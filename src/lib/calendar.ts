import { EVENT, targetTimestamp } from "./constants";

/* Builds "Add to calendar" targets from EVENT. If EVENT.startTime is set, the
   entry is a timed event; otherwise it's an all-day event (time TBA). */

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** YYYYMMDD for a date string "YYYY-MM-DD". */
function dateBasic(iso: string): string {
  return iso.replace(/-/g, "");
}

/** The day after dateISO, as YYYYMMDD (all-day events are end-exclusive). */
function nextDayBasic(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
}

/** UTC timestamp in iCal basic format: YYYYMMDDTHHMMSSZ. */
function utcBasic(ms: number): string {
  const d = new Date(ms);
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

const isTimed = Boolean(EVENT.startTime);

function range() {
  if (isTimed) {
    const start = targetTimestamp();
    const end = start + EVENT.durationHours * 60 * 60 * 1000;
    return { start: utcBasic(start), end: utcBasic(end), allDay: false };
  }
  return { start: dateBasic(EVENT.dateISO), end: nextDayBasic(EVENT.dateISO), allDay: true };
}

export function googleCalendarUrl(): string {
  const { start, end } = range();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT.calendarTitle,
    dates: `${start}/${end}`,
    details: EVENT.calendarDetails,
    location: EVENT.venueAddress,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function icsContent(): string {
  const { start, end, allDay } = range();
  const dt = allDay
    ? `DTSTART;VALUE=DATE:${start}\r\nDTEND;VALUE=DATE:${end}`
    : `DTSTART:${start}\r\nDTEND:${end}`;
  // Escape per RFC 5545.
  const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wellon & Vivian//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:wellon-vivian-${EVENT.dateISO}@wedding`,
    "DTSTAMP:20260101T000000Z",
    dt,
    `SUMMARY:${esc(EVENT.calendarTitle)}`,
    `DESCRIPTION:${esc(EVENT.calendarDetails)}`,
    `LOCATION:${esc(EVENT.venueAddress)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** A data URI for the .ics file — no server round-trip needed. */
export function icsDataUri(): string {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent())}`;
}
