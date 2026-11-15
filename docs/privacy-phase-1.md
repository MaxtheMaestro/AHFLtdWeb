# Privacy audit remediation — Phase 1

> Current release status: see [November 16 release guide](privacy-release-2026-11-16.md). The administrator has now confirmed the previously outstanding facts and dates. This earlier record is retained as history; its publication blockers are superseded by that guide.


## Current follow-up: supplied board-review policy

This section supersedes the historical Phase 1 record below wherever it describes the earlier placeholder outline or outstanding Tally notice. All previous safeguards remain in place.

### Source, approval evidence and publication status

Source: **Agape Hope Privacy Policy Board Review 2.pdf**, supplied from the user’s Downloads folder. SHA-256: `720e4c9d98e67a45fd8953a84033c708279bc892026e43be89b4c09c619452f1`. Part B spans pages 2–4; Part C is on page 4. Relevant pages were extracted and visually inspected. A separate comparison verified that all 12 substantive sections match the source after line-wrap/bullet normalization; section 12’s contact metadata is rendered separately. Purpose statements remain a six-item list. Headings use the requested title capitalization. Parts A/D, references and board-review watermarks are not policy content.

**Publication is blocked.** The user reports board approval, an updated Tally form and secured Notion access. Those reports are recorded as administrator confirmations; no account permissions, integration delivery or legal safeguards were independently verified. The source PDF still has:

- Effective date `[n/a]`: no date supplied; configuration remains `null`.
- Last updated `[Oct.25,2026]`: draft placeholder, not accepted as the approved date; configuration remains `null`.
- Section 1: explicit legal-entity-name confirmation against registration records.
- Section 5/8: access/confidentiality/security/incident measures requiring final operational confirmation.
- Section 6: provider locations and transfer arrangements explicitly requiring confirmation before publication.
- Section 7: retention periods or criteria still to be adopted; no periods invented.
- Section 9: child/vulnerable-person handling and photo safeguarding procedures requiring confirmation.
- Section 12: website placeholder now represented by the configured production origin in development, pending final approval; telephone omitted because no number is explicitly approved.

The registered-name spelling and final publication details have **not** been independently resolved. Clarendon, Jamaica and the known privacy email appear in the review page as supplied; the existing global brand lockups are preserved. The source’s substantive wording, including embedded drafting sentences, is retained in the development-only transcription, with distinct editorial blocker notes. The approved production-content module remains empty. No AI-generated replacement legal policy was introduced.

### Implementation

- Refined the existing policy page with all 12 sections, comfortable spacing, numbered headings, an accessible contents list, separate date/version/contact metadata, a skip link, and shared header/footer. Header, footer, logo and donate links on this route correctly return to homepage sections. Contents targets account for the sticky header and work after lazy loading and refresh.
- Added exact substantive Part C paragraphs above the load-form control, including collected fields, purposes, Tally-to-Notion handling, authorized personnel, international processing, sensitive-information warning and marketing limitation. The final contact line uses the supplied email. A public full-policy link is enabled only when publication is approved; development has a clearly labelled draft-review link. This avoids a public link to an unavailable/unapproved policy.
- Strengthened the gate with separate final-wording, legal-identity, contact, transfer, retention/deletion, security/safeguarding and date confirmations. Status alone cannot publish it. Missing confirmation keys, invalid/missing dates, incomplete section structure and review notes/placeholders fail the gate.
- Added route-specific title/description/canonical metadata and a generated production HTML shell, with `noindex, nofollow` while blocked. The Vercel route rewrite targets that shell. Sitemap generation includes only the homepage until publication passes; then the policy entry is included. No invented `lastmod` date is emitted.
- Preserved click-to-load Tally, accessible status/error states, standalone/email fallbacks, truthful demo behavior, memory-only anniversary behavior, reduced-motion handling, safe links, and existing response headers. No consent banner, marketing checkbox, tracking, backend, credentials or dependencies were added.

