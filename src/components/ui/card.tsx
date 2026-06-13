"use client"
import { HTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean
  hover?: boolean
  gradient?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow, hover, gradient, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-card p-6",
          glow && "glow",
          hover && "glass-card-hover",
          gradient && "gradient-border",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold text-white", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }
