"use client"

import { useState, useRef, useEffect } from "react"
import { useLocale } from "@/components/language-provider"
import { locales, localeLabels } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

const flags: Record<Locale, string> = {
  en: "🇬🇧",
  ar: "🇸🇦",
  de: "🇩🇪",
  tr: "🇹🇷",
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-[#a0a0b0] hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
      >
        <span>{flags[locale]}</span>
        <span className="hidden sm:inline">{localeLabels[locale]}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 w-40 py-1 glass-card border border-white/10 z-50">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => { setLocale(l); setOpen(false) }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors ${locale === l ? "text-[#00c8ff] bg-[#00c8ff]/10" : "text-[#a0a0b0] hover:text-white hover:bg-white/5"}`}
            >
              <span>{flags[l]}</span>
              <span>{localeLabels[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
