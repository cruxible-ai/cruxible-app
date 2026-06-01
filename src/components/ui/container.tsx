import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva(
  "mx-auto w-full",
  {
    variants: {
      size: {
        sm: "max-w-screen-sm",      // 640px
        md: "max-w-screen-md",      // 768px
        lg: "max-w-screen-lg",      // 1024px
        xl: "max-w-screen-xl",      // 1280px
        "2xl": "max-w-screen-2xl",  // 1536px
        full: "max-w-full",
      },
      padding: {
        none: "",
        sm: "px-4",
        default: "px-4 sm:px-6 lg:px-8",
        lg: "px-6 sm:px-8 lg:px-12",
      },
    },
    defaultVariants: {
      size: "xl",
      padding: "default",
    },
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

function Container({ className, size, padding, ...props }: ContainerProps) {
  return (
    <div
      className={cn(containerVariants({ size, padding }), className)}
      {...props}
    />
  )
}

export { Container, containerVariants }
