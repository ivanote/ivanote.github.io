import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática: genera HTML/CSS/JS en ./out para GitHub Pages.
  output: "export",

  // GitHub Pages no tiene el servidor de optimización de imágenes de Next,
  // así que servimos las imágenes tal cual.
  images: { unoptimized: true },

  // Emite /ruta/index.html en vez de /ruta.html — más robusto en Pages.
  trailingSlash: true,
};

export default nextConfig;
