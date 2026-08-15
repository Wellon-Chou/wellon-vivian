# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing codebase: Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript. Frontend stack is already decided by the scaffold.

RSVP and guest-message backend: **implemented** — Next.js Server Actions validate and persist submissions as newline-delimited JSON in a git-ignored `data/` directory (`src/lib/store.ts`). The couple reads submissions at a password-protected `/admin` dashboard (HMAC session cookie via `ADMIN_PASSWORD`) with one-click CSV export. Storage is isolated behind four functions (`appendRsvp`/`readRsvps`/`appendMessage`/`readMessages`) so a serverless deploy can swap in a database at a single seam (documented in README.md → "Where the data goes"). Works out of the box on any persistent-filesystem host.

## Users

The wedding guests of Wellon & Vivian, and more broadly anyone interested in learning more about the couple. Visitors arrive to view the wedding, respond, and leave a note — a mix of invited guests (who will RSVP) and well-wishers or curious visitors.

## Product Purpose

A wedding website for a couple, Wellon & Vivian. It exists to:

- **Showcase** their professional wedding photography and videos.
- **Collect RSVPs** from guests, with submissions stored on a backend the couple can read.
- **Gather messages** — a "leave a message" function for guests to send notes/well-wishes to the couple.

Success means guests can experience the couple's photos and videos, respond with an RSVP, and leave a message — and the couple reliably receives that RSVP and message data.

## Positioning

A personal wedding site for Wellon & Vivian specifically — its value is the couple's own photography, story, and event, not a reusable template. It is theirs, not a generic wedding-invite product.

## Operating Context

- Visitors likely arrive from a shared link (invitation, message, social) on both phones and desktops; mobile experience matters for guests opening on their phones.
- Two data-producing interactions the couple depends on: RSVP submissions and guest messages. Both must be captured durably and be retrievable by the couple.

## Capabilities and Constraints

- **Photo & video showcase** of professional wedding media.
- **RSVP form** with backend data collection (destination delegated to me; see Stack).
- **Guest message / "leave a message"** function with backend data collection.
- **Confirmed:** wedding **date** — Sunday, 6 December 2026; **venue** — Sheraton Fuqing Hotel (福清金辉喜来登酒店), Garden Hall / 6楼花园厅, Fuqing, Fujian, China. These live in `src/lib/constants.ts` (`EVENT`).
- **Still undecided / not finalized:** the **ceremony time** and the couple's **story/about copy**. Future work must use clearly labeled placeholders and must **not fabricate** the time or story details.

## Brand Commitments

- Names: **Wellon & Vivian** (a couple). Present both names.
- No confirmed logo, brand palette, or typography yet.

## Evidence on Hand

- **Real:** professional wedding photography — photos and videos of the couple. (Actual files not yet located in the repo; `public/` currently holds only Next.js scaffold SVGs. Media to be provided by the user.)
- **Not on hand / must not be fabricated:** wedding date/time, venue/address, the couple's story, guest list, testimonials, or any factual event detail. No real backend or dataset exists yet.

## Product Principles

1. **The photography leads.** The couple's real photos and videos are the reason the site exists; the interface serves the imagery, not the reverse.
2. **Two jobs must never fail silently.** RSVP and message submissions are the site's functional purpose — capture them reliably and confirm receipt to the guest.
3. **Placeholders, never inventions.** Where event facts aren't finalized, mark them as placeholders; do not manufacture dates, venues, or story details.
4. **Guests arrive on phones.** Treat mobile as a first-class surface, not an afterthought.
5. **It belongs to this couple.** Favor a specific, personal expression over a generic wedding template.
