"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { CALCULATOR_LIST } from "@/lib/constants"
import { useLocale } from "@/components/language-provider"

const categories = [...new Set(CALCULATOR_LIST.map((c) => c.category))]

export default function CalculatorsPage() {
  const { t } = useLocale()
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">{t("kingshot.calculatorsTitle")}</span>
        </h1>
        <p className="text-[#a0a0b0] text-lg max-w-2xl mx-auto">
          {t("kingshot.calculatorsDesc")}
        </p>
      </motion.div>

      {categories.map((category, ci) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ci * 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 capitalize flex items-center gap-3">
            <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#00c8ff] to-[#7c3aed]" />
            {t("kingshot.calculatorsCategoryTools", { category })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CALCULATOR_LIST.filter((c) => c.category === category).map((calc, i) => (
              <motion.div
                key={calc.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/tools/calculators/${calc.slug}`}>
                  <GlassCard hover className="h-full">
                    <GlassCardContent>
                      <div className="flex items-start gap-4 mb-3">
                        <span className="text-3xl">{calc.icon}</span>
                        <div>
                          <GlassCardTitle>{calc.title}</GlassCardTitle>
                          <p className="text-sm text-[#a0a0b0] mt-1">
                            {t("kingshot.calculatorsCalcDesc", { tool: calc.title })}
                          </p>
                        </div>
                      </div>
                      <Badge variant="primary" className="capitalize">
                        {category}
                      </Badge>
                    </GlassCardContent>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
