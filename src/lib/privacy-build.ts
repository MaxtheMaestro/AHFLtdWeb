import type { Plugin } from "vite"
import { getPrivacyMetadata, privacyPath } from "../config/privacy"

export function createPrivacyBuildPlugin(siteUrl: string, published: boolean): Plugin {
  return {
    name: "privacy-pages-and-canonical",
    enforce: "post",
    transformIndexHtml: { order: "pre", handler: html => html.replace("%VITE_SITE_URL%", siteUrl) },
    generateBundle(_, bundle) {
      const escapeMarkup = (value: string) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
      const urls = [siteUrl, ...(published ? [siteUrl.slice(0, -1) + privacyPath] : [])]
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${escapeMarkup(url)}</loc></url>`).join("")}</urlset>\n` })
      const index = bundle["index.html"]
      if (index?.type !== "asset" || typeof index.source !== "string") this.error("Missing index.html for policy route metadata")
      const metadata = getPrivacyMetadata(false, published)
      const html = index.source
        .replace(/<title>.*?<\/title>/, `<title>${escapeMarkup(metadata.title)}</title>`)
        .replace(/(<meta\s+name="description"\s+content=")[^"]*("\s*\/>)/, `$1${escapeMarkup(metadata.description)}$2`)
        .replace(/(<link rel="canonical" href=")[^"]*("\s*\/>)/, `$1${escapeMarkup(siteUrl.slice(0, -1) + privacyPath)}$2`)
        .replace("</head>", `${metadata.indexable ? "" : '<meta name="robots" content="noindex, nofollow" />'}\n  </head>`)
      this.emitFile({ type: "asset", fileName: "privacy-policy.html", source: html })
    },
  }
}
