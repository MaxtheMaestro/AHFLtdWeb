import { Heart, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { navLinks, siteConfig } from "../../config/site"
import { Button } from "../ui/button"
import { Container } from "../ui/container"

export function Header() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-muted/92 backdrop-blur-md">
      <Container className="flex min-h-18 items-center justify-between gap-4">
        <a href="#top" className="flex min-w-0 items-center gap-3 rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
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
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold text-foreground/78 transition hover:bg-white/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {link.label}
              {index === 0 ? <span className="absolute inset-x-4 -bottom-1 h-0.5 rounded-full bg-primary" aria-hidden="true" /> : null}
            </a>
          ))}
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
                  onClick={close}
                  className="rounded-card px-4 py-3 text-base font-semibold text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
