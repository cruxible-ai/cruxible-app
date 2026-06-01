import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",
        success:
          "border-transparent bg-success text-success-foreground shadow-sm hover:bg-success/80",
        warning:
          "border-transparent bg-warning text-warning-foreground shadow-sm hover:bg-warning/80",
        outline:
          "text-foreground border-border",
        // Soft variants (lighter backgrounds with colored text)
        "success-soft":
          "border-success/30 bg-success/15 text-success hover:bg-success/25",
        "warning-soft":
          "border-warning/30 bg-warning/15 text-warning hover:bg-warning/25",
        "destructive-soft":
          "border-destructive/30 bg-destructive/15 text-destructive hover:bg-destructive/25",
        "primary-soft":
          "border-primary/30 bg-primary/15 text-primary hover:bg-primary/25",
        "muted":
          "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional dot indicator before the text */
  dot?: boolean
  /** Dot color (uses variant color by default) */
  dotColor?: string
}

function Badge({ className, variant, size, dot, dotColor, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full mr-1.5",
            dotColor ? "" : "bg-current"
          )}
          style={dotColor ? { backgroundColor: dotColor } : undefined}
        />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
