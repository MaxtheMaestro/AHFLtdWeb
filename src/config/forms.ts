import type { FormProviderConfig } from "../lib/forms/types"

export const jamaicaParishes = [
  "Clarendon",
  "Hanover",
  "Kingston",
  "Manchester",
  "Portland",
  "Saint Andrew",
  "Saint Ann",
  "Saint Catherine",
  "Saint Elizabeth",
  "Saint James",
  "Saint Mary",
  "Saint Thomas",
  "Trelawny",
  "Westmoreland",
] as const

export const contactInquiryOptions = [
  { value: "assistance", label: "Request Assistance / Support" },
  { value: "volunteer", label: "Volunteer With Agape Hope" },
  { value: "partnership", label: "Partnership / Collaboration" },
  { value: "donation", label: "Donation / Sponsorship" },
  { value: "outreach", label: "Community Project / Outreach Request" },
  { value: "event", label: "Event or Programme Inquiry" },
  { value: "general", label: "General Question" },
  { value: "media", label: "Media / Business Inquiry" },
  { value: "other", label: "Other" },
] as const

export type ContactInquiryValue = (typeof contactInquiryOptions)[number]["value"]

export const contactFormConfig = {
  id: "contact-request",
  title: "How Can We Help?",
  introduction:
    "Whether you're reaching out for assistance, looking to volunteer, interested in partnering with us, or simply have a question, we'd love to hear from you.",
  instructions:
    "Please complete the form below and provide as much information as possible. A member of the Agape Hope Jamaica LTD team will review your submission and follow up where appropriate.",
  successTitle: "Thank you for reaching out!",
  successMessage:
    "Your information has been received by Agape Hope Jamaica LTD. Our team will review your submission and contact you if additional information or follow-up is required.",
  provider: {
    type: "tally",
    formId: import.meta.env.VITE_TALLY_CONTACT_FORM_ID,
    embedOptions: {
      alignLeft: true,
      hideTitle: true,
      transparentBackground: true,
      dynamicHeight: true,
    },
  } satisfies FormProviderConfig,
}