### Files modified or created in this follow-up

- `README.md` — source and confirmation/publication workflow.
- `docs/privacy-phase-1.md` — current status, evidence, blockers and manual actions.
- `docs/privacy-policy-preview.jpg` — screenshot of the development policy review (not included in the Vite public build).
- `src/config/privacy.ts` — extended policy model, publication confirmations, structural/date validation and metadata.
- `src/content/privacy-draft.ts` — full faithful development-only Part B transcription and separate review notes.
- `src/content/contact-privacy-notice.ts` — new Part C notice content.
- `src/pages/privacy-policy.tsx` — policy layout, sections, shared chrome and metadata presentation.
- `src/components/layout/header.tsx` — optional homepage-section destinations for policy-page navigation.
- `src/components/layout/footer.tsx` — optional homepage-section destinations.
- `src/components/layout/privacy-link.tsx` — approved-policy links and explicitly labelled development preview option.
- `src/components/domain/contact-form.tsx` — sourced Part C notice; existing loading/fallback behavior preserved.
- `src/App.tsx` — route-specific metadata and indexing behavior.
- `vite.config.ts` — generated policy HTML shell and approval-aware sitemap.
- `vercel.json` — policy rewrite destination updated; existing headers preserved.
- `tests/privacy-safety.test.mjs` — expanded publication/content/navigation/build regression coverage.

Existing uncommitted Phase 1 changes and the original audit document were preserved. The branch remains `fix/privacy-transparency-and-form-safety`.

### Tally consistency review

The public standalone form `https://tally.so/r/5BJ8aP` was inspected in the browser without entering information or submitting a response. Its current “Your Privacy Matters” notice names purposes, Tally, Notion, authorized personnel, prohibited sensitive information and the privacy email. This confirms the presence of an updated public notice, not dashboard settings or integration delivery.

Observed differences requiring administrator review:

1. “Please review our Privacy Policy” is plain text: the visible page has no clickable policy link. Add the final absolute policy URL only after publication; until then, remove or revise the inaccessible reference using approved wording.
2. The live notice is shorter than Part C: it omits the explicit international-processing/safeguards sentence and unrelated-marketing limitation, and does not enumerate all collected fields. Confirm whether the shorter wording or exact Part C is the final approved notice; align both surfaces accordingly.
3. No marketing checkbox was visible in the initial form. No duplicate was added in React. If marketing is actually planned, any Tally opt-in must be optional, unchecked and independent of inquiry submission; verify consent records and mappings separately.
4. The reason-for-contact heading still had no visible answer control in the inspected initial state. Verify the published field configuration/conditional behavior and required/optional settings rather than assuming the local demonstration describes production.

The embedded form loaded and resized in local browser QA. No Tally configuration was edited. Notion/Gmail/WhatsApp operations were not inspected; the policy text describes the administrator-reported workflow.

### Cookies, tracking and external resources

Source inspection found the deferred Tally iframe/helper and the existing Google Fonts import (Fraunces, Inter and Inter Tight). No first-party analytics, advertising pixels, cookie-setting code, localStorage or sessionStorage writes were found in application source. External social links remain normal links. This is a source-level finding, **not** a full live cookie/network inventory or proof that hosting/Tally adds no storage or tracking. Browser QA confirmed zero Tally iframe/helper elements before activation. Inventory actual requests, storage, provider settings and optional hosting features separately. Google Fonts remains an external dependency; no generic cookie banner is justified solely by this source inspection.

### Current verification results

