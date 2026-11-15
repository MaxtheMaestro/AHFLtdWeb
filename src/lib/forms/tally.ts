import type { EmbeddedFormProvider, TallyEmbedOptions, TallyFormProviderConfig } from "./types"

const TALLY_EMBED_BASE_URL = "https://tally.so/embed"
const TALLY_SCRIPT_URL = "https://tally.so/widgets/embed.js"

declare global {
  interface Window {
    Tally?: {
      loadEmbeds?: () => void
    }
  }
}

export function getTallyProvider(config: TallyFormProviderConfig): EmbeddedFormProvider | null {
  const formId = config.formId?.trim()

  if (!formId || !/^[a-zA-Z0-9]+$/.test(formId)) return null

  return {
    type: "tally",
    formId,
    src: buildTallyEmbedUrl(formId, config.embedOptions),
  }
}

export function buildTallyEmbedUrl(formId: string, options: TallyEmbedOptions = {}) {
  const url = new URL(`${TALLY_EMBED_BASE_URL}/${formId}`)

  if (options.alignLeft) url.searchParams.set("alignLeft", "1")
  if (options.hideTitle) url.searchParams.set("hideTitle", "1")
  if (options.transparentBackground) url.searchParams.set("transparentBackground", "1")
  if (options.dynamicHeight) url.searchParams.set("dynamicHeight", "1")

  return url.toString()
}

let scriptPromise: Promise<void> | undefined

// Called only after a visitor requests the form. Share one load across mounts.
export function loadTallyEmbedScript(): Promise<void> {
  if (window.Tally?.loadEmbeds) {
    return Promise.resolve().then(() => window.Tally?.loadEmbeds?.())
  }
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = TALLY_SCRIPT_URL
    script.async = true
    script.referrerPolicy = "no-referrer"
    const timeout = window.setTimeout(fail, 15000)
    function fail() {
      window.clearTimeout(timeout)
      script.remove()
      scriptPromise = undefined
      reject(new Error("Tally helper unavailable"))
    }
    script.onerror = fail
    script.onload = () => {
      window.clearTimeout(timeout)
      if (!window.Tally?.loadEmbeds) { fail(); return }
      try { window.Tally.loadEmbeds(); resolve() } catch { fail() }
    }
    document.body.appendChild(script)
  })
  return scriptPromise
}
