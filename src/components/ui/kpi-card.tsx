import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

const kpiValueVariants = cva(
  "text-3xl font-bold tracking-tight",
  {
    variants: {
      trend: {
        default: "",
        positive: "text-success",
        negative: "text-destructive",
        neutral: "text-muted-foreground",
      },
    },
    defaultVariants: {
      trend: "default",
    },
  }
)

export interface KPICardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof kpiValueVariants> {
  /** Label describing the metric */
  label: string
  /** The main value to display */
  value: string | number
  /** Optional secondary text (e.g., change percentage) */
  change?: string
  /** Whether the change is positive, negative, or neutral */
  changeType?: "positive" | "negative" | "neutral"
  /** Optional icon to display */
  icon?: React.ReactNode
  /** Loading state */
  loading?: boolean
}

function KPICard({
  label,
  value,
  change,
  changeType,
  trend,
  icon,
  loading = false,
  className,
  ...props
}: KPICardProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            {loading ? (
              <div className="h-9 w-24 bg-muted animate-pulse rounded" />
            ) : (
              <p className={cn(kpiValueVariants({ trend }))}>{value}</p>
            )}
            {change && !loading && (
              <p
                className={cn(
                  "text-sm font-medium",
                  changeType === "positive" && "text-success",
                  changeType === "negative" && "text-destructive",
                  changeType === "neutral" && "text-muted-foreground"
                )}
              >
                {change}
              </p>
            )}
          </div>
          {icon && (
            <div className="text-muted-foreground">{icon}</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * KPI Grid - Responsive grid layout for KPI cards
 */
interface KPIGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns at different breakpoints */
  cols?: 2 | 3 | 4
}

function KPIGrid({ cols = 4, className, children, ...props }: KPIGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        cols === 2 && "grid-cols-1 sm:grid-cols-2",
        cols === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        cols === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { KPICard, KPIGrid, kpiValueVariants }
