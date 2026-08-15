import type { Metadata } from "next";
import { Bodoni_Moda, EB_Garamond } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wellon0314vivian.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wellon & Vivian — We're Getting Married",
    template: "%s · Wellon & Vivian",
  },
  description:
    "Wellon & Vivian are getting married. View the photography, watch the film, RSVP, and leave the couple a message.",
  keywords: [
    "Wellon and Vivian",
    "wedding",
    "wedding invitation",
    "RSVP",
    "wedding photography",
    "wedding film",
  ],
  authors: [{ name: "Wellon & Vivian" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Wellon & Vivian — We're Getting Married",
    description:
      "View the photography, watch the film, RSVP, and leave a message for the couple.",
    siteName: "Wellon & Vivian",
    url: SITE_URL,
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wellon & Vivian — We're Getting Married",
    description:
      "View the photography, watch the film, RSVP, and leave a message for the couple.",
  },
  robots: { index: true, follow: true },
};

/* Direction contract — survives the production build (grep: WV-EDITORIAL-01). */
const CONTRACT = `<!--
[impeccable-contract WV-EDITORIAL-01]
THESIS: A wedding invitation suite that behaves like a couture magazine — typography IS the art. Refuses the photo-collage template and the pastel floral card.
OWN-WORLD: Warm ivory paper ↔ warm ink bands, antique-gold hairlines & a single rotated-diamond mark. Bodoni Moda display (huge, italic accents) over EB Garamond text; tracked small-caps only as standalone metadata, never as eyebrows.
STORY: Guest arrives, is drawn through names → invitation → photography → film → details → responds (RSVP) → leaves a message.
FIRST VIEWPORT: Full-height ivory page, "Wellon & Vivian" set enormous with an italic ampersand, thin gold rule + date placeholder; RSVP action in the fixed header.
FORM: Editorial invitation suite. World pinned by the client brief (no concept roll).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md.
-->`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${garamond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div hidden dangerouslySetInnerHTML={{ __html: CONTRACT }} />
        {children}
      </body>
    </html>
  );
}
