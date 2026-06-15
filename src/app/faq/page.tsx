"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { GlassCard, GlassCardContent } from "@/components/glass-card"
import { useLocale } from "@/components/language-provider"

const faqKeys = Array.from({ length: 12 }, (_, i) => i + 1)

export default function FAQPage() {
  const { t } = useLocale()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="relative overflow-hidden pt-24">
      <div className="hero-glow left-1/4 top-1/4 bg-[#00c8ff]/30" />
      <div className="hero-glow right-1/4 bottom-1/4 bg-[#7c3aed]/30" />

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl mb-4">
              {t("faq.title")}
            </h1>
            <p className="text-[#a0a0b0] max-w-lg mx-auto">
              {t("faq.desc")}
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqKeys.map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <GlassCard
                  className="cursor-pointer transition-all duration-300 hover:border-[#00c8ff]/20"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <GlassCardContent className="py-4 px-6">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold text-white text-sm sm:text-base">{t(`faq.q${i + 1}`)}</h3>
                      <svg
                        className={`w-5 h-5 shrink-0 text-[#a0a0b0] transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-white/5"
                      >
                        <p className="text-sm text-[#a0a0b0] leading-relaxed">{t(`faq.a${i + 1}`)}</p>
                      </motion.div>
                    )}
                  </GlassCardContent>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