- **Passed:** TypeScript validation and production build (`npm run build`, also run by `npm test`).
- **Passed:** ESLint (`npm run lint`) and whitespace check (`git diff --check`).
- **Passed:** 12 regression tests: provider ID/URL validation, truthful missing-provider alternatives, pre-interaction form gating/Part C notice/no checkbox, blocked production route/navigation, approved 12-section fixture rendering, helper failure/retry, production exclusions, exact 12-section structure and source drafting conditions, all publication prerequisites, footer/form/home links, non-indexable policy HTML and sitemap exclusion.
- **Passed:** independent comparison of all 12 substantive sections to the PDF extraction, following visual inspection of pages 2–4. Section 12 contact details are rendered from configuration; original website/telephone placeholders remain explicit review notes.
- **Passed in local browser:** all 12 headings and contents links, shared primary/footer home destinations, mobile menu navigation back to contact, title/description/canonical/noindex, keyboard contents activation, direct policy navigation and refresh at a section hash. At 375px, the retention section refreshed below the sticky header (target top 112px, header 73px); no horizontal page overflow. Desktop 1280px layout was inspected and a review screenshot saved.
- **Passed in local browser:** contact notice before form loading; zero Tally frames/helper scripts initially; keyboard activation focuses the iframe and the live form loads/resizes (observed 1797px at 375px after the updated notice). No data entered or submitted to Tally.
- **Not performed:** production deployment/headers/rewrites, full live cookie/network inventory, screen-reader and high-zoom testing, account permissions/delivery, end-to-end submission, and browser rendering of final approved legal wording (which has not been supplied). Existing Phase 1 automated helper-failure coverage remains; no claim is made that every network failure was manually simulated.

### Remaining actions before publication/deployment

- Management/privacy reviewer: confirm final entity name, contact details/production URL, exact final wording, version, effective date and approved updated date. Resolve the listed section instructions and operational commitments explicitly; do not simply remove the draft label.
- Management/administrators: confirm retention/deletion criteria, transfers/provider arrangements, access/confidentiality, security/incident and safeguarding procedures described in the policy. Administrator-reported Notion security is acknowledged but does not establish all these requirements.
- Developer after confirmation: insert final approved sections and dates in `src/config/privacy.ts`, clear all review-only content, set the corresponding confirmations and status in a reviewed change, rebuild and inspect the approved page/footer/form links and sitemap. Keep the source draft module development-only.
- Tally owner: align the short notice and add the final policy hyperlink when available; review the reason-for-contact field and required settings, and marketing consent only if needed. No website code change edits Tally.
- Notion owner: verify mappings, authorized access, sharing, retention/deletion and consent records with synthetic records; no credentials or personal submissions should be exposed during checks.
- Vercel owner: verify `/privacy-policy` direct access and refresh serve `privacy-policy.html` with the expected gate state and initial metadata. Verify all existing response headers, HTTPS and CSP report-only compatibility. Confirm no draft asset or draft text is in the deployed build. Preview hosting may add its own access/indexing headers.
- Release owner: complete keyboard/screen-reader/high-zoom/network-failure checks, live resource/storage inventory and Google Fonts follow-up. No cookie-consent manager has been introduced.

**Readiness: ready with prerequisites for review; not ready for public policy publication.** The draft labels/placeholders have been identified and represented safely, not declared resolved. No commit, push, merge or deployment was performed.

## Original Phase 1 implementation record (historical)

The remainder records the earlier implementation and its evidence; the current follow-up above supersedes its policy-source status, test count and Tally-notice observations.

Date: November 13, 2026. Branch: `fix/privacy-transparency-and-form-safety`.

## Implementation and audit mapping

