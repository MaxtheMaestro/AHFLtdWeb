import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

export const siteConfig = {
  name: "Agape Hope Jamaica LTD",
  shortName: "Agape Hope",
  brandLockup: "Agape Hope Jamaica LTD",
  tagline: "Sharing Love; Giving Hope",
  description:
    "A Jamaica-born volunteer organization serving families, young people, and communities through outreach, donations, fundraising, and practical acts of compassion.",
  url: "https://agapehopefoundation.framer.website/",
  logo: {
    src: "/images/brand/agape-hope-logo.jpg",
    alt: "The Agape Foundation of Jamaica Limited logo with red hands holding a heart.",
  },
  contact: {
    location: "Jamaica",
    email: "agapehopefoundation@gmail.com",
    phone: "",
    formspreeEndpoint:
      import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/your-form-id",
  },
  donateHref: "#contact",
  volunteerHref: "#contact",
}

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#mission" },
  { label: "Our Work", href: "#programs" },
  { label: "Get Involved", href: "#help" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
]

export const socialLinks = [
  { label: "Email", href: `mailto:${siteConfig.contact.email}`, icon: Mail },
  { label: "Instagram", href: "https://www.instagram.com/agapehopefoundation/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
]

export const footerDetails = [
  { label: "Based in", value: siteConfig.contact.location, icon: MapPin },
  { label: "Email", value: siteConfig.contact.email, icon: Mail },
  { label: "Phone", value: "Available on request", icon: Phone },
]
