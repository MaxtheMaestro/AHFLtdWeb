import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes } from "react"
import { cn } from "../../lib/utils"

const liquidGlassVariants = cva(
  "group relative inline-flex min-h-12 isolate items-center justify-center overflow-hidden rounded-full border border-white/45 px-6 text-sm font-bold text-white shadow-[0_20px_60px_rgba(122,25,19,0.28)] transition duration-300 before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.34),rgba(255,255,255,0.08)_35%,rgba(179,38,30,0.72))] before:backdrop-blur-md after:absolute after:inset-x-4 after:top-1 after:h-px after:bg-white/70 hover:scale-[1.025] hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-hover disabled:pointer-events-none disabled:opacity-55 supports-[backdrop-filter]:bg-white/10",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        secondary: "bg-foreground shadow-[0_20px_60px_rgba(43,35,32,0.22)]",
        outline: "border-primary/35 bg-white/40 text-primary shadow-[0_16px_42px_rgba(122,25,19,0.13)] before:bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(247,243,240,0.34),rgba(179,38,30,0.12))]",
      },
      size: {
        default: "min-h-12 px-6",
        lg: "min-h-13 px-7 text-base",
        xl: "min-h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

export type LiquidGlassButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof liquidGlassVariants> & {
    asChild?: boolean
  }

export function LiquidGlassButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: LiquidGlassButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(
        liquidGlassVariants({ variant, size }),
        "motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  )
}
