import { policyPublished, privacyPath } from "../../config/privacy"

export function PrivacyLink({ className, allowPreview = false, label = "Privacy Policy" }: { className?: string; allowPreview?: boolean; label?: string }) {
  if (policyPublished) return <a href={privacyPath} className={className}>{label}</a>
  return import.meta.env.DEV && allowPreview
    ? <a href={privacyPath} className={className}>Preview approved Privacy Policy (development only)</a>
    : null
}
