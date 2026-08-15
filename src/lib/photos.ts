/** The gallery wall, in order. Captions live in i18n (`gallery.photos`) and are
 *  matched to these by index, so the two lists must stay the same length.
 *
 *  Files are the web-sized WebP exports in /public/gallery, produced from the
 *  camera originals by `node scripts/optimize-gallery.mjs`. `wide` marks a
 *  landscape frame — it takes a double-width tile on the wall (see
 *  `.gallery-wall` in globals.css), and the mix below tiles the grid exactly.
 */
export type GalleryPhoto = {
  /** Web-sized WebP, ≤1400px — covers a 2x screen at the tile's largest size. */
  src: string;
  /** Landscape — spans two columns. */
  wide?: boolean;
};

const slugs: [slug: string, wide: boolean][] = [
  ["01-louvre-pyramid", false],
  ["02-louvre-courtyard", true],
  ["03-colonnade", false],
  ["04-veil", true],
  ["05-wide-skies", true],
  ["06-chantilly-steps", true],
  ["07-almost-a-kiss", false],
  ["08-invitation", false],
  ["09-lakeside", false],
  ["10-roses", true],
  ["11-beneath-the-tower", false],
  ["12-red-gown", true],
  ["13-quiet", true],
];

export const GALLERY_PHOTOS: GalleryPhoto[] = slugs.map(([slug, wide]) => ({
  src: `/gallery/${slug}.webp`,
  wide,
}));
