import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, loadEnv } from "vite"
import { getReleaseDecision, privacyPolicy, privacyRelease, publicationConfirmations } from "./src/config/privacy"
import { privacyPolicySections } from "./src/content/privacy-policy"
import { getSiteUrl } from "./src/config/website"
import { createPrivacyBuildPlugin } from "./src/lib/privacy-build"

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, ".", ["VITE_", "PRIVACY_"])
  const siteUrl = getSiteUrl(env.VITE_SITE_URL)
  if (env.PRIVACY_RELEASE && !["0", "1"].includes(env.PRIVACY_RELEASE)) throw new Error("PRIVACY_RELEASE must be 0 or 1")
  const dateParts = new Intl.DateTimeFormat("en", {
    timeZone: privacyRelease.timeZone, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date())
  const jamaicaDate = ["year", "month", "day"].map(type => dateParts.find(part => part.type === type)?.value).join("-")
  const decision = getReleaseDecision(command === "build" && env.PRIVACY_RELEASE === "1", jamaicaDate,
    { ...privacyPolicy, sections: privacyPolicySections }, publicationConfirmations)
  if (decision.errors.length) throw new Error(decision.errors.join(" "))
  return {
    define: { __PRIVACY_POLICY_RELEASED__: JSON.stringify(decision.published) },
    plugins: [react(), tailwindcss(), createPrivacyBuildPlugin(siteUrl, decision.published)],
  }
})
