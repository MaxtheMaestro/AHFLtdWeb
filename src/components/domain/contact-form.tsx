import { CheckCircle2, FileUp, HeartHandshake, Mail, MessageCircle, Phone, Send } from "lucide-react"
import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react"
import { contactFormConfig, contactInquiryOptions, jamaicaParishes, type ContactInquiryValue } from "../../config/forms"
import { getEmbeddedFormProvider } from "../../lib/forms"
import { loadTallyEmbedScript } from "../../lib/forms/tally"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"

type Status = "idle" | "success"

const fieldClass =
  "min-h-12 rounded-card border border-border bg-white px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/18"
const textAreaClass =
  "min-h-28 resize-y rounded-card border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/18"

const provider = getEmbeddedFormProvider(contactFormConfig.provider)

export function ContactForm() {
  return (
    <div className="grid gap-6">
      <div>
        <p className="mb-3 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-primary">
          <HeartHandshake size={18} aria-hidden="true" /> Contact and requests
        </p>
        <h3 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">{contactFormConfig.title}</h3>
        <p className="mt-4 text-base font-medium leading-7 text-foreground/72">{contactFormConfig.introduction}</p>
        <p className="mt-3 text-sm font-semibold leading-6 text-foreground/64">{contactFormConfig.instructions}</p>
      </div>
      {provider ? <EmbeddedContactForm /> : <NativeContactRequestForm />}
    </div>
  )
}

function EmbeddedContactForm() {
  useEffect(() => {
    loadTallyEmbedScript()
  }, [])

  if (!provider) return null

  return (
    <div className="overflow-hidden rounded-card border border-border bg-white">
      <iframe
        title={contactFormConfig.title}
        src={provider.src}
        width="100%"
        height="820"
        className="block w-full border-0"
        data-tally-form-id={provider.formId}
      />
    </div>
  )
}

function NativeContactRequestForm() {
  const [inquiry, setInquiry] = useState<ContactInquiryValue>("assistance")
  const [urgent, setUrgent] = useState("No")
  const [status, setStatus] = useState<Status>("idle")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.currentTarget.reset()
    setInquiry("assistance")
    setUrgent("No")
    setStatus("success")
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-primary/20 bg-white p-6">
        <CheckCircle2 className="text-primary" size={34} aria-hidden="true" />
        <h4 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground">{contactFormConfig.successTitle}</h4>
        <p className="mt-3 text-base font-medium leading-7 text-foreground/72">{contactFormConfig.successMessage}</p>
        <Button type="button" variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" aria-describedby="contact-form-note">
      <p id="contact-form-note" className="rounded-card border border-primary/18 bg-muted px-4 py-3 text-sm font-semibold leading-6 text-foreground/72">
        Configure <code className="font-bold text-primary">VITE_TALLY_CONTACT_FORM_ID</code> to embed the live Tally form. This preview keeps the same structure and conditional flow for local review.
      </p>

      <FormSection title="Your Information">
        <InputField label="Full Name" name="fullName" autoComplete="name" required />
        <InputField label="Email Address" name="email" type="email" autoComplete="email" required />
        <InputField label="Phone / WhatsApp Number" name="phone" type="tel" autoComplete="tel" icon={<Phone size={17} aria-hidden="true" />} />
        <SelectField label="Parish" name="parish" options={jamaicaParishes} placeholder="Select a parish" />
        <RadioGroup
          label="Preferred Contact Method"
          name="preferredContactMethod"
          options={["Email", "Phone Call", "WhatsApp"]}
          icon={<MessageCircle size={17} aria-hidden="true" />}
        />
      </FormSection>

      <FormSection title="What Are You Contacting Us About?">
        <RadioGroup
          label="How can we help?"
          name="inquiryType"
          options={contactInquiryOptions}
          value={inquiry}
          onChange={(value) => setInquiry(value as ContactInquiryValue)}
          required
        />
      </FormSection>

      {inquiry === "assistance" ? <AssistanceFields urgent={urgent} onUrgentChange={setUrgent} /> : null}
      {inquiry === "volunteer" ? <VolunteerFields /> : null}
      {inquiry === "partnership" ? <PartnershipFields /> : null}
      {inquiry === "donation" ? <DonationFields /> : null}
      {inquiry === "outreach" ? <OutreachFields /> : null}
      {["event", "general", "media", "other"].includes(inquiry) ? <GeneralInquiryFields /> : null}

      <FormSection title="Additional Information">
        <TextareaField label="Is there anything else you would like us to know?" name="additionalInformation" />
        <CheckboxField
          name="consent"
          required
          label="I confirm that the information I have provided is accurate to the best of my knowledge and I consent to Agape Hope Jamaica LTD using this information to review and respond to my submission."
        />
        <CheckboxField
          name="updatesOptIn"
          label="I would like to receive occasional updates about Agape Hope Jamaica LTD's programmes, projects, events and opportunities."
        />
      </FormSection>

      <Button type="submit" size="lg" className="w-full sm:w-fit">
        Submit request <Send size={17} aria-hidden="true" />
      </Button>
    </form>
  )
}

