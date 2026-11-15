export const privacySectionIds = [
  "who-we-are", "information-collected", "purposes", "lawful-processing",
  "service-providers", "international-processing", "retention-deletion", "security",
  "sensitive-information-children", "cookies-external-links", "privacy-rights", "changes-contact",
] as const

export type PrivacyPolicy = {
  effectiveDate: string | null
  lastUpdated: string | null
  version: string
  organization: string
  contactEmail: string
  location: string
  telephone: string | null
  sections: { id: string; title: string; paragraphs: string[]; bullets?: string[]; reviewNotes?: string[] }[]
}

// Administrator-confirmed facts, not claims of independent account/legal testing.
// Board approval is confirmed and is not a second approval switch.
const confirmationKeys = [
  "legalIdentity", "internationalTransfers", "retentionAndDeletion",
  "securityAndSafeguarding", "internalInstructionsResolved",
] as const

export const publicationConfirmations: Record<(typeof confirmationKeys)[number], boolean> = {
  legalIdentity: true,
  internationalTransfers: true,
  retentionAndDeletion: true,
  securityAndSafeguarding: true,
  internalInstructionsResolved: true,
}

// Dates and version are intentional revision metadata, never derived from a build.
// Substantive wording lives in ../content/privacy-policy.ts, loaded only for a
// development preview or an explicitly enabled release build.
export const privacyPolicy: Omit<PrivacyPolicy, "sections"> = {
  effectiveDate: "2026-11-16",
  lastUpdated: "2026-10-25",
  version: "2026-11-16",
  organization: "Agape Hope Foundation of Jamaica Ltd.",
  contactEmail: "agapehopeja@gmail.com",
  location: "Clarendon, Jamaica",
  telephone: null,
}

export const privacyRelease = {
  notBefore: "2026-11-16",
  timeZone: "America/Jamaica",
  method: "manual-deployment",
} as const

function isConfirmedDate(value: string | null): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const timestamp = Date.parse(value)
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value
}

export function canPublishPolicy(policy: PrivacyPolicy, confirmations: typeof publicationConfirmations) {
  return confirmationKeys.every(key => confirmations[key] === true)
    && isConfirmedDate(policy.effectiveDate)
    && (policy.lastUpdated === null || isConfirmedDate(policy.lastUpdated))
    && Boolean(policy.version.trim() && policy.organization.trim() && policy.contactEmail.trim() && policy.location.trim())
    && policy.sections.length === privacySectionIds.length
    && policy.sections.every((section, index) => section.id === privacySectionIds[index]
      && section.title.trim() && (section.paragraphs.length > 0 || Boolean(section.bullets?.length))
      && [section.title, ...section.paragraphs, ...(section.bullets ?? [])].every(text => text.trim()
        && !/\[|\]|\bINSERT\b|\bdraft\b|board review|must be confirmed|before publication/i.test(text))
      && !section.reviewNotes?.length)
}

export function getReleaseDecision(requested: boolean, jamaicaDate: string, policy: PrivacyPolicy, confirmations: typeof publicationConfirmations) {
  if (!requested) return { published: false, errors: [] as string[] }
  const errors: string[] = []
  if (!isConfirmedDate(jamaicaDate) || jamaicaDate < privacyRelease.notBefore) errors.push(`Policy release builds are not permitted before ${privacyRelease.notBefore} in ${privacyRelease.timeZone}.`)
  if (!canPublishPolicy(policy, confirmations)) errors.push("Policy content or factual confirmations are incomplete; release build refused.")
  return { published: errors.length === 0, errors }
}

// Replaced by Vite at build time. This is not a browser-date gate. A held build
// cannot fetch the policy content because its dynamic import is compiled out.
declare const __PRIVACY_POLICY_RELEASED__: boolean
export const policyPublished = typeof __PRIVACY_POLICY_RELEASED__ !== "undefined" && __PRIVACY_POLICY_RELEASED__
export const privacyPath = "/privacy-policy"
export function isPrivacyPath(pathname: string) {
  const path = pathname.replace(/\/$/, "")
  return path === privacyPath || path === `${privacyPath}.html`
}

export function getPrivacyMetadata(development = false, published = policyPublished) {
  return {
    title: published ? "Privacy Policy | Agape Hope" : development ? "Privacy Policy Preview | Agape Hope" : "Page unavailable | Agape Hope",
    description: published
      ? `How ${privacyPolicy.organization} handles personal information and how to contact the Foundation about privacy.`
      : `Contact ${privacyPolicy.organization} with privacy questions at ${privacyPolicy.contactEmail}.`,
    indexable: published,
  }
}
