import type { HTMLAttributes, ReactNode } from "react"
import { Container } from "./container"
import { cn } from "../../lib/utils"

export function Section({
  className,
  muted = false,
  ...props
}: HTMLAttributes<HTMLElement> & { muted?: boolean }) {
  return (
    <section
      className={cn("scroll-mt-24 py-14 sm:py-18 lg:py-24", muted && "bg-muted", className)}
      {...props}
    />
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string
  title: string
  description?: ReactNode
  align?: "left" | "center"
}) {
  return (
    <Container className={cn("mb-8 sm:mb-10", align === "center" && "text-center")}>
      {eyebrow ? <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.14em] text-primary">{eyebrow}</p> : null}
      <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 max-w-2xl text-base font-medium leading-7 text-foreground/72 sm:text-lg", align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </Container>
  )
}
