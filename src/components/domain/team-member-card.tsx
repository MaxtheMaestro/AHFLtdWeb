import { Mail } from "lucide-react"
import type { TeamMember } from "../../data/content"
import { Card } from "../ui/card"

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Card className="h-full">
      <div className="aspect-[5/4] overflow-hidden rounded-image bg-muted">
        <img
          src={member.image}
          alt={member.imageAlt || `Agape Hope team image for ${member.name}`}
          className="h-full w-full object-cover object-center"
          style={{ objectPosition: member.objectPosition || "center" }}
          loading="lazy"
        />
      </div>
      <div className="mt-5">
        <h3 className="font-display text-2xl font-bold leading-tight text-foreground">{member.name}</h3>
        <p className="mt-1 text-sm font-extrabold uppercase tracking-[0.11em] text-primary">{member.title}</p>
        {member.bio ? (
          member.quote ? (
            <blockquote className="mt-4 border-l-2 border-primary/35 pl-4 text-sm font-medium italic leading-6 text-foreground/72">
              &ldquo;{member.bio}&rdquo;
            </blockquote>
          ) : (
            <p className="mt-3 text-sm font-medium leading-6 text-foreground/70">{member.bio}</p>
          )
        ) : null}
        {member.email ? (
          <a href={`mailto:${member.email}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
            <Mail size={16} aria-hidden="true" /> Email
          </a>
        ) : null}
      </div>
    </Card>
  )
}
