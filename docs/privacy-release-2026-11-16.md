# Privacy Policy release — November 16, 2026

Prepared November 14, 2026. Repository: `/Users/jmaxr/AHFwebsite`. Branch: `fix/privacy-transparency-and-form-safety`.

## Current status

| Area | Status |
| --- | --- |
| Implementation | Technically complete; automated and local browser checks recorded below |
| Board approval | Confirmed by the administrator; no additional board-publication gate |
| Factual confirmations | Administrator confirmed registered identity, transfers, retention/deletion and security/incident/safeguarding commitments; not independently audited |
| Effective date / intended release | **November 16, 2026**, America/Jamaica |
| Last updated | **October 25, 2026**, explicitly confirmed from the source PDF |
| Deployment readiness | Prepared for a manual release on/after November 16; complete the Tally and deployment checks below |
| Public deployment | **Not performed or verified by this task** |

The policy will **not appear automatically** when the calendar reaches November 16. An existing held build stays held until a fresh, explicitly enabled production build is deployed. No commit, push, merge, deployment, reminder, scheduler or new infrastructure was created.

## Source and approved cleanup

Authoritative source: **Agape Hope Privacy Policy Board Review 2.pdf**, Part B (pages 2–4) and Part C (page 4). SHA-256: `720e4c9d98e67a45fd8953a84033c708279bc892026e43be89b4c09c619452f1`.

The administrator confirmed that the board approved the source, that the official site remains `https://ahf-ltd-web.vercel.app/`, and that the privacy contact is `agapehopeja@gmail.com`. In response to explicit review questions, the administrator also confirmed registration-name accuracy, the operational commitments, and the source last-updated date. These are administrator confirmations, not independent technical testing of external accounts or a legal-compliance conclusion.

Only these two internal sentences were removed from Part B, with explicit administrator authorization:

1. Section 1: “The legal entity name must be confirmed against the Foundation’s registration records before publication.”
2. Section 6: “The Foundation must confirm the relevant provider locations and transfer arrangements before publication.”

All remaining substantive paragraphs and the six purpose bullets are unchanged apart from PDF line-wrap normalization. This includes the original forward-looking retention wording, security language and child/photo safeguards. An independent source-text comparison verified all 12 sections after precisely these two removals. Part A, Part D, watermarks and board reference material are not public policy content. Internal review notes were removed from presentation. Website/contact placeholders are represented by confirmed configuration; no public telephone has been invented.

The policy keeps the approved organization name **Agape Hope Foundation of Jamaica Ltd.** and location **Clarendon, Jamaica**. Existing global brand lockups were preserved. The implementation revision identifier is `2026-11-16`; it is explicit metadata, not a generated last-updated date.

## Maintainable configuration and content

| Future change | Update these files/settings | Review requirement |
| --- | --- | --- |
| Policy wording, providers, retention, transfers, rights or safeguarding provisions | `src/content/privacy-policy.ts`, organized as 12 named sections | Obtain internal approval before substantive edits; preserve unrelated sections |
| Effective date, approved last-updated date, version, organization, privacy email, location, approved telephone | `src/config/privacy.ts` → `privacyPolicy` | Set intentional revision values; unrelated builds never change them. `lastUpdated: null` omits that field if a future date is not confirmed |
| Earliest permitted release date and date zone | `src/config/privacy.ts` → `privacyRelease` | Explicitly choose the new revision’s release date. It can be maintained separately from its effective date; current values intentionally match |
| Changed operational facts | `src/config/privacy.ts` → `publicationConfirmations` | Set affected facts to false until confirmed again. These are factual safeguards, not repeat board approval |
| Production publication / temporary hold | Build environment `PRIVACY_RELEASE=1` / `0` | A fresh deployment is required. Default is hold; production release builds refuse an early Jamaica date or incomplete content/facts |
| Site domain | `VITE_SITE_URL`; default in `src/config/website.ts` | Confirm the domain, rebuild, and update external Tally links. React, canonical metadata and sitemap use the same normalizer |
| Website short collection notice | `src/content/contact-privacy-notice.ts` | Review alongside the policy and update Tally manually. This remains Part C; no marketing checkbox is duplicated |
| Contact email shown around the site | `src/config/privacy.ts` → `contactEmail` | `src/config/site.ts` reads this value. Also review literal email/name references in approved policy/notice prose; legal wording is deliberately not rewritten automatically |
| Live provider/form selection | `src/config/forms.ts`, `VITE_TALLY_CONTACT_FORM_ID`; provider modules under `src/lib/forms/` | Test loading, resizing and truthful fallback; update disclosures if the provider changes |
| Layout/navigation/accessibility | `src/pages/privacy-policy.tsx`, shared header/footer and privacy-link component | Keep legal content separate from layout; preserve keyboard/mobile/reduced-motion behavior |
| Build metadata and sitemap behavior | `src/lib/privacy-build.ts`, wired by `vite.config.ts` | Both artifacts use the same build-time release decision |
| Hosted policy route/security headers | `vercel.json` | Verify actual responses after deployment; source configuration is not proof of active headers |

