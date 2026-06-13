"use client"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
  onClick?: () => void
}

export function GlassCard({ children, className, glow, hover, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card p-6",
        glow && "glow",
        hover && "glass-card-hover cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  )
}

export function GlassCardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex items-center justify-between mb-4", className)}>{children}</div>
}

export function GlassCardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>
}

export function GlassCardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>
}

export function GlassCardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mt-4 pt-4 border-t border-white/5", className)}>{children}</div>
}
