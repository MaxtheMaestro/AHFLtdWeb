// Confirmed production origin. Both Vite metadata and the React app use this
// value; VITE_SITE_URL permits a future reviewed custom-domain migration.
export const defaultSiteUrl = "https://ahf-ltd-web.vercel.app/"

export function getSiteUrl(configured = defaultSiteUrl) {
  if (!/^https:\/\/[^/?#]+\/?$/.test(configured)) throw new Error("VITE_SITE_URL must be an HTTPS origin")
  return configured.replace(/\/$/, "") + "/"
}