`src/content/privacy-draft.ts` is a small compatibility export for older tooling. It reads the same approved content; it is not a second copy of the legal text. No CMS, database or administrator dashboard was added. Future operational changes do not authorize automatic legal rewrites or new integrations.

## Build and timing behavior

- Default/unset/`0`: the full policy module and development preview are excluded from the production bundle. The policy route shows the truthful unavailable state, public footer/form links are hidden, the generated policy HTML is `noindex, nofollow`, and the sitemap omits the policy.
- `PRIVACY_RELEASE=1`: Vite checks the **build machine’s current date in America/Jamaica**, the configured earliest release date, factual confirmations and content completeness. Before November 16, the release build fails. Invalid flag values fail rather than silently enabling publication.
- A permitted release build includes the full policy, enables footer/form links, emits policy metadata and sitemap entry, and removes the application’s `noindex` from the policy HTML. Development preview text is compiled out.
- The browser never decides publication by its local clock. Merely changing an environment variable or waiting does not change an already deployed static build.
- No policy text is put into an early public production bundle and hidden behind a JavaScript date check. The macro-controlled dynamic import is removed entirely in held builds.

This is a publication workflow, not a consent mechanism or proof of legal compliance.

## Before release day

- [ ] Review the finalized policy in `npm run dev` at `http://127.0.0.1:5173/privacy-policy`. Its banner says development preview; dates are November 16 and October 25.
- [ ] Review the full diff and preserve all existing uncommitted work. The deployment must contain these reviewed changes. Redeploying an older Git commit will not include this local work.
- [ ] Keep `PRIVACY_RELEASE` unset or `0` in Production and Preview before November 16. Do not publish a development server.
- [ ] Record the existing production deployment URL/ID in Vercel for rollback. Do not delete it.
- [ ] Prepare the Tally correction below. It must be published separately; repository code does not update it.
- [ ] Verify the source of any optional hosting analytics, scripts or cookies. No application analytics/pixels/browser-storage writes were found; Tally and Google Fonts remain external resources. This is not a complete live cookie inventory and no generic cookie banner was added.

## November 16 release procedure

Do these steps **on or after November 16, 2026 in Jamaica**. The commands below are instructions for the administrator; none of the Vercel commands were executed by Codex.

### 1. Check the reviewed checkout locally

```sh
cd /Users/jmaxr/AHFwebsite
git branch --show-current
git status --short
npm run lint
PRIVACY_RELEASE=0 npm test
PRIVACY_RELEASE=1 npm run build
npm run preview -- --host 127.0.0.1
```

The branch must be `fix/privacy-transparency-and-form-safety`. Stop if checks fail. The last build should refuse to run if attempted too early. Open `http://127.0.0.1:4173/privacy-policy` and check the full page, dates, footer and form links. Stop the local preview with Ctrl-C after inspection. These checks/deployment operations do not require changing the approved wording or dates.

### 2. Set Production environment values in the existing Vercel project

Open the existing project that currently serves `https://ahf-ltd-web.vercel.app/`; verify its domain rather than guessing a project or team name. In **Settings → Environment Variables**, set for **Production**:

```text
PRIVACY_RELEASE=1
VITE_SITE_URL=https://ahf-ltd-web.vercel.app/
VITE_TALLY_CONTACT_FORM_ID=5BJ8aP
```

