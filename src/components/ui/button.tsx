import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes } from "react"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-55",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white shadow-brand hover:bg-primary-hover",
        secondary: "bg-foreground text-white hover:bg-foreground/90",
        outline: "border border-border bg-white/80 text-foreground hover:border-primary hover:text-primary",
        ghost: "text-foreground hover:bg-muted",
        link: "min-h-0 rounded-none px-0 text-primary underline-offset-4 hover:underline",
        destructive: "bg-primary-hover text-white hover:bg-primary-hover/90",
      },
      size: {
        sm: "min-h-10 px-4 text-xs",
        default: "min-h-11 px-5",
        lg: "min-h-12 px-6 text-base",
        xl: "min-h-14 px-7 text-base",
        icon: "h-11 w-11 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
