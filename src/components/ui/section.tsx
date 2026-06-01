import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sectionVariants = cva(
  "",
  {
    variants: {
      spacing: {
        none: "",
        sm: "py-4 sm:py-6",
        default: "py-8 sm:py-12",
        lg: "py-12 sm:py-16",
        xl: "py-16 sm:py-24",
      },
    },
    defaultVariants: {
      spacing: "default",
    },
  }
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /** Use 'section' element (default) or 'div' */
  as?: "section" | "div"
}

function Section({ className, spacing, as = "section", ...props }: SectionProps) {
  const Comp = as
  return (
    <Comp
      className={cn(sectionVariants({ spacing }), className)}
      {...props}
    />
  )
}

/**
 * Section Header with title and optional description
 */
interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
}

function SectionHeader({ title, description, action, className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-6", className)} {...props}>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}

export { Section, SectionHeader, sectionVariants }