Keep `PRIVACY_RELEASE=0` for Preview unless intentionally testing a permitted release after the release date. Leave unrelated values unchanged. Preserve Production’s `1` for subsequent normal deployments so later website changes do not inadvertently withdraw the policy. Environment changes apply to new deployments, not an existing one. [Vercel environment variables](https://vercel.com/docs/environment-variables).

### 3. Deploy this reviewed local checkout manually

If the CLI is not already authenticated/linked:

```sh
npx vercel login
npx vercel link
```

Choose the existing account/team/project serving the production URL. Do not create a new project. `.vercel/` is ignored so local project/environment state is not added to Git.

Then, from the same reviewed checkout:

```sh
npx vercel deploy --prod --build-env PRIVACY_RELEASE=1
```

`--prod` targets the linked production project; `--build-env` explicitly supplies the build opt-in. Record the returned deployment URL and verify the normal production alias. This command deploys the checkout; a preexisting Git deployment/redeploy uses its own source revision instead. [Vercel deploy options](https://vercel.com/docs/cli/deploy).

If the organization uses its usual reviewed Git release process instead, have the administrator get this change into the approved production revision outside this task, then deploy **that revision** after setting the Production values above. A dashboard Redeploy of an older revision is insufficient. Use a fresh build rather than an earlier held artifact.

### 4. Verify production before announcing completion

- [ ] Directly open `https://ahf-ltd-web.vercel.app/privacy-policy`, refresh it, and navigate to a contents anchor. Confirm no blank page or unavailable state.
- [ ] Confirm all 12 sections, effective date November 16, last updated October 25, confirmed name/location/email/website, no invented telephone, no review banner/internal instructions.
- [ ] Confirm the homepage footer and contact notice link to the policy. Policy-page header/footer must return to homepage sections.
- [ ] Confirm canonical URL `https://ahf-ltd-web.vercel.app/privacy-policy`, appropriate title/description, no `noindex` in the page source or `X-Robots-Tag` response header, and the policy entry in `/sitemap.xml`.
- [ ] Confirm both desktop and mobile, keyboard focus/contents navigation, screen-reader reading order/status announcements, and high zoom. Check reduced motion without changing legal content.
- [ ] In a clean browser tab, verify no Tally iframe/helper request before loading the form. Activate it and verify the notice, resizing and working alternatives. Block script/frame separately to check truthful status/fallback behavior.
- [ ] Verify actual response headers against `vercel.json`, HTTPS behavior and CSP report-only compatibility. Check optional provider/hosting scripts and storage in the live environment.
- [ ] After publishing the Tally changes, verify both standalone and embedded notices/link. Use synthetic data only if an administrator performs an authorized submission/delivery test; the repository tests do not establish Tally→Notion delivery.

Optional terminal checks:

```sh
curl -I https://ahf-ltd-web.vercel.app/privacy-policy
curl -fsS https://ahf-ltd-web.vercel.app/privacy-policy
curl -fsS https://ahf-ltd-web.vercel.app/sitemap.xml
```

Only classify the policy as publicly released after these production checks succeed. No such deployment verification has occurred in this task.

## Exact manual Tally corrections

For the existing public form `5BJ8aP`, edit the notice block before data collection. The embedded form currently shows the same shorter “Your Privacy Matters” notice and an unlinked policy reference; it does not fully match Part C. The administrator should replace the notice with the following approved Part C paragraphs (the runtime source remains `src/content/contact-privacy-notice.ts`):

> Agape Hope Foundation of Jamaica Ltd. collects your name, email address, telephone or WhatsApp number, parish, preferred contact method, reason for contacting us, and any additional information you choose to provide. We use this information to review and respond to your inquiry, coordinate assistance or opportunities to volunteer or partner with us, and contact you using your preferred method.
>
> Your submission is processed through Tally, our online form provider, and transferred to Notion, which we use for internal recordkeeping and follow-up. Only authorized Foundation personnel should access submissions for these purposes. Some providers may process information outside Jamaica, subject to applicable legal safeguards.
>
> Please avoid including medical records, identification numbers, financial account details, or other highly sensitive information in this general form. We do not use your contact information for unrelated marketing without an appropriate lawful basis.

Add the final line, with **Privacy Policy** a clickable link to `https://ahf-ltd-web.vercel.app/privacy-policy`:

> Read our full Privacy Policy or email agapehopeja@gmail.com with privacy questions.

Make the email a `mailto:agapehopeja@gmail.com` link. Publish the policy link only when the website release is live. Verify its destination from a logged-out browser. Replace the shorter notice rather than adding a duplicate notice. If this policy/notice is revised later, recheck this release-time copy against the canonical content module and newly approved text.

Also verify the reason-for-contact heading has an actual answer control and review required/optional fields. No marketing checkbox was visible in the inspected initial form. Do not add one merely because an assistance form exists. If an actual marketing choice is already present in another conditional state, ensure it is optional, unchecked, separate, and never required for submission; do not create a second React checkbox. Keep notification/Notion consent handling consistent. No Tally settings, records or integration credentials were changed here.

## Rollback

If production checks fail, use the existing Vercel project’s **Instant Rollback** action and select the known-good deployment recorded before release. This returns the domain to an existing artifact rather than rebuilding it. Verify the homepage/form afterward. Available rollback targets depend on the project’s Vercel plan/history. [Vercel Instant Rollback](https://vercel.com/docs/instant-rollback).

If a new held build is required instead, set Production `PRIVACY_RELEASE=0`, redeploy the reviewed source and verify the unavailable route, hidden links and omitted sitemap entry. Changing the variable without deployment does not withdraw a released artifact. Coordinate removal of Tally’s policy reference if the policy becomes unavailable. Preserve the confirmed dates/version and approved source; do not falsify them as a rollback mechanism. Re-enable `1` only for the corrected, verified release.

## Validation and limits

- Passed TypeScript validation, ESLint, production held build and 15 regression tests (see final task report for the latest run).
- Tests cover the confirmed effective/updated dates; all 12 sections; content/factual safeguards; held route and missing-provider output; footer/form links in release mode; initial Tally gating; helper failure/retry; production draft/demo exclusions; route aliases and shared canonical origin; refusal before November 16; explicit opt-in; released HTML/sitemap/content using an in-memory build with no deployment.
- A real `PRIVACY_RELEASE=1 npm run build` attempt on November 14 was correctly refused by the date guard. The normal held build succeeds. Simulated release output was checked in memory, not published or left as deployable early output.
- Source comparison confirmed precisely the two authorized instruction removals, with all remaining substantive wording matching Part B.
- Local desktop/mobile browser checks confirmed the final date presentation, no internal instructions, 12 sections, keyboard contents navigation and section refresh, shared mobile navigation, no horizontal overflow at 375px, and Tally deferred loading/focus/resizing. The embedded live notice was read without entering/submitting information.
- Not independently tested: external account controls/contracts/legal arrangements, full cookie inventory, screen-reader/high-zoom/network-failure behavior, actual production routing/headers/indexability, or submission delivery. Administrator confirmations are retained without presenting them as independent test results.

## Files changed in this finalization

- `.gitignore` — exclude local Vercel state.
- `.env.example` — document the build-only release opt-in.
- `README.md` — current workflow and centralized configuration map.
- `docs/privacy-phase-1.md` — pointer to this superseding release record; prior evidence retained.
- `docs/privacy-release-2026-11-16.md` — this release/maintenance/rollback guide.
- `docs/privacy-release-preview.jpg` — finalized development-preview screenshot.
- `src/config/privacy.ts` — confirmed metadata/facts and release/content checks; no redundant board-approval gate.
- `src/config/website.ts` — single configurable production-origin source.
- `src/config/site.ts` — consume shared website/email configuration.
- `src/content/privacy-policy.ts` — one canonical copy of the approved 12-section content.
- `src/content/privacy-draft.ts` — compatibility facade, without duplicated draft wording.
- `src/pages/privacy-policy.tsx` — shared rendering of preview/release content with explicit dates and compile-time content exclusion.
- `src/components/layout/privacy-link.tsx` — accurate approved-preview label and release links.
- `src/App.tsx` — policy-route alias handling and existing metadata integration.
- `src/lib/privacy-build.ts` — shared HTML/sitemap build plugin.
- `vite.config.ts` — build opt-in, Jamaica-date guard and compile-time publication flag.
- `tests/privacy-safety.test.mjs` — expanded 15-test release/regression coverage.

All earlier privacy work and unrelated uncommitted files were preserved on the existing branch. Existing `vercel.json` security headers and route rewrite remain in place. No dependencies or lockfile changes were introduced.
