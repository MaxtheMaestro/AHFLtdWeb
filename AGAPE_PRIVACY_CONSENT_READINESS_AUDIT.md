# Agape Privacy & Consent Readiness Audit

**Audit deliverable only — no website implementation.**

- Organization: Agape Hope Foundation of Jamaica Ltd. (legal identity supplied in the brief; confirm exact registered name before publishing a notice).
- Audit date: 13 November 2026, America/Jamaica.
- Repository: [MaxtheMaestro/AHFLtdWeb](https://github.com/MaxtheMaestro/AHFLtdWeb); local checkout `/Users/jmaxr/AHFwebsite`, HEAD `7ca8d6e`.
- Public surfaces inspected: [production website](https://ahf-ltd-web.vercel.app/) and [public Tally form](https://tally.so/r/5BJ8aP).
- Overall classification: **Ready with prerequisites.** Documentation and configuration planning can proceed; final consent decisions and policy claims require the operational checks below.

## Executive Summary

The website processes visitor information even though no first-party analytics or advertising integration was found. Hosting receives page requests; Google Fonts is referenced automatically; Tally loads automatically and receives requests before a visitor submits a form. A first-party localStorage flag remembers that anniversary confetti has played. Public photographs and leadership profiles are also personal-data processing activities.

The most significant confirmed gap is the live form's transparency and its difference from the local preview. The public Tally form displayed required name, email, phone, parish and preferred contact method, plus optional additional information. It displayed no privacy notice, privacy link, ordinary processing consent checkbox or marketing checkbox. The heading about the reason for contacting the Foundation had no visible answer control in the inspected initial state. In contrast, the local preview contains conditional inquiry sections, an ordinary processing checkbox and a separate optional updates checkbox. Those preview controls do not establish protection for the live form.

No privacy policy page, cookie policy, terms page, privacy footer link, consent banner or preference interface was found in application source or the inspected production page. General descriptions explain that staff will review and respond, but do not describe retention, Notion transfers, international processing or privacy rights.

**Do not start by adding a mandatory “agree to the Privacy Policy” browsing popup.** A dedicated privacy notice and notices at collection are strongly indicated. A site-wide cookie consent banner is **conditional**, not established as necessary by this audit. First verify Tally's settings, third-party browser storage, optional tracking and applicable legal requirements. Prefer removing avoidable third-party requests and unnecessary storage before building a consent manager.

### Scope, method and confidence

**Confirmed-source** means observed in application/configuration files. **Confirmed-live** means observed in the public browser DOM/accessibility tree on the audit date. **Provider-documented** describes a provider's published capability, not the Foundation's configuration. **Unverified** identifies dashboard, network or organizational facts needing further evidence.

Reviewed all 25 source files, HTML entry point, public asset inventory, README, package manifest/lockfile, TypeScript/ESLint/Vite configuration, ignore rules, environment variable names/presence without disclosing values, and existing ignored distribution HTML/JS/CSS. The lockfile has 268 package entries; no tracking-related package names were identified. Repository-tracked `node_modules` contains 9,643 files; its presence is not itself a visitor integration, and this audit is not a full dependency source or vulnerability audit. Existing `dist` asset names match those referenced by the observed production DOM; that is corroboration, not proof that every deployed byte equals this checkout.

Public browser inspection read blank form structure and page resources only. No fields were filled, no form was submitted, no uploads were made, and no submissions or administration dashboards were accessed. The report omits personal contact values and individual profile details. No packages, builds, tests that write artifacts, application changes, configuration changes, commits or deployment actions were performed.

The web retrieval tool could not fetch the public site/form; a separate browser successfully rendered both. Direct HTTP header retrieval from the shell failed due to DNS restrictions. **No network HAR, HTTP response headers, HttpOnly cookies, partitioned third-party storage, storage lifetime or pre-submit payload capture was obtained.** DOM script lists do not enumerate all iframe requests or prove absence of tracking. Findings must not be represented as a clean runtime cookie scan or legal compliance certification.

### Evidence index

References below use stable audit IDs and checkout line numbers. Deployed behavior may change independently in Tally or Vercel.

| ID | Evidence |
|---|---|
| E01 | [package.json:12](/Users/jmaxr/AHFwebsite/package.json:12), dependencies through line 35; `package-lock.json` package inventory. React/Vite/Tailwind/Framer Motion and UI utilities; no identified analytics SDK. |
| E02 | [index.html:1](/Users/jmaxr/AHFwebsite/index.html:1), lines 1–21; local icons and one app module, English language and viewport metadata; no privacy or security-policy metadata. |
| E03 | [src/styles.css:1](/Users/jmaxr/AHFwebsite/src/styles.css:1), external Google Fonts import; reduced-motion CSS at lines 38–50. Existing distributed CSS retains the font import. |
| E04 | [src/config/forms.ts:34](/Users/jmaxr/AHFwebsite/src/config/forms.ts:34), lines 34–54; collection introduction, follow-up wording and build-time Tally provider configuration. [README.md:5](/Users/jmaxr/AHFwebsite/README.md:5) describes the local preview fallback. |
| E05 | [src/lib/forms/tally.ts:3](/Users/jmaxr/AHFwebsite/src/lib/forms/tally.ts:3), lines 3–50; iframe URL construction and asynchronous external script injection. |
| E06 | [src/components/domain/contact-form.tsx:16](/Users/jmaxr/AHFwebsite/src/components/domain/contact-form.tsx:16), lines 16–50; conditional provider branch, mount effect and iframe with real `src`, no lazy loading or consent gate. |
| E07 | [src/App.tsx:376](/Users/jmaxr/AHFwebsite/src/App.tsx:376), lines 376–428; contact section and unconditional mounting within the single-page app. |
| E08 | [src/components/domain/contact-form.tsx:55](/Users/jmaxr/AHFwebsite/src/components/domain/contact-form.tsx:55), lines 55–134; non-submitting preview handler, personal fields, ordinary consent and separate optional updates opt-in. |
| E09 | [src/components/domain/contact-form.tsx:138](/Users/jmaxr/AHFwebsite/src/components/domain/contact-form.tsx:138), lines 138–217; conditional assistance/volunteer/partnership/donation/outreach fields, upload controls and payment-data warning. |
| E10 | [src/components/domain/contact-form.tsx:221](/Users/jmaxr/AHFwebsite/src/components/domain/contact-form.tsx:221), lines 221–398; labels, fieldsets, radios, checkboxes and upload implementation. |
| E11 | [src/components/AnniversaryBanner.tsx:6](/Users/jmaxr/AHFwebsite/src/components/AnniversaryBanner.tsx:6), lines 6–7 and 44–58; one localStorage boolean and in-memory fallback. [src/config/anniversary.ts:1](/Users/jmaxr/AHFwebsite/src/config/anniversary.ts:1) enables the banner; E07 line 413 mounts it. |
| E12 | [src/config/site.ts:3](/Users/jmaxr/AHFwebsite/src/config/site.ts:3), lines 3–42; brand identity, old Framer URL, donation/contact anchors, public contact configuration and outbound social links. |
| E13 | [src/components/layout/footer.tsx:20](/Users/jmaxr/AHFwebsite/src/components/layout/footer.tsx:20), lines 20–58; navigation and labelled social links with `target="_blank" rel="noreferrer"`; no privacy links. |
| E14 | [src/data/content.ts:53](/Users/jmaxr/AHFwebsite/src/data/content.ts:53), lines 53–74, 201–236 and 239–320; same-origin photo paths, public profiles, captions, including an image description referring to children. [src/App.tsx:271](/Users/jmaxr/AHFwebsite/src/App.tsx:271), lines 271–335 publishes gallery and leadership content. |
| E15 | [src/components/ui/velaris.tsx:88](/Users/jmaxr/AHFwebsite/src/components/ui/velaris.tsx:88), lines 88–167; decorative WebGL sizing/drawing, no fingerprint extraction or transmission found; no App import/use found. |
| E16 | [vite.config.ts:1](/Users/jmaxr/AHFwebsite/vite.config.ts:1), lines 1–7; React/Tailwind plugins only. No repository Vercel, middleware, server/API or header configuration found. [.gitignore:1](/Users/jmaxr/AHFwebsite/.gitignore:1) ignores `dist/` and `.env.local`. |
| E17 | [src/components/layout/header.tsx:147](/Users/jmaxr/AHFwebsite/src/components/layout/header.tsx:147), lines 147–191; labelled mobile-menu toggle, expanded/control attributes. [src/components/ui/button.tsx:6](/Users/jmaxr/AHFwebsite/src/components/ui/button.tsx:6) includes focus styles. [src/hooks/use-prefers-reduced-motion.ts:3](/Users/jmaxr/AHFwebsite/src/hooks/use-prefers-reduced-motion.ts:3) reads a local media preference. |
| L01 | Confirmed-live: production DOM contains the application JS plus `https://tally.so/widgets/embed.js` and an iframe to `https://tally.so/embed/5BJ8aP?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`; no iframe loading/referrer-policy attribute. The rendered iframe title is changed to the public form title. |
| L02 | Confirmed-live: blank public Tally form, progress “Page 1 of 1”; required name/email/phone and radio inputs, parish marked required; optional additional-information textarea. No checkbox inputs/checkbox roles, privacy links or visible privacy notice. Inquiry heading has no visible corresponding control. Same structure appears inside production iframe. |
| L03 | Confirmed-live: full production accessibility tree/footer and link inspection show no privacy/cookie/terms links or consent/preferences UI. HTTPS page successfully rendered. |

## Current Website Data Flow

```text
Visitor opens website
  -> Vercel: page and same-origin JS, CSS, photographs, icons
     (request IP and transport/browser metadata; log handling unverified)
  -> Google Fonts: CSS request, then font resources as resolved by browser
     (automatic source dependency; complete runtime request list unverified)
  -> Tally iframe + parent-page embed helper: automatic, before submission
     (request metadata; form draft/analytics behavior depends on settings)
  -> Visitor completes form -> Tally submissions [submission not exercised]
     -> Notion internal records [Foundation-reported; connection unverified]
     -> Email notifications / Google Gmail follow-up [reported; mapping unverified]

Same-origin localStorage <- anniversary “already played” boolean
Visitor clicks social links -> Facebook/Instagram (no automatic social embed found)
Visitor chooses email/phone/WhatsApp follow-up -> communications providers
```

Tally is a direct visitor-to-provider integration, not a proxy through a Foundation API. The parent site does not construct a form-submission payload in the reviewed code. An external helper script executes in the parent page's context; the cross-origin iframe alone does not isolate that script. Under ordinary network operation, Tally receives requests before submission because both resources load on mount. Exact headers, identifiers and any draft-answer transmissions remain unverified.

The Notion/email arrows describe the reported intended operations, not repository-proven connections. No Notion API client, webhook, integration token, response database or submission storage backend was found. Notification emails, exports and downloaded files can create additional copies outside Notion. Each copy needs an owner, access rule, retention rule and deletion path.

Published photographs and profiles flow from repository/public assets to Vercel and every viewer. They are distinct from contact-form data and require their own publication justification, correction/removal process and, where relevant, child safeguarding review.

## Confirmed Technologies and Integrations

“International possible” is a review flag; it does not establish a particular storage country or transfer route. No Foundation-specific processing region or contractual adequacy assessment was verified.

| Service/technology | Purpose and evidence | Information it may receive | Automatic? / necessity | International processing; disclosure and safeguards |
|---|---|---|---|---|
| Vercel hosting/CDN | Serves the production site; L01/L03, hosting supplied in brief | Page/asset requests, IP and request metadata; platform security/log records depend on settings | Yes. Hosting necessary for the deployed service; analytics is a separate decision | Possible. Disclose hosting/security processing; verify contracts, subprocessors, logs, retention, locations, account access and optional observability features. |
| Tally form iframe | Contact/request collection; E04–E06, L01/L02 | Request metadata; entered/submitted contact fields and free text; drafts/identifiers depend on settings | Yes, even without visiting contact section. Necessary for current form workflow, not all browsing | Possible. Disclose form processing, recipient role and relevant transfers. Verify processor terms, actual settings, deletion, secondary integrations and security. |
| Tally embed helper JS | Embed loading/resizing; E05/L01 | Network metadata; parent-context access capability; actual collection requires runtime review | Yes. Convenience for embed behavior; alternative approaches exist | Include within Tally assessment; limit parent-page execution and review provider changes. |
| Google Fonts | Fraunces, Inter, Inter Tight; E03 | IP and normal request/browser metadata at resource delivery; precise headers and logs unverified | Source requests automatically; branding optional, system/self-hosted fonts possible | Possible. Disclose if retained; assess provider role/terms and transfer handling. No evidence establishes advertising use or cookies from this import. |
| Google/Gmail | Public email contact; E12; organizational use supplied by Foundation | Correspondence, sender/recipient details, attachments; notification content if configured | Contact link itself sends no message. Follow-up or notifications depend on workflow | Possible. Disclose operational communications; verify consumer Gmail versus managed Workspace, delegates, MFA, forwarding, retention and processor/controller terms. |
| Notion | Internal response management supplied by Foundation; no code integration found | Potential mapped form fields, free text, attachments/links, workflow notes and consent status | No direct visitor request found; dashboard automation may run on submission | Possible. Disclose confirmed sharing/storage workflow; verify database permissions, integration scope, contracts, residency, deletion and account plan. |
| Facebook / Instagram (Meta) | Outbound links, E12/E13 | Destination request metadata and account context after navigation; URL campaign/share parameters | Click only in reviewed code. Optional; no social SDK/pixel found | Possible. Explain external destinations; avoid implying Foundation controls destination tracking. Parent links use `noreferrer`. |
| WhatsApp / telecom providers | Live preferred-contact options, L02; preview E08 | Contact details and message content if staff use selected channel | No WhatsApp SDK, automatic request or direct chat link found; conditional staff workflow | Possible. Confirm WhatsApp use, business accounts/devices and disclosure. Preference for a response is not marketing consent. |
| Local photographs/icons | Same-origin public files, E02/E14 | Hosting receives asset requests; viewers receive published image/profile information | Yes/as images load. Publication content, not a remote image-host integration | Hosting transfer review plus publication permissions, especially children/beneficiaries; inspect metadata and unused public originals. |
| React / Tailwind / Framer Motion / UI libraries | Bundled local app/UI, E01 | No separate vendor-bound visitor telemetry found in reviewed app | Execute automatically as UI; do not infer vendor data disclosure merely from installation | No independent runtime provider sharing evidenced. npm registry/funding URLs in lockfile concern build tooling, not browser tracking. |
| Framer URL in site configuration | Historical `siteConfig.url`, E12 line 10 | No active request from this value found | No live use found; not evidence of a current Framer integration | Confirm canonical production identity before policy publication; do not list Framer as an active processor solely from this constant. |

Tally documents a processor agreement and a subprocessor list, including infrastructure and optional notification/upload services. That establishes matters to investigate, not that every listed subprocessor receives this form's data. Do not assert this Foundation's data stays in one jurisdiction based on a provider's general hosting statement. [Tally GDPR and subprocessors](https://tally.so/help/gdpr).

Notion documents permission-dependent sharing and security practices; these do not verify the Foundation's database settings. [Notion security practices](https://www.notion.com/help/security-and-privacy).

No direct Cloudinary, external image CDN, map embed, video embed, payment gateway, Microsoft SDK or other runtime service was found. Microsoft services are not established by the repository or supplied workflow; check them only if administrators actually use them. Potential Tally/Notion subprocessors are indirect providers, not confirmed first-party integrations.

## Cookies and Tracking Findings

| Technology | Execution / information / browser storage | Essential or optional | Consent implication and ability to prevent loading |
|---|---|---|---|
| Anniversary flag `agape-hope-anniversary-confetti-seen-v1` | E11 reads and writes localStorage automatically unless the reduced-motion/session checks skip it. Value is `true`, not a unique visitor ID; no timestamp or expiry and no transmission found. Existing dist contains this key. Runtime storage inspection not performed. | Cosmetic repeat-animation suppression; not essential to contact submission or public browsing | Do not call it a tracking cookie or strictly necessary by default. Document as local storage. Prefer in-memory behavior or remove persistence; if retained, assess applicable storage rules and set an appropriate lifetime. Can prevent read/write by changing this effect in future. No banner obligation established from this boolean alone. |
| Tally iframe | E06/L01 automatic real `src`; pre-submit metadata disclosure follows from the request. Cookies/localStorage/sessionStorage/IndexedDB/draft collection unknown inside provider origin. | Current form service is functional; loading it for every visitor before interaction is avoidable | Verify functional versus optional analytics/marketing. If consent required for optional processing, block iframe creation as well as helper JS until permission. An informed “Load contact form” action is a possible proportionate design, subject to legal review; lazy loading alone is not consent. |
| Tally helper script | E05/L01 runs automatically in parent page, without a consent check. No provider script source audit or payload capture completed | Embed enhancement; no evidence it is a tracking SDK | Can defer insertion. Script deduplication currently prevents duplicate tags, not unconsented execution. Removing a tag after execution cannot undo earlier requests or reliably unload behavior. |
| Google Fonts | E03 external stylesheet import in source and existing dist; expected automatic stylesheet/font requests. No app storage API associated with fonts found. Browser caching is not evidence of an identifier cookie. | Optional presentation resource | Remove external import/self-host or use system fonts to avoid request. If a reviewed basis requires consent, static CSS must be changed so requests are absent before choice. A JS banner cannot retroactively gate an already loaded CSS import. |
| Vercel infrastructure | Automatic HTTP processing; live headers/cookies/log retention not captured | Operational hosting/security; any optional analytics is separate | No blanket browsing consent recommended for ordinary hosting. Verify deployment-injected scripts, platform cookies and processing purpose before final classification. |
| Social links with campaign parameters | E12/E13; no resource request from link href alone; destination may track after click | Optional navigation | Not evidence of a site Meta Pixel. Consider clean stable destination URLs; disclose external links. Normally no site cookie panel is justified by plain outbound links alone. |
| Decorative/browser APIs | E15 uses WebGL/devicePixelRatio locally; E17 reads reduced-motion; header observes section positions | UI rendering/accessibility | No canvas readback, fingerprint hash, device identifier or reporting endpoint found. WebGL existence does not prove fingerprinting. Velaris is not used by App in this checkout. |

**Negative source findings:** no GA/GA4, GTM, Vercel Analytics/Speed Insights, Meta Pixel, Clarity, Hotjar, session recorder, ad/remarketing script, tracking image endpoint, telemetry/error-reporting SDK, fingerprint library, first-party `document.cookie`, `sessionStorage`, IndexedDB or service worker usage was identified. No first-party `fetch`, Axios, XHR, WebSocket or beacon submission code was found. These are scoped source observations, not claims about every provider, browser or platform setting.

**Critical verification distinction:** Tally can have settings absent from this repository. Its documentation describes built-in aggregate form insights without cookies and a separate configurable GA4 integration. Neither capability establishes this form's settings. Check analytics, pixels, custom code, bot protection, hidden fields, saved answers and partial submissions individually. [Tally Form Insights](https://tally.so/help/form-insights), [Tally GA4 integration](https://tally.so/help/google-analytics-integration), [Tally form settings](https://tally.so/help/form-settings), [Tally partial-submission feature announcement](https://tally.so/changelog).

There is no defensible cookie-name/lifetime inventory for Tally or Vercel from this audit. Do not invent one or claim “we use no cookies.” Browser storage and network tests must supply name, origin, purpose, value type, lifetime, trigger, third-party partitioning and deletion behavior without recording real visitor identifiers.

## Privacy Policy Gaps

No full proposed policy text was supplied, so this compares the requested twelve subject areas against observed behavior; it is not a redline of an existing policy. No existing privacy/cookie/terms document or link was found (E02, E07, E12/E13, L03). Do not adopt a provider's policy as the Foundation's own notice.

| Proposed subject | Required factual work / statements to avoid |
|---|---|
| 1. Information collected | Cover form data, request metadata, correspondence, public images/profiles, and any verified drafts/uploads/workflow notes. Avoid “only data you submit” because automatic third-party requests occur. Distinguish live fields from preview possibilities. |
| 2. Purposes | State inquiry response, assistance review, volunteering, donation coordination and actual operational use. Identify lawful processing conditions by purpose. The generic “review and follow up” wording is incomplete; do not authorize unrelated uses by a vague catch-all. |
| 3. Donations/payment information | Donate actions currently lead to contact (E12). No payment processor/card collection integration found. Preview contains a payment-data warning (E09 lines 191–193), but the inspected live form does not. Do not name Stripe/PayPal, claim secure online checkout, or promise sensitive payment data can never arrive in free text. Verify offline bank/payment records separately. |
| 4. Cookies/analytics | Describe anniversary localStorage accurately; separate hosting, fonts, form operations and optional analytics. Avoid both “no tracking of any kind” and listing uninstalled marketing tools as active. Unknown provider storage must be resolved before a definitive cookie table is published. |
| 5. Third-party sharing | Include verified Tally, Vercel, font delivery, communications and the actual Notion workflow; assess indirect processors. Avoid “we never share information” and unverified country/adequacy guarantees. |
| 6. Security | Describe verified organizational and technical controls at an appropriate level; provider marketing is not evidence of Foundation MFA/access rules. Avoid “100% secure,” blanket encryption claims or asserting headers that have not been checked. |
| 7. External links | Explain click-through Facebook/Instagram and email destinations and separate provider policies. Do not imply external sites are covered by Foundation controls. |
| 8. Children | Site serves young people and includes a photo description involving children (E14). No age/guardian workflow observed. Do not publish “we do not process children's information” without reconciling services, photographs and third-party referrals. Determine age-appropriate notices and guardian involvement with Jamaican advice; do not import an arbitrary overseas age threshold. |
| 9. Individual rights | Publish an accountable privacy contact, practical request route and identity-check procedure. Access, correction, objection/marketing and withdrawal handling need operational support. Do not promise an unconditional right to erase all records or instant deletion of provider backups. |
| 10. Retention | Establish purpose-specific periods or defensible criteria for Tally, Notion, email, uploads, exports, backups and public photos. No schedule is evidenced. Avoid inventing a universal period or claiming indefinite storage is necessary. |
| 11. Updates | Assign effective/version dates, owner and material-change review. A changed purpose may need new notice or consent assessment; merely updating a date cannot authorize new processing. |
| 12. Contact information | Confirm exact controller legal name, reliable organizational privacy contact and appropriate address details. Source branding varies and `siteConfig.url` points to an older Framer address (E12); do not reproduce that as the current privacy-site URL without confirmation. |

The existing assertion that the form only asks what the team needs (E07 line 386) needs substantiation, particularly where both email and phone are compulsory in the live form. The instruction to provide as much information as possible (E04 line 40) encourages unnecessary sensitive disclosures. Future wording should ask for relevant information and explain what not to send.

### Jamaican data protection readiness

This is a technical readiness assessment. The Foundation's management/privacy lead and qualified Jamaican adviser must determine applicable lawful conditions and any additional jurisdictional duties. The Act separates ordinary and sensitive-data processing conditions; a checkbox is not the sole possible condition for every activity. Direct marketing has its own rules. [Data Protection Act, 2020, sections 10 and 21–31](https://laws.moj.gov.jm/legislation/aop/2/7_2020-The%20Data%20Protection%20Act.pdf).

| Principle | Technical finding / prerequisite |
|---|---|
| Transparency and fairness | Missing live privacy notice and collection detail; disclose required/optional fields, recipients and relevant rights before collection. |
| Specified purposes / lawful processing | Basic response purpose exists, but document each operational purpose and legal condition; sensitive requests need separate review. |
| Minimization | Justify mandatory phone/email/parish; narrow free-text prompts and unnecessary duplicate parish fields in preview; use conditional collection. |
| Accuracy | Define correction procedures across Tally, Notion and communications; a preview accuracy checkbox is not an accuracy process. |
| Retention limitation | Approve a schedule and execute it across copies, attachments, trash and backups. |
| Security | Verify least privilege, MFA, processor contracts, logs, incident handling and production headers. |
| Individual rights | Assign ownership and procedures for requests, withdrawal, objections and lawful exceptions. |
| Direct marketing | No live opt-in observed; do not treat a request for help or selected contact method as permission for campaigns. Review whether planned messages fall within statutory marketing rules. |
| International transfers | Identify recipients, routes and protections; assess adequacy or applicable permitted transfer condition. A cookie choice or generic policy acceptance does not by itself establish valid safeguards. |
| Children | Review actual youth/referral/photo activity and guardian authority; avoid unnecessary proof-of-age collection. |

The OIC describes the standards and the need to assess overseas protection. This table translates them into project checks; it does not establish compliance. [OIC data protection standards](https://www.oic.gov.jm/page/data-protection-standards).

Separately, management should verify registration, whether a statutory DPO is required, applicable impact-assessment/reporting obligations and a breach response process. These are organizational prerequisites, not features a banner supplies. [OIC controller obligations](https://oic.gov.jm/content/what-are-obligations-data-controllers).

## Tally and Notion Findings

### Tally: direct answers to the requested checks

| Question | Finding and confidence |
|---|---|
| Integration method | **Confirmed-source/live:** cross-origin iframe plus external embed helper; not just a link or popup. E05/E06/L01. Local public form ID matches the supplied public form; no private value is needed in this report. |
| Automatic load | **Confirmed-source/live:** contact mounts in initial app; iframe has `src` and no lazy/consent gate; effect inserts helper script immediately. Scrolling is not required by the source. |
| Cookies/storage | **Unverified:** provider storage/cookies were not inspected. Source has no first-party Tally cookie calls, which says nothing conclusive about iframe internals. |
| Information before submission | **Confirmed architecture:** network metadata accompanies automatic resource requests. **Unverified:** exact data fields, provider analytics, saved answers, partial submissions or other pre-submit collection. |
| Notice before submission | **Confirmed-live:** no privacy notice/link visible on standalone blank form or embedded form. Parent page has only broad response-purpose wording. |
| Collection purposes | **Partial:** parent introduction explains assistance/contact and follow-up. No comprehensive purpose/recipient/retention explanation inside inspected form. |
| Notion disclosure | **Confirmed absence in inspected source/live text:** no visible notice of transfer to Notion. Actual connection unverified. |
| Consent checkboxes | **Confirmed-live:** none in inspected one-page form. **Confirmed-source:** required processing/accuracy checkbox exists only in preview, E08 lines 120–124. Absence of a checkbox alone is not a legal conclusion about every lawful basis. |
| Marketing separated | **Preview only:** unchecked optional updates checkbox, E08 lines 125–128; future-volunteer-contact question at E09 line 162. **Live:** neither visible; no marketing collection/activity established. No use of inquiry contacts for campaigns should be presumed authorized. |
| Necessary information | **Needs justification:** live phone mandatory along with email; parish/contact-method marked mandatory. Preview phone/parish optional. Prefer necessary contact channel and purpose-relevant location. No need established for every contact to give all channels. |

### Field inventory and source/live mismatch

| Category | Inspected live form | Local preview only / matters to verify |
|---|---|---|
| Basic identity/contact | Full name, email, phone, parish, preferred contact method shown as required | Name/email required; phone/parish/contact method optional in JSX. Verify actual Tally validation without production submission. |
| Inquiry reason | Heading visible with no corresponding choice control in initial DOM | Nine inquiry options drive conditional sections. Verify broken/hidden/deleted Tally block or logic; do not assume reasons are collected structurally. |
| Free text | Optional additional-information textarea | Many narrative fields for assistance, urgency, skills, proposals, needs and messages. Free text can disclose health, religion, family circumstances or someone else's personal information. |
| Files | No upload control visible in inspected initial live form | Optional assistance/outreach uploads exist in preview; not evidence that production collects files. Verify conditional logic/settings. |
| Consent | No consent/marketing checkbox visible | Required processing plus accuracy wording; separate optional updates; no recorded evidence or transmission in fallback. |
| Payment | No payment input/control observed | Donation coordination questions and warning, not payment processing. |

The live form was observed without entering data or changing choices; undisplayed dynamic content cannot be ruled out. Its one-page initial state materially differs from the preview and warrants dashboard review before policy drafting is finalized.

**Preview false-success risk:** E08 lines 60–65 prevent default submission, reset fields and show success; E04 lines 41–43 say information was received. There is no actual send or persistence in that branch. If the production build ever loses its Tally ID, visitors could receive an inaccurate receipt message and believe a request reached the Foundation. Keep preview-only functionality out of a production intake flow or present a truthful unavailable/alternative-contact state in a future change.

**Data minimization and sensitive data:** ordinary contact details have an evident response purpose, but compulsory full name plus both communication channels and parish need a purpose-specific rationale. Additional information should be bounded, with warnings against payment credentials, identity documents and unnecessary sensitive details. A request about someone else needs an authority/notice assessment. Do not treat voluntary typing as unlimited consent.

If uploads become active, verify file types/size limits, malware handling, access controls, attachment URL permissions, metadata and deletion. The preview file inputs specify no `accept` restriction and no application upload service; that is not proof of insecure production storage. Tally documents that exported upload URLs can provide access to files; review the actual distribution of such links rather than relying on Notion page privacy alone. [Tally file uploads](https://tally.so/help/file-uploads).

### Notion: confirmed versus operational unknowns

**Confirmed:** no Notion SDK, token reference, destination database, backend forwarding code, retention job or deletion procedure was found in application source/configuration. The Foundation reports using Notion. This can be configured entirely outside the website.

**Not confirmed:** whether the transfer is Tally's native integration, webhook, automation platform or manual entry; whether it is currently enabled and reliable; which database/properties receive which fields; whether files are copied or linked; who can access records; whether integration scopes reach other pages; whether consent choices sync; or how updates/deletions propagate.

Potential stored categories include live contact details, free text and workflow notes; conditional assistance information, uploads and marketing preferences remain possibilities to verify. A native connection is only one possible mechanism. Do not list Zapier/Make as actual providers without evidence.

Administrators should inspect configuration/schema and permissions without opening actual records for this audit: target database, mapping, integrations, connected identities, inherited permissions, guests, public sharing, exports, notifications, retention and deletion. Full checklist appears below. Vendor platform security does not establish that a database is private or that a deleted Tally response disappears from Notion.

## Security and Accessibility Findings

### Confirmed strengths

- Production was accessible over HTTPS; Tally and Google Fonts source URLs use HTTPS. No mixed-content URL found in app configuration. This does not verify redirect behavior, HSTS or every provider subrequest.
- Public images/icons use same-origin paths; no remote image-host SDK found. No credentials or private integration tokens identified in reviewed frontend source. Local environment file is ignored/untracked; inspected configuration contained the public Tally form reference. A public form ID is not an API secret. Future `VITE_` values must be treated as public client configuration.
- Social links have accessible names and `rel="noreferrer"`, which also supplies opener isolation in modern browsers; absence of the literal `noopener` is not reported as an exploitable vulnerability. E13.
- Source iframe has a title, preview inputs have associated labels, section fieldsets/legends and semantic checkboxes, buttons include focus styles, and responsive classes support mobile layouts. E06/E10/E17.
- Reduced-motion handling exists in CSS and a hook. Animation timing on first mount still deserves testing because the hook initially returns false. No comprehensive motion/accessibility conformance claim is made.

### Gaps affecting privacy/consent work

| Area | Evidence / implication | Future action |
|---|---|---|
| Security response headers | No CSP meta or repository header config, E02/E16; live HTTP headers unavailable | Verify CSP, HSTS, Referrer-Policy, X-Content-Type-Options, frame restrictions and Permissions-Policy in production. Source absence is not proof of absent platform headers. |
| External script trust | Tally helper executes on parent origin context; no integrity, nonce or error handler specified, E05 | Assess necessity and provider change risk; test an appropriate CSP initially in report-only mode. Avoid broad wildcards; inventory frame/script/style/font/connect sources. Do not blindly pin a mutable vendor script to an integrity hash. |
| Framing/referrer | Iframe lacks sandbox, explicit referrer policy and loading controls, E06/L01 | Review a restrictive compatible policy, test Tally features/resizing, and evaluate click-to-load. No sandbox is not automatically a vulnerability; do not break required form functions by adding arbitrary flags. Parent frame restrictions protect this site from embedding; `frame-src` controls its child frames. |
| Failure handling | Helper has only `onload`, no failure/retry path; iframe has no visible load-failure alternative, E05/E06 | Provide a truthful fallback contact route, bounded retry and accessible status. Blocking third-party scripts must not lose a visitor's request or consent choice. |
| Preview receipt | Local fallback claims receipt without transmitting, E08 | Prevent use as real production intake; preserve truthful availability/error messaging. |
| Group semantics | Preview RadioGroup uses a paragraph plus div rather than its own fieldset/legend or labelled group, E10 lines 329–365 | Give each radio group a programmatic group name. Individual options are labelled; group labeling remains incomplete. |
| Success/error announcement | Preview success replaces form without status/live region or explicit focus move, E08 lines 68–78 | Announce outcomes accessibly and manage focus; live Tally includes status/alert nodes, but actual validation/submission announcements were not exercised. |
| Mobile and keyboard | Responsive markup and labelled controls observed; no exhaustive keyboard/screen-reader/mobile run | Test iframe focus boundaries, errors, dropdown, zoom/reflow, preference dialog focus return and no keyboard trap. No WCAG pass is asserted. |
| Sensitive uploads/content | E09/E14; child-related photo description; unused image variants/originals in public inventory | Verify publication permissions/guardian process, image metadata and all publicly served originals, not just visible gallery images. Establish takedown and file controls. No unauthorized publication is established. |

CSP is a defense against unauthorized resource loading, not a replacement for consent or safe provider configuration. Vercel recommends report-only testing before enforcement; report endpoints themselves must avoid collecting unnecessary personal information. [Vercel CSP guidance](https://vercel.com/docs/cdn-security/security-headers).

This audit did not run an exploit scanner, dependency vulnerability service or real submission test. It identifies relevant controls and uncertainties, not a penetration-test result.

## Risk Register

Severity describes practical priority/potential impact, not a determination of statutory breach. Unknown configurations are explicitly labelled; none is asserted to be a confirmed data leak. **No Critical issue was established.**

| ID | Description | Severity | Evidence | Impact | Recommended action |
|---|---|---|---|---|---|
| R01 | Missing controller privacy notice and accessible link | High | E02/E07/E13; L02/L03 | Visitors lack a clear account of collection, recipients, retention and rights | Approve accurate notice, publish a dedicated page and permanent footer link; add collection notices. |
| R02 | Live Tally lacks visible collection notice; preview consent controls are absent live | High | E08 versus L02 | Local implementation can create false confidence; consent-dependent purposes lack observed controls/evidence | Audit published Tally configuration; determine lawful conditions; add appropriate notices and separate optional opt-ins where needed. |
| R03 | Sensitive information/third-party or child information can enter free text; safeguards unverified | High | E04 line 40, E09, L02 | Unnecessary high-impact data may enter broad-access workflows | Narrow prompts, limit collection, review sensitive-data/guardian handling and restrict response access. |
| R04 | Notion/email transfer, permissions, retention and deletion not evidenced | High | Foundation-reported workflow; no integration code | Potential excess copying/access and incomplete rights/deletion handling | Verify mappings, private access, MFA, notification content, schedule and cross-system procedures. |
| R05 | International routes/contracts/safeguards unverified | High | Tally/fonts/hosting plus reported Notion/Gmail | Unsupported geographic claims or transfers lacking assessed protection | Record providers/subprocessors, locations, purposes, contracts and adviser-reviewed transfer basis. |
| R06 | Tally loads for all visitors before form interaction; internal tracking/drafts unknown | Medium | E05–E07; L01 | Avoidable metadata disclosure; potential optional activity before consent if enabled | Inspect settings/network; remove optional trackers or gate required resources when justified; consider explicit form loading. |
| R07 | Live mandatory phone/email/parish and missing visible inquiry choice differ from preview | Medium | E08/E09 versus L02 | Unnecessary contact data and incomplete purpose/triage collection | Justify required fields by purpose, repair live form mapping/logic and verify published state. |
| R08 | Preview can show false submission success if provider is missing | Medium | E08 lines 60–73; E04 | Lost assistance requests and misleading receipt notice | Require a configured live provider or truthful fallback in production. |
| R09 | No live marketing opt-in observed; campaign operations unknown | Medium | L02; preview E08/E09 | Risk of reusing inquiry contacts for campaigns without valid permission | Verify no unauthorized reuse; add purpose/channel-specific optional consent and withdrawal records if marketing begins. |
| R10 | Google Fonts creates an avoidable external dependency | Medium | E03; existing dist CSS | Visitor metadata exposure and extra transfer/disclosure work | Prefer self-hosted/system fonts; otherwise document and assess processing. |
| R11 | Production header posture and third-party script controls unverified | Medium | E02/E05/E16; header retrieval unavailable | Weak controls could expose future preference UI to injection or framing risks | Verify live headers, constrain sources and test CSP/failure behavior. |
| R12 | Published profile/beneficiary/child-image permissions and metadata unverified | High | E14; public asset inventory | Publication may expose vulnerable individuals if authority/safeguarding is inadequate | Verify permission records, necessity, metadata, unused originals and removal procedure; no current misuse established. |
| R13 | Anniversary localStorage has no expiry and is cosmetic | Low | E11 | Undisclosed, unnecessary persistence; inaccurate “no storage” statements | Remove persistence or define bounded lifetime and accurate disclosure. |
| R14 | Form grouping, outcome announcements and embed failure handling incomplete in source | Medium | E05/E06/E08/E10 | People may struggle to exercise choices or know whether a request succeeded | Add accessible semantics, focus/status handling and reliable alternatives in future implementation; test live form separately. |
| R15 | Controller branding/canonical URL needs confirmation | Low | E12 versus supplied identity/current production URL | Wrong entity or website details could make a notice misleading | Management confirms legal name, contact ownership and current URL before publication. |

## Consent Mechanism Decision

| Mechanism | Classification | Decision |
|---|---|---|
| A. Cookie consent banner | **Conditional on technologies or processing activities** | No optional analytics/ad cookies were established in the app. Anniversary localStorage alone does not establish a Jamaican banner duty. Verify provider storage, Tally integrations and legal scope. If consent-requiring optional tracking is enabled, gate it by default or remove it. |
| B. General privacy information banner | **Recommended as a best practice only where useful** | A short non-blocking announcement may draw attention to a new notice. It does not replace collection notices or require browsing acceptance. No current evidence requires a site-wide acknowledgement banner. |
| C. Dedicated Privacy Policy/Notice page | **Required or strongly indicated by confirmed findings — strongly indicated** | Automatic provider processing, published personal content and a live intake form warrant accessible controller transparency. A dedicated page is the recommended delivery method, not a claim that legislation prescribes a particular route name. |
| D. Privacy notice beside/in Tally form | **Required or strongly indicated by confirmed findings — strongly indicated** | Live collection is confirmed and notice absent. Put concise information before collection and a full-policy link on the parent site and within standalone Tally; important information should precede entry, especially if drafts can be captured. |
| E. Optional marketing checkboxes | **Conditional on actual marketing** | If updates/campaigns/future-opportunity messages require opt-in, use separate unchecked choices and keep service requests independent. No live opt-in is evidenced and no current campaign is confirmed. A preview checkbox is insufficient. |
| F. Privacy preference manager | **Conditional; not currently necessary as a large standalone system** | Needed if persistent choices control optional resources. With avoidable dependencies removed and no optional tracking, a notice, appropriate form choices and rights contact can suffice. Do not create empty categories or meaningless switches. |

Consent to particular processing, acknowledgement of a notice and acceptance of legal terms are different actions. Do not force agreement to an entire policy to read a public website or bundle marketing permission into an assistance request. A necessary operational purpose still needs a valid legal condition and transparency; calling a tool “functional” is not an exemption from all privacy obligations.

## Recommended Future Architecture

**Planning only; no implementation accompanies this audit.** Two proportionate paths are available.

**Preferred minimal path:** publish the notice and permanent link; configure the actual Tally form; resolve operational retention/access/transfers; self-host or replace remote fonts; remove cosmetic persistent storage; disable unneeded tracking/draft capture. Consider a concise informed load-form control with an external-form/email alternative. If verified processing needs no optional browser choices, do not add a consent database or generic preference dashboard.

**Conditional consent path:** if optional tracking or optional embeds remain and consent is the approved condition, use a small React consent provider and resource loader, styled with existing Tailwind components, with no new service required for browser preferences.

| Concern | Proposed design |
|---|---|
| State model | Separate unknown/unset, denied and granted states for actual purposes; distinguish necessary operations from optional analytics/marketing/embeds. Do not add fictional categories. Optional categories default denied on first render, SSR/static HTML, reload and error. |
| Preference storage | A namespaced localStorage record can hold schema version, purpose choices, notice/consent version, saved-at and expires-at. No name/email, form text, IP, advertising ID or unique cross-site identifier. Handle blocked/malformed storage safely. |
| Versioning | Separate schema changes from material purpose/vendor changes. Preserve only choices valid for the current version; default-deny changed purposes until a fresh choice. A minor wording change does not automatically justify repeated consent prompts. |
| Expiry/re-consent | Choose a documented review interval proportionate to processing and legal advice; no universal Jamaican expiry period is asserted. Revisit material changes and expired choices without nagging rejected visitors. Deleting browser data resets that browser only. |
| Loading controls | Ensure optional resources are absent before permission: iframe `src`, script insertion, tracking pixels, CSS imports, preload/preconnect links and provider initialization. Centralize loading and deduplication. Audit provider-internal scripts; a parent site's stored choice is not automatically understood by Tally. |
| Tally control boundary | Parent-page gating can block the whole iframe/helper. To retain a functional form while denying optional in-frame analytics, disable/configure those features in Tally or use a verified supported control. Never assume a parent localStorage flag suppresses cross-origin tracking. |
| Withdrawal | Permanent footer “Privacy settings” access if choices exist; rejection as easy as acceptance. Stop future optional requests, invoke supported teardown/opt-out, clear own optional identifiers where appropriate and reload safely if necessary. Do not promise reversal of prior disclosure or deletion of third-party cookies inaccessible to the parent origin. |
| Accessibility | Real buttons/labels, clear descriptions, equally understandable accept/reject/manage options, no preselected optional permission. A modal needs a name, initial focus, keyboard containment, Escape behavior and focus return; a non-modal banner must not trap focus. Announce saved choices without disruptive focus jumps. |
| Mobile/performance | Small responsive panel, usable targets, scrolling at high zoom, no content obstruction; avoid rendering optional providers until needed. Keep privacy UI local so a provider outage does not prevent rejection. |
| Multi-tab/failure behavior | Synchronize changed preferences through storage events where available; keep in-memory choices if storage fails and explain persistence limits. Unknown/expired/corrupt values must not enable optional processing. |
| Security | Treat localStorage as visitor-editable preferences, not authentication or proof. Validate stored schema; never put secrets in Vite variables or browser storage. Test a compatible CSP and minimize third-party parent-context scripts. |
| Recordkeeping | Keep marketing permission and any other legally necessary evidence in the form/operational record: affirmative choice, purpose/channel, timestamp, source, notice wording/version and withdrawal status. Minimize evidence; collecting IP or user-agent is not automatically necessary. |

**Is localStorage sufficient?** Yes for remembering a browser's optional resource choices without an application database, provided default-deny and loading controls actually enforce them. It is editable, device/browser-specific and lost when cleared, so it does not reliably prove that a particular person gave marketing or sensitive-processing consent. Where evidence is needed, retain an appropriate consent record through the existing Tally/Notion workflow after verifying secure mapping and retention. Do not build a new backend solely to log every public visitor's banner click. Browser withdrawal and withdrawal of a person's marketing permission are separate workflows; support both where applicable.

Ordinary form processing should use the adviser-approved lawful condition and accurate notice; do not mechanically copy the preview's mandatory combined accuracy/consent wording. If processing consent is necessary, specify the purpose and consequences without requesting unnecessary uses. Marketing choices should identify intended channels and not be prechecked or required for assistance.

## Implementation Roadmap

### Phase 1: Privacy documentation and transparency

1. Management confirms controller identity, privacy contact, purposes, lawful conditions, youth/sensitive-data handling and publication authority.
2. Administrators inventory actual Tally → Notion → email/other copies, permissions, retention and international routes/contracts. Resolve high-priority gaps R03–R05/R12 before making policy assurances.
3. Draft and approve a notice reflecting verified behavior, including hosting/fonts/form operations and public media. Specify periods or clear retention criteria, rights process and external links.
4. Publish a dedicated accessible notice and footer link in a future authorized implementation; confirm direct-link loading and mobile readability. No browsing agreement gate.

### Phase 2: Form notices and consent controls

1. Repair and verify the published Tally form against an approved field inventory; justify mandatory fields and the missing inquiry control.
2. Add a concise notice before data entry to both standalone Tally and the parent contact section, including recipient/workflow information and policy link. Limit free text and clarify prohibited sensitive/payment details.
3. Disable unnecessary partial capture/analytics; add separate optional marketing controls only if campaigns exist. Verify recorded wording/version and choices map to Notion without expanding access.
4. Establish reliable form availability/failure messaging and prevent false preview receipts in production. Confirm deletion, correction and withdrawal ownership.

### Phase 3: Cookie preferences, if needed

1. Complete clean-browser runtime inventory and legal assessment. Remove avoidable font requests/cosmetic persistence where practical.
2. If optional consent-dependent resources remain, implement default-deny resource loading and proportionate choices with permanent settings access; otherwise document why no banner is used.
3. Coordinate Tally internal tracking settings with the parent site's controls. Record versions and appropriate expiry without unnecessary visitor identifiers.

### Phase 4: Testing and verification

1. In an authorized test form/staging environment, test every conditional branch with synthetic data, opt-in/opt-out independence, notices, receipt, validation and downstream mapping. Do not use actual submissions for testing.
2. Inspect clean-browser network and all relevant origin storage before interaction, after form loading, after rejected/accepted choices, withdrawal, reload, expiry and corrupted/blocked storage. Verify the optional-resource default is enforced at the request level.
3. Verify production HTTPS redirects/headers, parent/child frame controls, direct privacy-page URLs, provider failure behavior and minimized logging.
4. Test keyboard and screen reader, mobile/zoom, reduced motion, focus/status/error announcements and iframe transitions. Test rights/deletion procedures across systems with synthetic records and provider backup limitations.
5. Obtain management/privacy-adviser review and retain a dated provider/settings inventory. Re-audit when Tally, deployment settings, campaigns or providers change.

## Manual Verification Checklist

Use configuration/schema views and test records; do not export or circulate real form submissions as audit evidence. Record the responsible owner and dated result for each item, with redacted evidence where needed.

### Vercel and deployment owner

- [ ] Confirm production project/domain, deployed commit and Tally form ID; compare source with the actual published bundle.
- [ ] Check Analytics, Speed Insights, toolbar/preview injection, integrations, observability, security/bot features and any platform-injected scripts. Distinguish production from preview deployments.
- [ ] Inspect production response headers: CSP/report-only, HSTS, Referrer-Policy, nosniff, frame protections and Permissions-Policy. Verify HTTP → HTTPS without bypassing certificate warnings.
- [ ] Inventory cookies/headers added by hosting or security features; document purpose, retention and consent classification.
- [ ] Verify request/log metadata, available retention settings, access/export permissions and whether logged URLs could expose form data. Keep personal data out of query strings.
- [ ] Review project/team access, MFA, deployment permissions, environment variables and secret scope; no private API tokens in public `VITE_` values.
- [ ] Confirm provider terms/DPA, subprocessors, processing/support locations, breach contacts and applicable transfer safeguards. Do not infer these from the domain suffix.
- [ ] Decide privacy-page routing and verify refresh/direct navigation under static hosting.

### Tally administrators

- [ ] Confirm ownership and published form `5BJ8aP`; review published versus draft structure and all conditional blocks without inspecting submission rows.
- [ ] Investigate why the inquiry heading lacks an input and why preview conditional sections/consent controls are not visible live.
- [ ] Verify required name/email/phone/parish/contact-method settings; justify necessity and offer only needed contact channels.
- [ ] Verify notices are displayed before collection on standalone and embedded form; name purposes, controller, recipients including the actual Notion workflow, required/optional information, retention and rights route.
- [ ] Review GA4, Meta Pixel, custom code, third-party embeds, bot/CAPTCHA tools, redirects, hidden fields and URL prefill/tracking settings. Record active providers only.
- [ ] Review built-in form insights, saved answers, duplicate-prevention identifiers and **partial submissions** separately. Determine whether answers leave the device before Submit, why, and what notice/control is needed; do not enable them for this audit.
- [ ] Check actual cookies/localStorage/sessionStorage/IndexedDB and expiration from a clean browser, including standalone Tally and embedded/partitioned contexts. Include third-party-cookie-blocked browsers.
- [ ] If marketing exists, verify unchecked, separate optional consent, purpose/channel wording, timestamps/versions, downstream mapping and withdrawal; ordinary help requests remain independent.
- [ ] Review upload settings if present: limits, malware protections, link accessibility, metadata and who receives copies/URLs. Verify with a non-sensitive test file only in an authorized test environment.
- [ ] Review all integrations, webhooks, automation services and their credentials/scopes. Identify exactly what transfers to Notion and which failures/retries are logged.
- [ ] Review notification recipients, message bodies, attachments, confirmation emails and forwarding; avoid broadcasting full sensitive narratives.
- [ ] Set/document retention and deletion procedures, trash/backups, export copies and plan-dependent automation capabilities. Obtain current vendor terms and limitations rather than promising instant erasure.
- [ ] Verify MFA/collaborators, account recovery, integration owners, processor agreement and support/incident procedures.

### Notion administrators

- [ ] Identify the actual receiving database, connection method and owner; note any intermediary as an additional provider.
- [ ] Review schema and per-field mappings, timestamps/identifiers, free text, upload links, consent wording/version and internal notes without opening real records for this audit.
- [ ] Review direct/inherited permissions, teamspace defaults, workspace members, guests, groups, public-web publishing and link sharing. A filtered database view is not sufficient evidence of row-level isolation.
- [ ] Restrict the integration to necessary pages/databases and capabilities; verify account MFA, offboarding, recovery and periodic access review.
- [ ] Review search, AI features, automations, third-party connections, exports and notification copies for unintended access or processing; no such feature is assumed enabled.
- [ ] Approve retention by category/status, including rejected requests, volunteer records, consent evidence and attachments; assign a deletion owner and schedule.
- [ ] Test correction/deletion propagation across Tally, Notion, email, exports and attachment hosts using synthetic records; account for trash, history/backups and any re-import/retry that recreates records.
- [ ] Review available audit logs, plan-dependent controls, contracts/DPA, subprocessors and actual residency settings; do not assume an enterprise feature is available or configured.
- [ ] Document incident response, access-request retrieval, identity checks and marketing suppression without retaining unnecessary sensitive evidence.

### Google/Gmail and other communication owners

- [ ] Determine consumer Gmail versus Workspace, account ownership/delegation, MFA, recovery methods, shared-device use and offboarding.
- [ ] Check notification bodies, mailbox rules, forwarding, third-party OAuth access, downloaded attachments, shared drives and retention/deletion options actually in use.
- [ ] Verify whether WhatsApp, mobile phones, Microsoft 365 or other tools hold request data; if used, add them to inventory, access controls, retention and transfer review. Microsoft is currently unconfirmed.
- [ ] Separate inquiry/assistance correspondence from campaigns; maintain consent evidence and an effective withdrawal/suppression process if marketing occurs.
- [ ] Ensure the published privacy contact is monitored and rights requests are assigned rather than lost among general inquiries.

### Management/privacy lead and publication owner

- [ ] Approve exact registered identity/contact and the current website URL.
- [ ] Document each purpose, appropriate processing condition and any additional sensitive-data condition with Jamaican privacy advice; assess marketing and any other jurisdictional duties.
- [ ] Verify international transfer routes/protections and processor contracts; do not substitute generic policy acceptance for an actual assessment.
- [ ] Verify registration and applicable DPO/impact-assessment/reporting duties with the OIC/adviser; appoint an accountable operational privacy contact.
- [ ] Approve child/referral handling, guardian/representative authority where relevant, photo permissions and beneficiary safeguarding; inspect unused public image originals and metadata.
- [ ] Define retention, rights handling, proportionate identity verification, corrections, withdrawal, exceptions, complaints and incident response; train people who access records.
- [ ] Validate donor/offline payment workflows before describing them; do not use the public contact form for banking/card credentials.

### Browser verification owner

- [ ] Capture a redacted origin/resource inventory for initial page load, contact scroll, explicit form loading, ordinary interaction and pre-submit state; no real personal data or production submissions.
- [ ] Record actual storage names/origins/purposes/lifetimes and HttpOnly/partitioned cookies using appropriate browser tools; a parent `document.cookie` check alone is insufficient.
- [ ] Test no-consent/reject/accept/withdrawal/reload/new tab/expiry/corrupt or blocked storage and verify denied optional domains receive no request, including CSS/preconnect and iframe requests.
- [ ] Verify privacy links/notices in standalone Tally, iframe and mobile layout; keyboard/screen-reader operation, radio group names, validation and form-unavailable state.

## Final Readiness Assessment

**Ready with prerequisites.** The existing React/Vite structure is small enough for proportionate privacy documentation and, if justified, lightweight preferences without an application database. HTTPS resources, same-origin images, labelled controls, separate optional preview marketing consent and lack of identified first-party trackers are useful starting points.

Before final implementation decisions, resolve live Tally/preview mismatch; establish actual Tally-to-Notion/email processing, permissions, retention and transfer protections; verify provider cookies/tracking and hosting headers; and approve controller identity, lawful purposes and child/sensitive-data procedures. Until then, definitive statements about “no cookies,” storage locations, consent evidence, deletion or legal compliance would be unsupported.

**Implement first:** accurate privacy documentation and permanent access, then notices and minimized fields in the actual published Tally form, backed by operational controls. **A mandatory general privacy-consent popup is not justified by the findings.** A cookie banner/preference panel becomes justified only if verified optional processing and the applicable legal assessment require consent; removal of unnecessary processing may avoid that complexity entirely.

This Markdown report is the sole new project file produced by the audit. Application source, dependencies, environment files and deployment configuration are unchanged.