function AssistanceFields({ urgent, onUrgentChange }: { urgent: string; onUrgentChange: (value: string) => void }) {
  return (
    <FormSection title="Request Assistance / Support">
      <p className="rounded-card border border-primary/18 bg-muted px-4 py-3 text-sm font-semibold leading-6 text-foreground/72">
        Submitting a request does not guarantee that Agape Hope Jamaica LTD will be able to provide assistance, but the team will review the information shared.
      </p>
      <RadioGroup label="Who is the assistance for?" name="assistanceFor" options={["Myself", "My Family", "Someone Else", "Community/Organization"]} />
      <TextareaField label="What type of assistance are you requesting?" name="assistanceType" />
      <TextareaField label="Please describe the situation and how Agape Hope may be able to assist." name="assistanceSituation" />
      <InputField label="Parish/community where assistance is needed" name="assistanceCommunity" />
      <RadioGroup label="Is this request urgent?" name="urgentRequest" options={["Yes", "No"]} value={urgent} onChange={onUrgentChange} />
      {urgent === "Yes" ? <TextareaField label="If yes, briefly explain why." name="urgentReason" /> : null}
      <FileField label="Optional supporting document/image upload" name="assistanceUpload" />
    </FormSection>
  )
}

function VolunteerFields() {
  return (
    <FormSection title="Volunteer With Agape Hope">
      <TextareaField label="What type of volunteering are you interested in?" name="volunteerInterest" />
      <TextareaField label="What skills or experience would you like to contribute?" name="volunteerSkills" />
      <SelectField label="What parish are you located in?" name="volunteerParish" options={jamaicaParishes} placeholder="Select a parish" />
      <InputField label="General availability" name="volunteerAvailability" />
      <RadioGroup label="Are you interested in being contacted about future volunteer opportunities?" name="futureVolunteerContact" options={["Yes", "No"]} />
    </FormSection>
  )
}

function PartnershipFields() {
  return (
    <FormSection title="Partnership / Collaboration">
      <InputField label="Organization / Company Name" name="organizationName" />
      <InputField label="Your Role / Position" name="role" />
      <InputField label="Type of organization" name="organizationType" />
      <TextareaField label="What type of partnership or collaboration are you proposing?" name="partnershipType" />
      <TextareaField label="Briefly describe the opportunity." name="partnershipOpportunity" />
      <InputField label="Website or social media link" name="organizationLink" type="url" />
    </FormSection>
  )
}

function DonationFields() {
  return (
    <FormSection title="Donation / Sponsorship">
      <RadioGroup label="Are you contacting us as an Individual, Business, or Organization?" name="supporterType" options={["Individual", "Business", "Organization"]} />
      <InputField label="Organization/Business Name — if applicable" name="supporterOrganization" />
      <RadioGroup
        label="How would you like to support Agape Hope?"
        name="supportType"
        options={["Donation", "Sponsorship", "In-kind Support", "Fundraising Collaboration", "Other"]}
      />
      <TextareaField label="Tell us more about how you would like to support Agape Hope." name="supportDetails" />
      <p className="rounded-card border border-border bg-muted px-4 py-3 text-sm font-semibold leading-6 text-foreground/72">
        Please do not share credit/debit card, banking, or other sensitive payment information through this form.
      </p>
    </FormSection>
  )
}

