import { footerDetails, navLinks, siteConfig, socialLinks } from "../../config/site"
import { Container } from "../ui/container"

export function Footer() {
  return (
    <footer className="bg-foreground py-12 text-white">
      <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <img
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              className="h-16 w-16 shrink-0 rounded-full border border-white/16 bg-white object-contain object-center p-1"
              loading="lazy"
            />
            <p className="font-brand text-3xl font-black leading-none text-primary">{siteConfig.brandLockup}</p>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/72">{siteConfig.description}</p>
        </div>
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-white/55">Explore</p>
          <nav className="grid gap-2" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-white/78 hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-white/55">Connect</p>
          <div className="grid gap-3">
            {footerDetails.map((detail) => (
              <div key={detail.label} className="flex gap-3 text-sm text-white/78">
                <detail.icon size={18} className="mt-0.5 shrink-0 text-white" aria-hidden="true" />
                <span>{detail.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/18 text-white/78 hover:bg-white/10 hover:text-white"
              >
                <link.icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </Container>
      <Container className="mt-10 border-t border-white/12 pt-6 text-sm text-white/55">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </Container>
    </footer>
  )
}
