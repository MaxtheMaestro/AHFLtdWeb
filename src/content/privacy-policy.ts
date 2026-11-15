import type { PrivacyPolicy } from "../config/privacy"

// Part B of Agape Hope Privacy Policy Board Review 2.pdf (pages 2–4).
// The administrator confirmed the facts and explicitly authorized removal of
// only the internal legal-name and transfer-confirmation instructions.
// All remaining substantive wording is preserved. Edit individual sections only
// after internal review; policy dates/version are in config/privacy.ts.
export const privacyPolicySections: PrivacyPolicy["sections"] = [
  {
    "id": "who-we-are",
    "title": "Who We Are",
    "paragraphs": [
      "Agape Hope Foundation of Jamaica Ltd. (“the Foundation”, “we”, “us” or “our”) is a Jamaica-based community-focused organization. This Privacy Policy explains how we handle personal information submitted through our website, online forms, email communications, and related outreach activities."
    ]
  },
  {
    "id": "information-collected",
    "title": "Personal Information We Collect",
    "paragraphs": [
      "When you submit our Contact and Requests form, we collect your full name, email address, telephone or WhatsApp number, parish, preferred contact method, reason for contacting us, and any additional details you choose to provide. We may also receive information that you send directly by email or during follow-up communications. We do not request bank-card information through this contact form.",
      "Our website hosting provider may process technical data, such as IP address, device or browser information, timestamps, and request logs, to deliver and secure the website. We will separately disclose any analytics or non-essential cookies if those features are enabled."
    ]
  },
  {
    "id": "purposes",
    "title": "Why We Use Information",
    "paragraphs": [],
    "bullets": [
      "To receive, identify, assess, and respond to requests for assistance or general inquiries.",
      "To communicate with people who inquire about volunteering, partnerships, community projects, or other Foundation activities.",
      "To route requests to appropriate authorized personnel and coordinate follow-up.",
      "To maintain reasonable administrative records, prevent misuse, and support website security.",
      "To comply with applicable legal obligations.",
      "To send promotional, newsletter, or fundraising communications only where an appropriate lawful basis exists, including consent where required."
    ]
  },
  {
    "id": "lawful-processing",
    "title": "Lawful and Fair Processing",
    "paragraphs": [
      "We aim to process personal information fairly, lawfully, transparently, and only to the extent reasonably necessary for identified purposes. Depending on the circumstances, processing may rely on consent, steps requested by the individual, legal obligations, or another lawful basis recognized by applicable law. We will not treat submission of an assistance request as blanket consent to unrelated marketing."
    ]
  },
  {
    "id": "service-providers",
    "title": "Service Providers and Disclosures",
    "paragraphs": [
      "We use Tally to collect online form submissions. Submitted information is transferred to Notion to organize inquiries, maintain administrative records, and support follow-up by authorized Foundation personnel. Our website is hosted by Vercel, which may process technical request data for delivery and security. Google’s email services process correspondence with agapehopeja@gmail.com. If you choose WhatsApp, communications may be processed through WhatsApp/Meta under its applicable terms and privacy practices.",
      "We do not sell or rent personal information. We may disclose information to service providers for the purposes described above, to authorized personnel who need it to handle a request, where disclosure is legally required, or with appropriate authorization. Access and confidentiality measures must be implemented and periodically reviewed."
    ]
  },
  {
    "id": "international-processing",
    "title": "International Processing",
    "paragraphs": [
      "Some service providers may store or process personal information outside Jamaica. Where cross-border processing occurs, we will assess and implement safeguards and arrangements required by applicable Jamaican law."
    ]
  },
  {
    "id": "retention-deletion",
    "title": "Retention and Deletion",
    "paragraphs": [
      "We retain personal information only for as long as reasonably necessary to handle requests, maintain legitimate organizational records, meet legal obligations, and resolve disputes. Retention periods or documented retention criteria will be adopted for Tally submissions, Notion records, and email correspondence. When information is no longer needed, we will delete or securely dispose of it, subject to legal retention requirements."
    ]
  },
  {
    "id": "security",
    "title": "Security",
    "paragraphs": [
      "We use reasonable organizational and technical measures appropriate to the information processed. These should include access restrictions, strong authentication, appropriate account permissions, and controlled sharing of records. No online service can guarantee absolute security. We will assess suspected incidents and take appropriate remedial and notification steps where required by law."
    ]
  },
  {
    "id": "sensitive-information-children",
    "title": "Sensitive Information and Children",
    "paragraphs": [
      "Please do not include medical records, identification numbers, bank details, or other highly sensitive information in the general contact form unless specifically requested through an appropriate secure process. Where an inquiry involves a child or another vulnerable individual, we will seek to limit collection, restrict access, and obtain appropriate parent or guardian authorization where required. Separate consent and safeguarding procedures should govern publication of identifiable outreach photographs, especially images of children."
    ]
  },
  {
    "id": "cookies-external-links",
    "title": "Cookies and External Links",
    "paragraphs": [
      "The website may use technologies necessary for its operation. Any optional analytics, advertising, or non-essential cookies will be identified accurately once verified, with any legally required choices provided. Links to third-party sites and social platforms are subject to those providers’ privacy notices."
    ]
  },
  {
    "id": "privacy-rights",
    "title": "Your Privacy Rights",
    "paragraphs": [
      "Subject to applicable Jamaican law and relevant exceptions, individuals may have rights to request access to personal information, correction of inaccurate information, and other statutory remedies or controls concerning processing. They may withdraw consent where consent is the basis for processing, without affecting earlier lawful processing. Requests can be made using the contact details below. We may need to verify identity before responding."
    ]
  },
  {
    "id": "changes-contact",
    "title": "Changes and Contact Details",
    "paragraphs": [
      "We may revise this Privacy Policy to reflect changes in our operations, technology, or legal obligations. The current version and its effective date will be displayed on our website. Where material changes require additional notice or consent, we will take the appropriate steps."
    ]
  }
]
