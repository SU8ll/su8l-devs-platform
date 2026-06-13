"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-[#06060e]/80 backdrop-blur-xl border-b border-white/5" />
      <div className="relative max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c8ff] to-[#7c3aed] flex items-center justify-center text-sm font-bold">
            S
          </div>
          <span className="font-bold text-lg hidden sm:block">{SITE_NAME}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.slice(0, 6).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-lg text-sm transition-colors",
                pathname === item.href
                  ? "text-[#00c8ff] bg-[#00c8ff]/10"
                  : "text-[#a0a0b0] hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="group relative">
            <button className="px-3 py-2 rounded-lg text-sm text-[#a0a0b0] hover:text-white hover:bg-white/5 transition-colors">
              More ▾
            </button>
            <div className="absolute top-full right-0 mt-1 w-48 py-2 glass-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {NAV_ITEMS.slice(6).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-[#a0a0b0] hover:text-white hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Get Started</Button>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass-card mx-4 mt-2 p-4">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm transition-colors",
                  pathname === item.href
                    ? "text-[#00c8ff] bg-[#00c8ff]/10"
                    : "text-[#a0a0b0] hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
