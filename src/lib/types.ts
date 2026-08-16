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
