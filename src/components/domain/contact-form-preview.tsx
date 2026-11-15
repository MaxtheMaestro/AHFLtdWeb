import { FileUp, Mail, MessageCircle, Phone, Send } from "lucide-react"
import { useId, useState, type FormEvent, type ReactNode } from "react"
import { contactInquiryOptions, jamaicaParishes, type ContactInquiryValue } from "../../config/forms"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"

const fieldClass =
  "min-w-0 w-full min-h-12 rounded-card border border-border bg-white px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/18"
const textAreaClass =
  "min-w-0 w-full min-h-28 resize-y rounded-card border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/18"

export default function ContactFormPreview() {
  const [inquiry, setInquiry] = useState<ContactInquiryValue>("assistance")
  const [urgent, setUrgent] = useState("No")
  const [attempted, setAttempted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
  }

  return (
    <form onSubmit={handleSubmit} className="grid min-w-0 gap-5" aria-describedby="contact-form-note">
      <p id="contact-form-note" className="rounded-card border border-primary/18 bg-muted px-4 py-3 text-sm font-semibold leading-6 text-foreground/72">
        Configure <code className="break-all font-bold text-primary">VITE_TALLY_CONTACT_FORM_ID</code> to embed the live Tally form. Demonstration only: this does not represent the current live form. Do not enter real personal information. Nothing is sent or saved by this demonstration.
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
      </FormSection>

      <p role="status" className="text-sm font-bold text-primary">{attempted ? "Demonstration only. Nothing was sent. Your entries remain here until you leave or reload this page." : "Development demonstration — submissions are disabled."}</p>
      <Button type="submit" size="lg" className="w-full sm:w-fit">
        Try demonstration (nothing is sent) <Send size={17} aria-hidden="true" />
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
    <fieldset className="grid min-w-0 gap-4 rounded-card border border-border bg-white p-4 sm:p-5">
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
    <div className="grid min-w-0 gap-2">
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
    <div className="grid min-w-0 gap-2">
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
    <div className="grid min-w-0 gap-2">
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
    <fieldset className="grid min-w-0 gap-2">
      <legend className="flex items-center gap-2 text-sm font-bold text-foreground">
        {icon}
        <span>
          {label}
          {required ? <span className="text-primary"> *</span> : null}
        </span>
      </legend>
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
    </fieldset>
  )
}

function FileField({ label, name }: { label: string; name: string }) {
  const id = useId()

  return (
    <div className="grid min-w-0 gap-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-bold text-foreground">
        <FileUp size={17} aria-hidden="true" /> {label}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        className="min-w-0 w-full rounded-card border border-dashed border-primary/35 bg-muted px-4 py-3 text-sm font-semibold text-foreground/72 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
      />
    </div>
  )
}
