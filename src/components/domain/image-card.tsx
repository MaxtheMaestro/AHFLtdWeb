import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "../ui/card"

type ImageCardProps = {
  title: string
  description: string
  image: string
  alt: string
  category?: string
  date?: string
}

export function ImageCard({ title, description, image, alt, category, date }: ImageCardProps) {
  return (
    <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="h-full overflow-hidden p-0">
        <div className="aspect-[4/3] overflow-hidden rounded-t-card bg-muted">
          <img src={image} alt={alt} className="h-full w-full object-cover transition duration-500 hover:scale-105" loading="lazy" />
        </div>
        <div className="p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
            {category ? <span>{category}</span> : null}
            {date ? <span className="text-foreground/45">{date}</span> : null}
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight text-foreground">{title}</h3>
          <p className="mt-3 text-sm font-medium leading-6 text-foreground/70">{description}</p>
        </div>
      </Card>
    </motion.article>
  )
}

export function FeaturedCard({ title, description, image, alt, category }: ImageCardProps) {
  return (
    <article className="grid overflow-hidden rounded-card border border-border bg-white shadow-[0_18px_60px_rgba(43,35,32,0.07)] lg:grid-cols-2">
      <div className="min-h-72 overflow-hidden bg-muted lg:min-h-full">
        <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        {category ? <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.14em] text-primary">{category}</p> : null}
        <h3 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">{title}</h3>
        <p className="mt-4 text-base font-medium leading-7 text-foreground/72">{description}</p>
        <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover">
          Partner with this work <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}
