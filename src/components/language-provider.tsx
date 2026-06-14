"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import type { Locale } from "@/lib/i18n"
import { t as translate } from "@/lib/i18n"

type LanguageContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (path: string, params?: Record<string, string>) => string
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: (path) => path,
  dir: "ltr",
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const saved = localStorage.getItem("su8l_locale") as Locale | null
    if (saved && ["en", "ar", "de", "tr"].includes(saved)) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("su8l_locale", newLocale)
  }

  const dir = locale === "ar" ? "rtl" : "ltr"

  const t = (path: string, params?: Record<string, string>) => translate(locale, path, params)

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir }}>
      <div dir={dir}>{children}</div>
    </LanguageContext.Provider>
  )
}

export function useLocale() {
  return useContext(LanguageContext)
}
