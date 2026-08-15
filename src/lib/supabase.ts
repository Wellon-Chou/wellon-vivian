import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* Browser-side Supabase client — the app is a static export (no server), so
   RSVP + guest-message writes go straight from the guest's browser to Supabase.
   Only the public anon key is used; row-level security in the database (see
   supabase/schema.sql) restricts anon to INSERT on both tables and SELECT on
   `messages` only. Never put the service_role key here.

   Returns null when env vars are missing so the build/prerender never crashes;
   the forms surface a friendly "not configured" error in that case. */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!client) {
    client = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
  }
  return client;
}