| Finding | Repository change | Limit |
| --- | --- | --- |
| R01 / R02 | Dedicated `/privacy-policy` layout, semantic contents navigation, mobile typography, metadata/contact configuration, reusable links in the footer and above the form. | No approved policy exists in the searched repository. Draft editorial instructions load only in development. Production omits draft text and hides policy links until reviewed approved content and an effective date are supplied. |
| R02 | Notice immediately above form loading: inquiry purposes, Tally, authorized personnel, conditional/unverified Notion workflow, information to avoid and privacy email. | Actual Notion integration and monitored email require confirmation. No retention/security/legal promises are made. |
| R06 | Explicit **Load Contact Form** action gates both iframe and helper script. | This reduces unnecessary requests and gives a clear choice to load an external resource; it is not a legal consent mechanism. Viewport lazy loading alone could still contact Tally without an intentional request. |
| R07 / R08 | Missing/invalid configuration shows an accurate unavailable state with known standalone form and email alternatives. No production native form or local success message. Demonstration is opt-in via a development query flag, clearly differs from live Tally, retains entries after a demonstration attempt, and announces nothing was sent. | The actual Tally form and integration still need dashboard review. A third-party iframe load event does not establish successful form rendering or submission; wrapper wording explicitly accounts for blank/error frames. |
| R10 | Audited assets and stylesheet; retained Fraunces, Inter and Inter Tight, weights and fallbacks. | No local WOFF2 assets or font license files were found. No unverified files were downloaded or replacement fonts introduced. Google Fonts remains a runtime dependency and this finding remains open. |
| R11 | Vercel response-header configuration; report-only CSP, no-referrer, nosniff, limited Permissions-Policy and short HSTS. Iframe/script use no-referrer. Helper has shared loading, timeout/error reporting and retry capability on a later mount. Existing external social links retain noreferrer protection; new Tally link uses noopener/noreferrer. | Headers are source configuration only, not verified deployed headers. No arbitrary iframe sandbox or immutable SRI hash was added to the vendor-managed helper without compatibility evidence. |
| R13 | Removed anniversary localStorage access. Module memory limits the burst to the current loaded app; reduced motion is read before animation starts and stops visible confetti when enabled. Deferred start handles development StrictMode cleanup. | Full reload/new document can replay confetti. An old key already stored on a previous deployment is no longer read or written; this change does not erase historical browser storage. |
| R14 | Demo radio fieldset/legend semantics, existing label associations, general visible focus outline, keyboard load action and iframe focus, polite loading/failure announcements, descriptive initial iframe title, narrow form sizing. | External Tally labels, validation, submission outcome, screen-reader behavior and uploads must be checked in Tally. Its helper can replace the frame title with the live form title. |
| R15 | Replaced unused historical Framer URL with configurable production canonical origin; used it in HTML and page metadata. | Existing brand lockups and registered-name assumptions were not changed. Management must confirm branding/controller identity. |

No new dependencies, backend, database, consent popup or cookie manager were introduced. No submissions, credentials or private records were inspected. The existing untracked audit document was left unchanged.

## Files changed

- `.env.example`: public configuration examples.
- `README.md`: development, configuration and policy publication workflow.
- `docs/privacy-phase-1.md`: implementation evidence and manual checklist.
- `package.json`: focused test command.
- `index.html`: canonical link.
- `vite.config.ts`: configurable canonical HTML transformation and HTTPS-origin check.
- `vercel.json`: route rewrite and response headers.
- `src/App.tsx`: policy routing, metadata, safe hash lookup and restrained inquiry guidance.
- `src/config/privacy.ts`: approval-gated policy content and metadata contract.
- `src/content/privacy-draft.ts`: development-only editorial outline.
- `src/pages/privacy-policy.tsx`: responsive policy document, contents, hash navigation and unavailable state.
- `src/components/layout/privacy-link.tsx`: approved-policy navigation.
- `src/components/layout/footer.tsx`: conditional permanent policy link.
- `src/components/domain/contact-form.tsx`: notice, interaction-gated embed, status/fallbacks and development demo entry.
- `src/components/domain/contact-form-preview.tsx`: isolated demonstration, truthful outcome, radio semantics and responsive fields.
- `src/config/forms.ts`: standalone fallback URL, minimal-information instructions and removal of false success copy.
- `src/lib/forms/tally.ts`: ID validation and shared/error-aware helper loading.
- `src/components/AnniversaryBanner.tsx`: memory-only animation guard.
- `src/hooks/use-prefers-reduced-motion.ts`: initial reduced-motion detection.
- `src/config/site.ts`: current configurable canonical origin.
- `src/vite-env.d.ts`: canonical environment variable type.
- `src/styles.css`: visible focus outline.
- `tests/privacy-safety.test.mjs`: focused regression tests, isolated temporary Vite caches.

