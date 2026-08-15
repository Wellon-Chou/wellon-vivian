export type Attending = "yes" | "no";

export interface Rsvp {
  id: string;
  createdAt: string; // ISO
  name: string;
  email: string;
  attending: Attending;
  guests: number; // total in party, incl. the responder
  meal: string; // free/select — e.g. "Standard", "Vegetarian", "Halal"
  song: string; // song request (optional)
  note: string; // optional note to couple
}

export interface GuestMessage {
  id: string;
  createdAt: string; // ISO
  name: string;
  message: string;
  hidden?: boolean; // reserved for future moderation
}

export type FormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string>;
      values?: Record<string, string>;
    };