function OutreachFields() {
  return (
    <FormSection title="Community Project / Outreach Request">
      <InputField label="Name of community/organization" name="communityOrganization" />
      <SelectField label="Parish" name="outreachParish" options={jamaicaParishes} placeholder="Select a parish" />
      <InputField label="Type of project/outreach being requested" name="outreachType" />
      <InputField label="Estimated number of people who may benefit" name="estimatedBeneficiaries" type="number" />
      <InputField label="Preferred date or timeframe" name="preferredTimeframe" />
      <TextareaField label="Describe the need and proposed activity." name="outreachDescription" />
      <FileField label="Optional supporting document/image upload" name="outreachUpload" />
    </FormSection>
  )
}

function GeneralInquiryFields() {
  return (
    <FormSection title="General / Other Inquiries">
      <InputField label="Subject" name="subject" icon={<Mail size={17} aria-hidden="true" />} />
      <TextareaField label="Message" name="message" />
    </FormSection>
  )
}

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="grid gap-4 rounded-card border border-border bg-white p-4 sm:p-5">
      <legend className="px-1 font-display text-2xl font-bold leading-tight text-foreground">{title}</legend>
      <div className="grid gap-4 pt-2">{children}</div>
    </fieldset>
  )
}

function InputField({
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
  icon,
}: {
  label: string
  name: string
  type?: string
  autoComplete?: string
  required?: boolean
  icon?: ReactNode
}) {
  const id = useId()

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-bold text-foreground">
        {icon}
        <span>
          {label}
          {required ? <span className="text-primary"> *</span> : null}
        </span>
      </label>
      <input id={id} name={name} type={type} autoComplete={autoComplete} required={required} className={fieldClass} />
    </div>
  )
}

function TextareaField({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  const id = useId()

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-bold text-foreground">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </label>
      <textarea id={id} name={name} required={required} rows={4} className={textAreaClass} />
    </div>
  )
}

function SelectField({
  label,
  name,
  options,
  placeholder,
  required = false,
}: {
  label: string
  name: string
  options: readonly string[]
  placeholder?: string
  required?: boolean
}) {
  const id = useId()

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-bold text-foreground">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </label>
      <select id={id} name={name} required={required} defaultValue="" className={fieldClass}>
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function RadioGroup({
  label,
  name,
  options,
  required = false,
  value,
  onChange,
  icon,
}: {
  label: string
  name: string
  options: readonly (string | { value: string; label: string })[]
  required?: boolean
  value?: string
  onChange?: (value: string) => void
  icon?: ReactNode
}) {
  return (
    <div className="grid gap-2">
      <p className="flex items-center gap-2 text-sm font-bold text-foreground">
        {icon}
        <span>
          {label}
          {required ? <span className="text-primary"> *</span> : null}
        </span>
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const optionValue = typeof option === "string" ? option : option.value
          const optionLabel = typeof option === "string" ? option : option.label
          const checked = value === optionValue

          return (
            <label
              key={optionValue}
              className={cn(
                "flex min-h-12 cursor-pointer items-center gap-3 rounded-card border border-border bg-white px-3 py-2 text-sm font-semibold leading-5 text-foreground/78 transition",
                checked && "border-primary bg-muted text-foreground",
              )}
            >
              <input
                type="radio"
                name={name}
                value={optionValue}
                required={required}
                checked={value ? checked : undefined}
                onChange={(event) => onChange?.(event.currentTarget.value)}
                className="h-4 w-4 accent-primary"
              />
              <span>{optionLabel}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

function CheckboxField({ name, label, required = false }: { name: string; label: string; required?: boolean }) {
  return (
    <label className="flex gap-3 rounded-card border border-border bg-white px-4 py-3 text-sm font-semibold leading-6 text-foreground/76">
      <input type="checkbox" name={name} required={required} className="mt-1 h-4 w-4 shrink-0 accent-primary" />
      <span>
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
    </label>
  )
}

function FileField({ label, name }: { label: string; name: string }) {
  const id = useId()

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-bold text-foreground">
        <FileUp size={17} aria-hidden="true" /> {label}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        className="rounded-card border border-dashed border-primary/35 bg-muted px-4 py-3 text-sm font-semibold text-foreground/72 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
      />
    </div>
  )
}
