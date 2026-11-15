import { lazy, Suspense, useEffect } from "react"
import { policyPublished, privacyPolicy, privacyRelease, type PrivacyPolicy } from "../config/privacy"
import { siteConfig } from "../config/site"
import { Header } from "../components/layout/header"
import { Footer } from "../components/layout/footer"
import { Container } from "../components/ui/container"

// The literal build flag lets Vite omit the entire content chunk from held
// production builds. A local development preview never enables publication.
declare const __PRIVACY_POLICY_RELEASED__: boolean
const Policy = import.meta.env.DEV || __PRIVACY_POLICY_RELEASED__ ? lazy(async () => {
  const { privacyPolicySections } = await import("../content/privacy-policy")
  return { default: () => <PolicyDocument policy={{ ...privacyPolicy, sections: privacyPolicySections }} /> }
}) : null

export default function PrivacyPolicyPage() {
  return <div className="min-h-screen bg-muted text-foreground">
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-card focus:bg-white focus:p-4">Skip to policy</a>
    <Header homeLinks />
    <main id="main-content" className="py-8 sm:py-12" tabIndex={-1}>
      <Container className="max-w-5xl">
        <a href="/" className="inline-block py-3 font-bold text-primary underline">← Back to homepage</a>
        {Policy ? <Suspense fallback={<p role="status">Loading policy…</p>}><Policy /></Suspense> : <>
          <h1 className="mt-6 font-display text-4xl font-bold">Page unavailable</h1>
          <p className="mt-4 leading-7">For privacy questions, email <a className="underline break-words" href={`mailto:${privacyPolicy.contactEmail}`}>{privacyPolicy.contactEmail}</a>.</p>
        </>}
      </Container>
    </main>
    <Footer homeLinks />
  </div>
}

function PolicyDocument({ policy }: { policy: PrivacyPolicy }) {
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])
  const formatDate = (value: string) => new Intl.DateTimeFormat("en-JM", {
    timeZone: "UTC", year: "numeric", month: "long", day: "numeric",
  }).format(new Date(`${value}T00:00:00Z`))
  return <article className="mt-4 rounded-image border border-border bg-white p-5 sm:p-10 lg:p-12">
    {import.meta.env.DEV && !policyPublished ? <aside aria-label="Publication status" className="mb-6 rounded-card border border-primary bg-muted p-4 text-sm leading-6">
      <p className="font-bold text-primary">Approved policy — development preview</p>
      <p className="mt-2">Prepared for manual release on {formatDate(privacyRelease.notBefore)}. This preview does not publish the policy or enable production links.</p>
    </aside> : null}
    <h1 className="font-display text-4xl font-bold sm:text-5xl">Privacy Policy</h1>
    <p className="mt-4 font-semibold">{policy.organization}</p>
    <dl className="mt-4 grid gap-2 text-sm leading-6 sm:grid-cols-3">
      <div><dt className="font-bold">Effective date</dt><dd>{policy.effectiveDate ? <time dateTime={policy.effectiveDate}>{formatDate(policy.effectiveDate)}</time> : "Awaiting confirmation"}</dd></div>
      {policy.lastUpdated ? <div><dt className="font-bold">Last updated</dt><dd><time dateTime={policy.lastUpdated}>{formatDate(policy.lastUpdated)}</time></dd></div> : null}
      <div><dt className="font-bold">Version</dt><dd>{policy.version}</dd></div>
    </dl>
    <nav aria-label="Privacy Policy contents" className="my-8 rounded-card bg-muted p-5 sm:p-6">
      <h2 className="font-display text-2xl font-bold">Contents</h2>
      <ol className="mt-4 grid list-decimal gap-x-8 gap-y-3 pl-5 md:grid-cols-2">
        {policy.sections.map(section => <li key={section.id}><a className="underline decoration-primary/40 underline-offset-4 hover:text-primary" href={`#${section.id}`}>{section.title}</a></li>)}
      </ol>
    </nav>
    {policy.sections.map((section, index) => <section key={section.id} id={section.id} className="mt-9 scroll-mt-28 border-t border-border pt-7">
      <h2 className="font-display text-2xl font-bold sm:text-3xl">{index + 1}. {section.title}</h2>
      {section.paragraphs.map((text, i) => <p key={i} className="mt-4 leading-7 text-foreground/85">{text}</p>)}
      {section.bullets ? <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-foreground/85">{section.bullets.map(text => <li key={text}>{text}</li>)}</ul> : null}
      {section.id === "changes-contact" ? <dl className="mt-5 grid gap-3 break-words text-sm leading-6">
        <div><dt className="font-bold">Privacy contact</dt><dd><a className="underline" href={`mailto:${policy.contactEmail}`}>{policy.contactEmail}</a></dd></div>
        <div><dt className="font-bold">Organization</dt><dd>{policy.organization}</dd></div>
        <div><dt className="font-bold">Location</dt><dd>{policy.location}</dd></div>
        <div><dt className="font-bold">Website</dt><dd><a className="underline" href={siteConfig.url}>{siteConfig.url}</a></dd></div>
        {policy.telephone ? <div><dt className="font-bold">Telephone</dt><dd>{policy.telephone}</dd></div> : null}
      </dl> : null}

    </section>)}
  </article>
}
