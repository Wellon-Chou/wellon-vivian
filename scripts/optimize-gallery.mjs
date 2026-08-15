/* Turns the full-resolution originals in /public/images (7008px camera JPEGs,
   10–27 MB each) into the web-sized WebP files the gallery actually ships.

   Run after adding or replacing an original:  node scripts/optimize-gallery.mjs

   Originals stay out of git (see .gitignore); only /public/gallery is committed.
   The PHOTOS list below is the build-side twin of `src/lib/photos.ts` — keep the
   slugs and their order in sync. Uses sharp, which ships with Next. */

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "public/images";
const OUT = "public/gallery";

/* [original filename, slug]. Order = the order photos appear on the wall. */
const PHOTOS = [
  ["ABC05688 .jpg", "01-louvre-pyramid"],
  ["ABC05700.jpg", "02-louvre-courtyard"],
  ["ABC05838 拷贝.jpg", "03-colonnade"],
  ["ABC05872.jpg", "04-veil"],
  ["ABC06003.jpg", "05-wide-skies"],
  ["ABC06179.jpg", "06-chantilly-steps"],
  ["ABC06291.jpg", "07-almost-a-kiss"],
  ["ABC06304.jpg", "08-invitation"],
  ["ABC06207.jpg", "09-lakeside"],
  ["ABC06358.jpg", "10-roses"],
  ["ABC06382.jpg", "11-beneath-the-tower"],
  ["ABC06397.jpg", "12-red-gown"],
  ["ABC06466.jpg", "13-quiet"],
];

/* Tiles are never shown wider than ~600 CSS px, so 1400 covers a 2x screen. */
const SIZES = [{ suffix: "", limit: 1400, quality: 72 }];

/* One-off photos used outside the wall, cropped to the frame they sit in. */
const SINGLES = [
  // "Our story" — a 2:3 frame beside the copy (see HomeContent).
  { file: "ABC05727.jpg", slug: "story-us-together", width: 1200, height: 1800 },
];

fs.mkdirSync(OUT, { recursive: true });

for (const [file, slug] of PHOTOS) {
  const from = path.join(SRC, file);
  if (!fs.existsSync(from)) {
    console.warn(`! missing original: ${from}`);
    continue;
  }
  const meta = await sharp(from).metadata();
  const wide = meta.width >= meta.height;
  const line = [];
  for (const { suffix, limit, quality } of SIZES) {
    const to = path.join(OUT, `${slug}${suffix}.webp`);
    await sharp(from)
      .rotate() // bake in EXIF orientation before stripping metadata
      .resize({ width: limit, height: limit, fit: "inside", withoutEnlargement: true })
      .webp({ quality })
      .toFile(to);
    line.push(`${path.basename(to)} ${(fs.statSync(to).size / 1024).toFixed(0)}kB`);
  }
  console.log(`${wide ? "landscape" : "portrait "}  ${line.join("  ")}`);
}

for (const { file, slug, width, height } of SINGLES) {
  const from = path.join(SRC, file);
  if (!fs.existsSync(from)) {
    console.warn(`! missing original: ${from}`);
    continue;
  }
  const to = path.join(OUT, `${slug}.webp`);
  await sharp(from)
    .rotate()
    .resize(width, height, { fit: "cover", position: "centre" })
    .webp({ quality: 76 })
    .toFile(to);
  console.log(`single     ${path.basename(to)} ${(fs.statSync(to).size / 1024).toFixed(0)}kB`);
}
