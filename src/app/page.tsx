import { LanguageProvider } from "@/components/LanguageProvider";
import HomeContent from "@/components/HomeContent";
import { DEFAULT_LANG } from "@/lib/i18n";

/* Static home page. There is no server at runtime (GitHub Pages), so the page
   renders with a fixed default language; LanguageProvider restores the guest's
   saved preference on the client. Guest messages are read/written directly
   from the browser via Supabase (see Guestbook); RSVPs go to an external form
   (RSVP_URL in lib/constants.ts). */
export default function Home() {
  return (
    <LanguageProvider initialLang={DEFAULT_LANG}>
      <HomeContent />
    </LanguageProvider>
  );
}
