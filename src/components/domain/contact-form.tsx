import { Send } from "lucide-react"
import { useState, type FormEvent } from "react"
import { siteConfig } from "../../config/site"
import { Button } from "../ui/button"

type Status = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("loading")

    const form = event.currentTarget
    const formData = new FormData(form)
    const endpoint = siteConfig.contact.formspreeEndpoint

    if (endpoint.includes("your-form-id")) {
      setStatus("error")
      return
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (!response.ok) throw new Error("Formspree submission failed")
      form.reset()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4" aria-describedby="contact-status">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-bold text-foreground">Name</label>
        <input id="name" name="name" autoComplete="name" required className="min-h-12 rounded-card border border-border bg-white px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/18" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-bold text-foreground">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required className="min-h-12 rounded-card border border-border bg-white px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/18" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="subject" className="text-sm font-bold text-foreground">Subject</label>
        <input id="subject" name="subject" className="min-h-12 rounded-card border border-border bg-white px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/18" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-bold text-foreground">Message</label>
        <textarea id="message" name="message" required rows={5} className="resize-y rounded-card border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/18" />
      </div>
      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-fit">
        {status === "loading" ? "Sending..." : "Send message"} <Send size={17} aria-hidden="true" />
      </Button>
      <p id="contact-status" className="min-h-6 text-sm text-foreground/70" role={status === "error" ? "alert" : "status"}>
        {status === "success"
          ? "Thank you. Your message was sent."
          : status === "error"
            ? "The form endpoint is not configured yet. Set VITE_FORMSPREE_ENDPOINT to your Formspree URL."
            : ""}
      </p>
    </form>
  )
}
