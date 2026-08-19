/** Shared, non-secret constants used by both server and client code. */

/* RSVPs are collected by an external form service; the site just links out. */
export const RSVP_URL = "https://rcaj0gh6.jsjform.com/f/mR3J7u";

/* Event facts — edit here in one place.
   The date is confirmed; time and venue are still "To be announced". */
export const EVENT = {
  // --- Confirmed ---
  dateISO: "2026-12-06", // YYYY-MM-DD (Sunday)
  dateLabel: "Sunday, 6 December 2026",
  dateLabelZh: "2026年12月6日 · 星期日",
  dateShort: "06.12.26",

  // --- Venue (confirmed) ---
  venueName: "Sheraton Fuqing Hotel",
  venueNameZh: "福清金辉喜来登酒店",
  venueHall: "Garden Hall · Level 6",
  venueHallZh: "6楼花园厅",
  venueCity: "Fuqing, Fujian",
  venueCityZh: "中国福建 · 福清",
  venueAddress: "Sheraton Fuqing Hotel, Fuqing, Fujian, China",
  // Baidu Maps search for the hotel (resolves to the real venue). For Amap use:
  // https://www.amap.com/search?query=福清金辉喜来登酒店
  mapUrl: "https://map.baidu.com/search/%E7%A6%8F%E6%B8%85%E9%87%91%E8%BE%89%E5%96%9C%E6%9D%A5%E7%99%BB%E9%85%92%E5%BA%97",

  // --- Not yet finalized (clearly-marked placeholder) ---
  timeLabel: "Time to be announced",
  timeLabelZh: "时间待定",
  dressCode: "Formal / Garden Elegance",
  dressCodeZh: "正式着装 / 花园优雅风格",

  // Optional start time in 24h "HH:MM" (venue-local). Empty = treat as an
  // all-day event for the calendar and count down to the start of the day.
  startTime: "",
  // Duration in hours, used only when startTime is set.
  durationHours: 5,
  // IANA time zone + its fixed offset (China Standard Time, no DST).
  timeZone: "Asia/Shanghai",
  utcOffset: "+08:00",

  // Used for the "Add to calendar" entry.
  calendarTitle: "Wellon & Vivian’s Wedding",
  calendarDetails:
    "We’re getting married! Sheraton Fuqing Hotel — Garden Hall, Level 6. Time to follow with your invitation.",
} as const;

/**
 * The exact moment the countdown targets, as a timestamp (ms).
 * When a start time is set, use it; otherwise the start of the wedding day
 * in the venue's time zone.
 */
export function targetTimestamp(): number {
  const time = EVENT.startTime || "00:00";
  return new Date(`${EVENT.dateISO}T${time}:00${EVENT.utcOffset}`).getTime();
}
