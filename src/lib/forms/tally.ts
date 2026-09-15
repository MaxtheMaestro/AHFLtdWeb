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

  if (!formId) return null

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

export function loadTallyEmbedScript() {
  if (window.Tally?.loadEmbeds) {
    window.Tally.loadEmbeds()
    return
  }

  const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${TALLY_SCRIPT_URL}"]`)
  if (existingScript) return

  const script = document.createElement("script")
  script.src = TALLY_SCRIPT_URL
  script.async = true
  script.onload = () => window.Tally?.loadEmbeds?.()
  document.body.appendChild(script)
}
