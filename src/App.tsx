import { ArrowRight, CheckCircle2, Gift, HandHeart, Heart, HeartHandshake, Sparkles, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { ContactForm } from "./components/domain/contact-form"
import { FeaturedCard, ImageCard } from "./components/domain/image-card"
import { TeamMemberCard } from "./components/domain/team-member-card"
import { Footer } from "./components/layout/footer"
import { Header } from "./components/layout/header"
import { Button } from "./components/ui/button"
import { Card } from "./components/ui/card"
import { Container } from "./components/ui/container"
import { LiquidGlassButton } from "./components/ui/liquid-glass-button"
import { Section, SectionHeader } from "./components/ui/section"
import { faqs, galleryImages, hero, involvementPaths, leadership, programs, projects, storyBlocks } from "./data/content"
import { siteConfig } from "./config/site"

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: "easeOut" as const },
}

function Hero() {
  const heroStats = [
    { value: "2021", label: "Founded in Jamaica", detail: "A mission shaped by love", icon: Heart },
    { value: "8+", label: "Leadership roles", detail: "Organized for service", icon: Users },
    { value: "Ongoing", label: "Community projects", detail: "Practical help where needed", icon: HandHeart },
    { value: "Countless", label: "Lives touched", detail: "Through care and compassion", icon: Gift },
  ]

  return (
    <section className="relative isolate overflow-hidden bg-muted">
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -left-24 -z-10 h-72 w-[46rem] rounded-[55%] bg-primary-hover opacity-95 sm:h-80"
      />
      <div
        aria-hidden="true"
        className="absolute right-6 top-10 hidden h-24 w-32 bg-[radial-gradient(circle,rgba(179,38,30,0.45)_2px,transparent_3px)] [background-size:18px_18px] lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 -z-10 h-full w-1/2 bg-[radial-gradient(circle_at_0%_20%,rgba(217,207,201,0.75),transparent_34%)]"
      />

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-28 lg:pt-14">
        <motion.div {...fadeIn} className="relative z-10">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-foreground shadow-[0_12px_36px_rgba(43,35,32,0.08)]">
            <span aria-hidden="true">🇯🇲</span>
            {hero.eyebrow}
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-bold leading-[0.96] text-foreground sm:text-6xl xl:text-7xl">
            Sharing <span className="text-primary">love.</span>
            <br />
            Giving <span className="text-primary">hope.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-foreground/76 sm:text-xl">{hero.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LiquidGlassButton asChild size="xl" className="gap-2 shadow-[0_20px_54px_rgba(179,38,30,0.26)]">
              <a href="#contact">
                <Heart size={18} aria-hidden="true" /> {hero.primaryCta}
              </a>
            </LiquidGlassButton>
            <Button asChild variant="outline" size="xl" className="border-primary/35 bg-white/55 text-foreground hover:border-primary hover:text-primary">
              <a href="#programs">
                {hero.secondaryCta} <ArrowRight size={18} aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div className="mt-7 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[galleryImages[2], galleryImages[4], galleryImages[5]].map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt=""
                  className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm"
                  loading="lazy"
                />
              ))}
            </div>
            <p className="max-w-56 text-sm font-semibold leading-5 text-foreground/72">
              Join our community of <span className="text-primary">volunteers and supporters</span>
            </p>
          </div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.12 }} className="relative lg:justify-self-end">
          <div
            aria-hidden="true"
            className="absolute -left-6 bottom-8 hidden h-28 w-32 bg-[radial-gradient(circle,rgba(122,25,19,0.18)_2px,transparent_3px)] [background-size:18px_18px] lg:block"
          />
          <div className="relative overflow-hidden rounded-[42%_58%_20%_28%/20%_24%_18%_34%] border border-white/70 bg-white p-2 shadow-[0_28px_90px_rgba(43,35,32,0.18)]">
            <img src={hero.image} alt={hero.imageAlt} className="aspect-[4/3] w-full rounded-[36%_52%_18%_24%/18%_22%_16%_30%] object-cover object-center lg:max-w-3xl" />
            <div className="absolute right-8 top-6 max-w-[18rem] rounded-[18px] bg-primary/92 px-5 py-4 text-white shadow-brand sm:right-10">
              <p className="flex items-center gap-2 font-display text-xl leading-none sm:text-2xl">
                <Heart size={20} aria-hidden="true" /> Rooted in Jamaica.
              </p>
              <p className="mt-1 text-sm font-bold">Driven by love.</p>
            </div>
          </div>
        </motion.div>
      </Container>

      <Container className="relative z-10 -mt-2 pb-10 lg:-mt-20">
        <div className="grid gap-4 rounded-image border border-border bg-white/92 p-4 shadow-[0_24px_90px_rgba(43,35,32,0.14)] backdrop-blur md:grid-cols-2 lg:grid-cols-4 lg:p-5">
          {heroStats.map((stat) => (
            <div key={stat.label} className="flex gap-4 rounded-card p-3 lg:border-r lg:border-border/80 lg:last:border-r-0">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-white shadow-brand">
                <stat.icon size={21} aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-3xl font-bold leading-none text-foreground">{stat.value}</span>
                <span className="mt-1 block text-sm font-extrabold text-foreground">{stat.label}</span>
                <span className="mt-1 block text-xs font-medium leading-5 text-foreground/68">{stat.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Mission() {
  const pillars = [
    "Practical compassion for families and communities",
    "Volunteerism that develops young leaders",
    "Fundraising and donations turned into direct care",
  ]

  return (
    <Section id="mission">
      <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div {...fadeIn}>
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.14em] text-primary">Why we exist</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Agape is unconditional love made visible through service.
          </h2>
          <p className="mt-5 text-lg font-medium leading-8 text-foreground/72">
            Agape Hope began in Jamaica in September 2021 with Stephen Simpson and Zakari Messam, growing around a simple conviction: people should encounter hope in concrete, generous, organized ways.
          </p>
        </motion.div>
        <div className="grid gap-4">
          {pillars.map((pillar) => (
            <Card key={pillar} className="flex gap-4 p-5">
              <CheckCircle2 className="mt-1 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-base font-semibold leading-7 text-foreground">{pillar}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function InvolvementPaths() {
  return (
    <Section id="help">
      <SectionHeader
        eyebrow="What we do"
        title="Clear paths from compassion to action."
        description="A strong charity homepage should quickly show who is helped and how supporters can participate."
      />
      <Container className="grid gap-5 md:grid-cols-3">
        {involvementPaths.map((path, index) => (
          <Card key={path.title} className="relative overflow-hidden p-6">
            <span className="mb-6 grid h-12 w-12 place-items-center rounded-full bg-muted font-display text-2xl font-bold text-primary">
              0{index + 1}
            </span>
            <h3 className="font-display text-3xl font-bold leading-tight text-foreground">{path.title}</h3>
            <p className="mt-3 text-sm font-medium leading-6 text-foreground/70">{path.description}</p>
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-primary hover:text-primary-hover">
              {path.action} <ArrowRight size={16} aria-hidden="true" />
            </a>
          </Card>
        ))}
      </Container>
    </Section>
  )
}

function Programs() {
  return (
    <Section id="programs" muted>
      <SectionHeader
        eyebrow="Programs"
        title="Focused ways to serve, support, and grow community capacity."
        description="The site structure is built so these programs can expand through data rather than duplicated page markup."
      />
      <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <ImageCard key={program.title} {...program} />
        ))}
      </Container>
    </Section>
  )
}

function Projects() {
  return (
    <Section id="projects">
      <SectionHeader
        eyebrow="Community work"
        title="Evidence of hope in action."
        description="Fundraising, donations, family visits, and Labour Day projects give supporters clear paths into real work."
      />
      <Container>
        <FeaturedCard {...projects[0]} />
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {projects.slice(1).map((project) => (
            <ImageCard key={project.title} {...project} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function StorySections() {
  return (
    <Section muted>
      <Container className="grid gap-8">
        {storyBlocks.map((block, index) => (
          <article
            key={block.title}
            className="grid overflow-hidden rounded-image border border-border bg-white shadow-[0_18px_60px_rgba(43,35,32,0.07)] lg:grid-cols-2"
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <img src={block.image} alt={block.alt} className="h-full min-h-80 w-full object-cover" loading="lazy" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
              <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.14em] text-primary">{block.eyebrow}</p>
              <h2 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">{block.title}</h2>
              <p className="mt-5 text-base font-medium leading-7 text-foreground/72 sm:text-lg">{block.description}</p>
              <Button asChild variant="outline" size="lg" className="mt-7 w-full sm:w-fit">
                <a href="#contact">
                  Get involved <ArrowRight size={17} aria-hidden="true" />
                </a>
              </Button>
            </div>
          </article>
        ))}
      </Container>
    </Section>
  )
}

function Gallery() {
  const featured = galleryImages.find((image) => image.featured) || galleryImages[0]
  const supporting = galleryImages.filter((image) => image.src !== featured.src)

  return (
    <Section id="gallery">
      <SectionHeader
        eyebrow="In the field"
        title="Real moments from Agape Hope’s community work."
        description="These photos bring the mission closer: volunteers, visits, rebuilding support, and the young people helping carry hope into Jamaican communities."
      />
      <Container className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="group overflow-hidden rounded-image border border-border bg-white shadow-[0_18px_60px_rgba(43,35,32,0.07)]">
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={featured.src}
              alt={featured.alt}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
          <p className="p-5 text-sm font-semibold leading-6 text-foreground/72">{featured.caption}</p>
        </article>
        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
          {supporting.map((image) => (
            <article key={image.src} className="overflow-hidden rounded-card border border-border bg-white">
              <div className="aspect-[4/3] overflow-hidden bg-muted lg:aspect-[16/9]">
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <p className="p-4 text-xs font-bold leading-5 text-foreground/68">{image.caption}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function Leadership() {
  return (
    <Section id="leadership" muted>
      <SectionHeader
        eyebrow="Leadership"
        title="A maintainable team section for a growing organization."
        description="Founders and executive roles live in a typed data file, so future board or team updates stay simple."
      />
      <Container className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {leadership.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </Container>
    </Section>
  )
}

function CTA() {
  return (
    <Section className="bg-foreground text-white">
      <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-white/58">
            <HeartHandshake size={18} aria-hidden="true" /> Get involved
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">Your help can become someone’s hope.</h2>
          <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-white/70">
            Volunteer, donate, partner, or ask how your group can support the next Agape Hope outreach effort.
          </p>
        </div>
        <LiquidGlassButton asChild size="xl">
          <a href="#contact">Start a conversation</a>
        </LiquidGlassButton>
      </Container>
    </Section>
  )
}

function FAQSection() {
  return (
    <Section>
      <SectionHeader eyebrow="FAQ" title="A few useful answers before you reach out." />
      <Container className="grid gap-4 lg:grid-cols-3">
        {faqs.map((faq) => (
          <Card key={faq.question}>
            <h3 className="font-display text-2xl font-bold leading-tight text-foreground">{faq.question}</h3>
            <p className="mt-3 text-sm leading-6 text-foreground/70">{faq.answer}</p>
          </Card>
        ))}
      </Container>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" muted>
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-primary">
            <Sparkles size={18} aria-hidden="true" /> Contact
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">Tell us how you want to help.</h2>
          <p className="mt-5 text-lg font-medium leading-8 text-foreground/72">
            Use the form for volunteering, donations, partnerships, media, or general inquiries. Messages can route through Formspree without a custom backend.
          </p>
          <div className="mt-6 rounded-card border border-border bg-white p-5 text-sm leading-6 text-foreground/72">
            <p className="font-bold text-foreground">{siteConfig.tagline}</p>
            <p className="mt-2">{siteConfig.contact.email}</p>
            <p>{siteConfig.contact.location}</p>
          </div>
        </div>
        <Card className="p-5 sm:p-6 lg:p-8">
          <ContactForm />
        </Card>
      </Container>
    </Section>
  )
}

export default function App() {
  useEffect(() => {
    if (!window.location.hash) return

    window.requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView()
    })
  }, [])

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Mission />
        <InvolvementPaths />
        <Programs />
        <Projects />
        <StorySections />
        <Gallery />
        <Leadership />
        <CTA />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
