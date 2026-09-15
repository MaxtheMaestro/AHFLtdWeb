import { getTallyProvider } from "./tally"
import type { EmbeddedFormProvider, FormProviderConfig } from "./types"

export function getEmbeddedFormProvider(config: FormProviderConfig): EmbeddedFormProvider | null {
  if (config.type === "tally") return getTallyProvider(config)

  return null
}
