export type FormProvider = "tally" | "native"

export type TallyEmbedOptions = {
  alignLeft?: boolean
  hideTitle?: boolean
  transparentBackground?: boolean
  dynamicHeight?: boolean
}

export type TallyFormProviderConfig = {
  type: "tally"
  formId?: string
  embedOptions?: TallyEmbedOptions
}

export type NativeFormProviderConfig = {
  type: "native"
}

export type FormProviderConfig = TallyFormProviderConfig | NativeFormProviderConfig

export type EmbeddedFormProvider = {
  type: "tally"
  formId: string
  src: string
}
