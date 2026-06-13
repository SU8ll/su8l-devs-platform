import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info"
  className?: string
}

export function Badge({ children, variant = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-[#00c8ff]/10 text-[#00c8ff] border border-[#00c8ff]/20": variant === "primary",
          "bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/20": variant === "secondary",
          "bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/20": variant === "success",
          "bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/20": variant === "warning",
          "bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20": variant === "danger",
          "bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/20": variant === "info",
        },
        className
      )}
    >
      {children}
    </span>
  )
}
