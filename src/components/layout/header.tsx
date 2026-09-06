import { Heart, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { navLinks, siteConfig } from "../../config/site"
import { Button } from "../ui/button"
import { Container } from "../ui/container"
import { cn } from "../../lib/utils"

function getHashFromHref(href: string) {
  return href.startsWith("#") ? href : ""
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [activeHref, setActiveHref] = useState(navLinks[0]?.href ?? "#top")
  const pendingHrefRef = useRef<string | null>(null)
  const pendingTimeoutRef = useRef<number | null>(null)
  const sectionIds = useMemo(() => navLinks.map((link) => getHashFromHref(link.href).slice(1)).filter(Boolean), [])

  const close = () => setOpen(false)

  useEffect(() => {
    const sectionElements = sectionIds.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element))

    if (!sectionElements.length) return

    const setActiveSection = (href: string) => {
      setActiveHref((current) => (current === href ? current : href))
    }

    const findCurrentSection = () => {
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0
      const activationLine = headerHeight + window.innerHeight * 0.28
      const pendingHref = pendingHrefRef.current

      if (pendingHref) {
        const pendingSection = document.getElementById(pendingHref.slice(1))
        const pendingRect = pendingSection?.getBoundingClientRect()
        const pendingIsActive = Boolean(pendingRect && pendingRect.top <= activationLine && pendingRect.bottom > headerHeight)

        if (pendingIsActive) {
          pendingHrefRef.current = null
        } else {
          return
        }
      }

      const currentSection =
        sectionElements
          .map((section) => ({
            id: section.id,
            top: section.getBoundingClientRect().top,
          }))
          .filter((section) => section.top <= activationLine)
          .sort((a, b) => b.top - a.top)[0] ?? sectionElements[0]

      setActiveSection(`#${currentSection.id}`)
    }

    findCurrentSection()

    const observer = new IntersectionObserver(findCurrentSection, {
      rootMargin: "-72px 0px -58% 0px",
      threshold: [0, 0.2, 0.5, 0.8, 1],
    })

    sectionElements.forEach((section) => observer.observe(section))
    window.addEventListener("hashchange", findCurrentSection)

    return () => {
      observer.disconnect()
      window.removeEventListener("hashchange", findCurrentSection)
      if (pendingTimeoutRef.current) window.clearTimeout(pendingTimeoutRef.current)
    }
  }, [sectionIds])

  const handleNavClick = (href: string) => {
    pendingHrefRef.current = href
    if (pendingTimeoutRef.current) window.clearTimeout(pendingTimeoutRef.current)
    pendingTimeoutRef.current = window.setTimeout(() => {
      pendingHrefRef.current = null
    }, 1200)
    setActiveHref(href)
    close()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-muted/92 backdrop-blur-md">
      <Container className="flex min-h-18 items-center justify-between gap-4">
        <a
          href="#top"
          onClick={() => handleNavClick("#top")}
          aria-current={activeHref === "#top" ? "page" : undefined}
          className="flex min-w-0 items-center gap-3 rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <img
            src={siteConfig.logo.src}
            alt={siteConfig.logo.alt}
            className="h-12 w-12 shrink-0 rounded-full border border-border bg-white object-contain p-0.5 shadow-brand sm:h-14 sm:w-14"
          />
          <span className="min-w-0">
            <span className="block max-w-[11.5rem] truncate font-brand text-[1.08rem] font-black leading-none text-primary min-[390px]:max-w-[14rem] min-[390px]:text-xl sm:hidden">
              {siteConfig.shortName}
            </span>
            <span className="hidden truncate font-brand font-black leading-none text-primary sm:block sm:max-w-[18rem] sm:text-2xl lg:max-w-[17rem] lg:text-xl xl:max-w-none xl:text-2xl">
              {siteConfig.brandLockup}
            </span>
          </span>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = activeHref === link.href

            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition duration-200 hover:bg-white/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  active ? "text-foreground" : "text-foreground/78",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-1 h-0.5 rounded-full bg-primary transition duration-200 ease-out",
                    active ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                  )}
                  aria-hidden="true"
                />
              </a>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="lg" className="whitespace-nowrap shadow-brand">
            <a href={siteConfig.donateHref}>
              <Heart size={17} aria-hidden="true" /> Donate now
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-foreground md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="border-t border-border bg-background md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Container className="grid gap-2 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={activeHref === link.href ? "page" : undefined}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "rounded-card px-4 py-3 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    activeHref === link.href ? "bg-muted text-primary" : "text-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-2 w-full" onClick={close}>
                <a href={siteConfig.donateHref}>
                  <Heart size={17} aria-hidden="true" /> Donate now
                </a>
              </Button>
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