## Validation evidence

- **Passed:** TypeScript project validation and Vite production build (`npm run build`).
- **Passed:** ESLint (`npm run lint`).
- **Passed:** eight Node regression tests (`npm test`): blank/malformed provider IDs; embed options; accurate missing-provider output; configured initial output without iframe/script; production draft gating; approved-policy fixture rendering/navigation; helper failure/shared load/retry; built bundle exclusion of draft/demo/legacy persistence and canonical/header configuration.
- **Passed in local browser:** homepage and existing navigation render; initial DOM has zero Tally iframes/scripts; activation loads the live public form without entering/submitting data; helper resizes iframe to content (observed 1019px at 375px viewport); keyboard Enter activates loading and focuses the iframe.
- **Passed in local browser:** development policy direct URL, mobile contents navigation and reload; draft warning is prominent. Layout checks at 375px, 320px (including demo) and desktop 1280px show no horizontal document overflow after the demo sizing fix.
- **Passed in local browser:** synthetic demo name/email, demonstration attempt, explicit nothing-sent announcement, and retained entered name. No live Tally submission was made.
- **Not completed:** deployed Vercel headers/rewrites/HTTPS behavior; end-to-end submission confirmation, dashboard changes and Notion delivery; real screen-reader testing, 200–400% browser zoom, reduced-motion OS toggling, and simulated live network blocking. These remain release checks below. Automated SSR fixture tests do not replace browser approval testing of the final legal wording.

The first build exposed a Vite-config typing issue, fixed before the successful build. Initial test harness runs exposed development-mode substitution/cache behavior, corrected by explicit test transforms and isolated temporary caches. Browser QA exposed narrow demo overflow, fixed and rechecked. Local server binding required sandbox escalation; it subsequently started successfully.

## Manual administration checklist

### Tally owner — public form `5BJ8aP`

- [ ] In the form editor, add the approved short privacy notice **before the first input**, covering purposes, actual recipients/workflow, information to avoid and the confirmed privacy email. Website edits do not change this standalone form.
- [ ] Once policy text is approved and published, add its absolute production URL in the form itself; do not link to the development draft.
- [ ] Review the currently published required fields: verify whether phone, parish and contact method must be required. Remove unnecessary fields and resolve the inquiry heading with no visible answer control. Confirm conditional paths against the intended intake process instead of copying the demo unquestioningly.
- [ ] Review partial/draft submission capture, analytics, hidden fields, page/query forwarding, tracking and integrations. Disable unnecessary features; do not place personal information in website URL query parameters. Tally documents automatic page/query forwarding for script-assisted standard embeds.
- [ ] Keep marketing permission separate and optional if actually needed; approve its wording and evidence/version recording. Do not add a generic required policy-agreement checkbox for ordinary inquiries.
- [ ] Verify upload necessity, restrictions, permissions, link exposure, sharing and deletion before enabling uploads.
- [ ] Test labels, groups, required/optional indications, keyboard access, errors, completion message and responsive multi-page resizing using synthetic data in a controlled workflow. Publish reviewed dashboard changes and check both standalone and embedded forms.
- [ ] Verify actual Notion integration field mappings, recipients, retries, duplicate handling and notifications. Record exactly what is transferred before replacing the website’s conditional disclosure.

### Notion administrator

- [ ] Identify destination databases and connected accounts/integrations; verify least-necessary access, private sharing, inherited permissions, guests, public links and MFA.
- [ ] Inspect schema/mappings without exposing personal submissions; minimize fields and notification/export copies.
- [ ] Verify approved retention, correction and deletion procedures across Tally, Notion, email, attachments, exports, trash/history/backups and re-imports. Test with synthetic records and assign accountable owners.

