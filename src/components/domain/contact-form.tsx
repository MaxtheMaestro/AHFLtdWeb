import { HeartHandshake } from "lucide-react"
import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { contactFormConfig } from "../../config/forms"
import { contactPrivacyNotice } from "../../content/contact-privacy-notice"
import { siteConfig } from "../../config/site"
import { getEmbeddedFormProvider } from "../../lib/forms"
import { loadTallyEmbedScript } from "../../lib/forms/tally"
import { PrivacyLink } from "../layout/privacy-link"
import { Button } from "../ui/button"

const Preview = import.meta.env.DEV ? lazy(() => import("./contact-form-preview")) : null
const provider = getEmbeddedFormProvider(contactFormConfig.provider)

export function ContactForm() {
  return (
    <div className="grid min-w-0 gap-6">
      <div>
        <p className="mb-3 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-primary">
          <HeartHandshake size={18} aria-hidden="true" /> Contact and requests
        </p>
        <h3 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">{contactFormConfig.title}</h3>
        <p className="mt-4 text-base font-medium leading-7 text-foreground/72">{contactFormConfig.introduction}</p>
        <p className="mt-3 text-sm font-semibold leading-6 text-foreground/64">{contactFormConfig.instructions}</p>
      </div>
      <section aria-labelledby="contact-privacy-heading" className="rounded-card border border-border bg-muted p-4 text-sm leading-6">
        <h4 id="contact-privacy-heading" className="font-bold">{contactPrivacyNotice.title}</h4>
        {contactPrivacyNotice.paragraphs.map(paragraph => <p key={paragraph} className="mt-2">{paragraph}</p>)}
        <p className="mt-2">Email <a className="underline break-words" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> with privacy questions.</p>
        <PrivacyLink allowPreview label="Read our full Privacy Policy" className="mt-2 inline-block underline" />
      </section>
      {provider ? <EmbeddedContactForm /> : <p role="status" className="rounded-card border border-border p-4">The embedded contact form is currently unavailable. Please use the standalone form or email below.</p>}
      <p className="text-sm leading-6">
        <a className="underline" href={provider ? `https://tally.so/r/${provider.formId}` : contactFormConfig.standaloneUrl} target="_blank" rel="noopener noreferrer">Open the contact form on Tally (new tab)</a>
        {" or "}<a className="underline break-words" href={`mailto:${siteConfig.contact.email}`}>email {siteConfig.contact.email}</a>.
      </p>
      {Preview && new URLSearchParams(window.location.search).has("form-demo") ? <Suspense fallback={<p role="status">Loading demonstration…</p>}><Preview /></Suspense> : null}
    </div>
  )
}

function EmbeddedContactForm() {
  const [requested, setRequested] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [slow, setSlow] = useState(false)
  const [scriptFailed, setScriptFailed] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!requested) return
    let active = true
    loadTallyEmbedScript().catch(() => { if (active) setScriptFailed(true) })
    return () => { active = false }
  }, [requested])

  useEffect(() => {
    if (!requested || loaded) return
    const timeout = window.setTimeout(() => setSlow(true), 15000)
    return () => window.clearTimeout(timeout)
  }, [requested, loaded])

  useEffect(() => {
    if (requested) frame.current?.focus()
  }, [requested])

  if (!provider) return null

  return (
    <div className="grid min-w-0 gap-3">
      {!requested ? <div className="rounded-card border border-border p-5">
        <p className="mb-4 text-sm leading-6">Loading the form connects your browser to Tally, an external service.</p>
        <Button type="button" onClick={() => setRequested(true)}>Load Contact Form</Button>
      </div> : null}
      <p role="status" aria-live="polite" className="text-sm leading-6">
        {requested && !loaded && !slow ? "Loading the Tally form…" : ""}
        {slow && !loaded ? "The form is taking longer than expected. If it does not appear, use the standalone form or email below." : ""}
        {loaded ? "The form frame has loaded. If the form is blank or shows an error, use the standalone form or email below." : ""}
        {scriptFailed ? " Automatic form resizing is unavailable. You can scroll within the form or open it on Tally." : ""}
      </p>
      {requested ? <div className="overflow-hidden rounded-card border border-border bg-white">
        <iframe ref={frame} title={`${contactFormConfig.title} — Tally contact form`} src={provider.src}
          width="100%" height="820" className="block w-full border-0" tabIndex={0} referrerPolicy="no-referrer"
          data-tally-form-id={provider.formId}
          onLoad={() => setLoaded(true)} onError={() => { setLoaded(false); setSlow(true) }} />
      </div> : null}
    </div>
  )
}
