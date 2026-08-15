import type { NextConfig } from "next";

/* Static export for GitHub Pages (no server).
   - `output: "export"` emits a fully static site into `out/`.
   - `basePath`/`assetPrefix` come from NEXT_PUBLIC_BASE_PATH so the same build
     works at a domain root ("") or under a project subpath ("/repo-name").
   - Images are unoptimized (the site uses plain <img>, and the default image
     optimizer needs a server). */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
