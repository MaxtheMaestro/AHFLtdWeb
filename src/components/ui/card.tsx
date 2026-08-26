import type { HTMLAttributes } from "react"
import { cn } from "../../lib/utils"

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-white p-5 shadow-[0_18px_60px_rgba(43,35,32,0.07)]",
        className,
      )}
      {...props}
    />
  )
}
