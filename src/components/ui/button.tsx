"use client"
import { forwardRef, ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-gradient-to-r from-[#00c8ff] to-[#0090cc] text-white hover:shadow-[0_4px_20px_rgba(0,200,255,0.3)] hover:-translate-y-0.5": variant === "primary",
            "bg-gradient-to-r from-[#ff6b35] to-[#e05520] text-white hover:shadow-[0_4px_20px_rgba(255,107,53,0.3)] hover:-translate-y-0.5": variant === "secondary",
            "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20": variant === "ghost",
            "bg-transparent text-[#00c8ff] border border-[#00c8ff]/30 hover:bg-[#00c8ff]/10": variant === "outline",
            "px-3 py-1.5 text-sm": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-8 py-3.5 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