### Vercel / release owner

- [ ] Verify production `VITE_TALLY_CONTACT_FORM_ID=5BJ8aP` and the intended `VITE_SITE_URL`; rebuild when changing either. These values are public, never credentials.
- [ ] Verify deployed direct navigation and refresh at `/privacy-policy`, including trailing-slash handling. While draft, confirm unavailable output and no footer/form policy links. After approval, confirm exact content, contents links, home navigation, canonical URL and footer/form links.
- [ ] Verify actual responses for HTML and assets: `Referrer-Policy`, `X-Content-Type-Options`, `Permissions-Policy`, HSTS and CSP report-only. Verify HTTPS redirect. HSTS starts at one day without includeSubDomains/preload; lengthen only after host/custom-domain verification.
- [ ] Review browser CSP console violations in a preview and deployed environment with Tally loading, resizing, normal inquiry paths, fonts and animations. Report-only does not block resources. No report collection endpoint is configured; use browser console initially, choose an approved endpoint/logging policy before central collection, then consider enforcement in a separately tested change. Test Vercel toolbar/analytics separately if enabled.
- [ ] Block Tally script and iframe separately in DevTools: verify timeout/status, readable fallbacks and email access. Check the form when an iframe returns a blank/error document; browsers do not reliably fire iframe error events for all failures. The wrapper intentionally does not treat iframe load as submission confirmation.
- [ ] Confirm zero Tally requests before activation in a clean tab, including on `#contact` navigation. Check actual cookies/storage before and after activation and decide whether optional processing needs further controls.
- [ ] Obtain fonts from verified official sources with appropriate bundled licenses, preserve Fraunces 600/700/800 (including optical sizing), Inter 400–800 and Inter Tight 700–900, subset carefully, self-host WOFF2 and test metrics/weights/layout shifts before removing the Google import. Until then, disclose/review the Google Fonts requests.
- [ ] Recheck mobile/desktop, 200–400% zoom, keyboard focus, screen-reader status/validation, reduced-motion enabled before page load and toggled while running, and anniversary behavior across ordinary hash navigation.

### Management / organizational privacy governance

- [ ] Confirm controller identity, legal/brand names, monitored privacy email and any registered address before publication.
- [ ] Approve policy wording, processing conditions, sensitive/children’s data handling, effective date/version and complaints/rights procedures; insert the approved text faithfully through the documented reviewed-code workflow.
- [ ] Decide retention schedules and operational deletion/correction across every copy; verify actual transfers, processor agreements/DPAs, locations/subprocessors and safeguards with qualified advice.
- [ ] Review registration, DPO and other applicable duties; establish incident response, staff training, access reviews and responsibility for requests.
- [ ] Verify children's/photo publication permissions and any marketing consent records separately.

## Remaining risks and readiness

**Ready with prerequisites.** The repository changes can be reviewed/merged independently, but the audit is not closed and this does not establish legal compliance. Before treating privacy remediation as production-complete: approve and publish the policy (R01), add the notice in standalone Tally and resolve live/demo mismatch (R02/R07), verify required fields/sensitive intake and child/media handling (R03/R09/R12), verify integrations, retention, access and transfers/contracts (R04/R05), complete font remediation (R10), and verify headers plus live accessibility/failure behavior after deployment (R11/R14). R15 canonical metadata is corrected; branding consistency remains a management decision. Cosmetic persistence code is removed (R13); historical browser keys may remain on existing devices. R06/R08 repository behavior is corrected, subject to deployment.

No commit, push, merge or deployment was performed.

## Technical references

- [Tally embedding and dynamic height](https://tally.so/help/embed-your-form): vendor embed options and page/query forwarding behavior.
- [Vercel project configuration](https://vercel.com/docs/project-configuration): deployment header/rewrite configuration reference. Source configuration is not evidence of production activation.
