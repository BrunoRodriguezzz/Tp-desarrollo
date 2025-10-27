/*
  Simple sitemap generator for CRA frontend.
  - Includes core static routes.
  - Optionally fetches products from backend to include product detail URLs.
  Usage: SITE_URL=https://tu-dominio.com npm run sitemap --workspace=frontend
*/

const fs = require("fs");
const path = require("path");
const axios = require("axios");

const SITE_URL =
  process.env.SITE_URL ||
  process.env.REACT_APP_SITE_URL ||
  "http://localhost:3000";
const API_URL =
  process.env.REACT_APP_URL_BACKEND ||
  process.env.URL_BACKEND ||
  "http://localhost:8000";

const staticPaths = [
  "/",
  "/productos",
  "/categorias",
  "/login",
  "/register",
  "/carrito",
  "/notificaciones",
  "/pedidos",
  "/ventas",
  "/mis-productos",
];

async function fetchProductPaths() {
  const urls = [];
  try {
    let page = 1;
    const limit = 50;
    let totalPages = 1;

    do {
      const { data } = await axios.get(`${API_URL}/productos`, {
        params: { page, limit },
        timeout: 5000,
      });
      const items = data?.data || data?.items || [];
      totalPages = Number(data?.totalPages || data?.total_pages || 1) || 1;
      for (const p of items) {
        if (p && (p._id || p.id)) {
          const id = p._id || p.id;
          urls.push(`/productos/${id}`);
        }
      }
      page += 1;
    } while (page <= totalPages);
  } catch (err) {
    // Backend may be offline; fall back to static only
    console.warn(
      "[sitemap] No se pudieron obtener productos dinámicos:",
      err.message
    );
  }
  return urls;
}

function urlNode(
  loc,
  {
    changefreq = "weekly",
    priority = 0.7,
    lastmod = new Date().toISOString(),
  } = {}
) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function generate() {
  const products = await fetchProductPaths();
  const urls = [
    ...staticPaths.map((p) => ({ path: p, priority: p === "/" ? 1.0 : 0.8 })),
    ...products.map((p) => ({ path: p, priority: 0.7 })),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => urlNode(`${SITE_URL}${u.path}`, { priority: u.priority }))
      .join("\n") +
    `\n</urlset>\n`;

  const outPath = path.join(__dirname, "..", "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");
  console.log(`[sitemap] Generado: ${outPath}`);
}

generate();
