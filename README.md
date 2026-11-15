# AHFLtdWeb

## Local development

Run `npm install` if needed, then `npm run dev`. Copy `.env.example` to `.env.local` to configure public build-time values. Never put credentials or personal information in `VITE_` variables.

- `VITE_TALLY_CONTACT_FORM_ID`: live Tally form ID (`5BJ8aP` is the currently known public form). Missing/invalid IDs show an unavailable state and standalone/email alternatives. The iframe and helper load only after **Load Contact Form** is activated.
- `VITE_SITE_URL`: canonical HTTPS origin, default `https://ahf-ltd-web.vercel.app/`. Update for a verified future custom domain and rebuild.

`/?form-demo#contact` shows the development-only demonstration. It differs from live Tally, sends nothing, and must use synthetic data. Production builds omit the demonstration entirely.

## Privacy Policy workflow

The policy is board-approved, with administrator-confirmed factual details and two explicitly authorized internal-instruction removals from the source PDF. Effective date: **November 16, 2026**. Last updated: **October 25, 2026**. It is prepared for a manual release; it has not been deployed by this task.

The current content is in `src/content/privacy-policy.ts`, in 12 independent sections. `src/config/privacy.ts` holds explicit dates/version, contact details, factual confirmations and earliest release date; `src/config/website.ts` centralizes the production origin. The existing site contact reads the same privacy email. `src/content/contact-privacy-notice.ts` holds Part C; Tally dashboard changes remain manual. The old draft module is only a compatibility facade over the same approved content.

Default production builds **hold** the release: full policy content is compiled out, public links are hidden, the policy shell is `noindex`, and the sitemap omits the route. Local development shows an explicitly labelled approved-policy preview. `PRIVACY_RELEASE=1` requests a release **at build time**; Vite refuses it before November 16 in America/Jamaica or if factual/content checks fail. This does not use a visitor’s clock or schedule a deployment.

On/after November 16, an administrator must deploy a fresh release build. Keep Production `PRIVACY_RELEASE=1` afterward so normal future deployments retain the policy. Dates and wording never update merely because a build runs. Future substantive revisions require internal review and intentional updates to the version, dates, affected sections and release settings; unconfirmed changed facts should close the corresponding factual check. No repeat board-approval switch, CMS or new infrastructure is required.

Follow the [November 16 release and maintenance guide](docs/privacy-release-2026-11-16.md) for exact commands, Vercel/Tally actions, configuration map, verification and rollback. The guide records the administrator confirmations separately from independent technical testing. No source/document draft labels are included in the released policy.

## Checks

- `npm run lint`
- `npm run build` (TypeScript project validation and production build)
- `npm test` (build plus focused privacy/form regression tests using existing dependencies)

See [Phase 1 implementation and administrator checklist](docs/privacy-phase-1.md) for audit mapping, test evidence, deployment prerequisites and unresolved risks. Nothing in this change updates the standalone Tally form, Notion, or external account settings.
