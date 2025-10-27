import { useEffect } from "react";
import PropTypes from "prop-types";

export default function Seo({
  title, // Título de la pestaña y base para OG/Twitter si no pasás ogTitle/twitterTitle.
  description, // Meta description para buscadores y base para OG/Twitter si no pasás ogDescription/twitterDescription.
  canonical, // Es una URL que evita contenido duplicado en SEO.
  // Props para Open Graph
  ogTitle, // Título específico para Open Graph (Facebook, LinkedIn). Si no lo pasás, usa title.
  ogDescription, // Descripción específica para Open Graph. Si no la pasás, usa description.
  ogImage, // URL de imagen para Open Graph (ideal 1200x630). Si no la pasás, no se agrega.
  // Props para Twitter
  twitterCard = "summary_large_image", // Tipo de tarjeta de Twitter. Por defecto “summary_large_image”.
  twitterTitle, // Título específico para Twitter. Si no lo pasás, usa title.
  twitterDescription, // Descripción específica para Twitter. Si no la pasás, usa description.
  twitterImage, // Imagen específica para Twitter. Si no la pasás, usa ogImage.
}) {
  useEffect(() => {
    const head = document.head || document.getElementsByTagName("head")[0];

    const upsertMeta = (selector, attrs) => {
      if (!attrs || attrs.content == null) return;
      let el = head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const m = selector.match(/\[(name|property)="([^"]+)"\]/);
        if (m) el.setAttribute(m[1], m[2]);
        head.appendChild(el);
      }
      el.setAttribute("content", String(attrs.content));
    };

    const upsertLink = (rel, href) => {
      if (!href) return;
      let el = head.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    if (title) document.title = title;
    upsertMeta('meta[name="description"]', { content: description });

    // Open Graph
    upsertMeta('meta[property="og:title"]', { content: ogTitle || title });
    upsertMeta('meta[property="og:description"]', { content: ogDescription || description });
    upsertMeta('meta[property="og:image"]', { content: ogImage });
    upsertMeta('meta[property="og:type"]', { content: 'website' });

    // Twitter
    upsertMeta('meta[name="twitter:card"]', { content: twitterCard });
    upsertMeta('meta[name="twitter:title"]', { content: twitterTitle || title });
    upsertMeta('meta[name="twitter:description"]', { content: twitterDescription || description });
    upsertMeta('meta[name="twitter:image"]', { content: twitterImage || ogImage });

    // Canonical
    upsertLink("canonical", canonical);
  }, [
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
  ]);

  return null;
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonical: PropTypes.string,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogImage: PropTypes.string,
  twitterCard: PropTypes.string,
  twitterTitle: PropTypes.string,
  twitterDescription: PropTypes.string,
  twitterImage: PropTypes.string,
};
