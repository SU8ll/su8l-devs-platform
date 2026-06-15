"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { formatNumber, calculateMasterCost } from "@/lib/utils"
import { useLocale } from "@/components/language-provider"

export default function MasterCalculator() {
  const { t } = useLocale()
  const [fromLevel, setFromLevel] = useState(1)
  const [toLevel, setToLevel] = useState(2)
  const [results, setResults] = useState<{ level: number; tomes: number; gold: number }[] | null>(null)

  const levels = Array.from({ length: 100 }, (_, i) => ({ value: i + 1, label: t("calculator.levelOption", { level: String(i + 1) }) }))

  const handleCalculate = () => {
    const data = []
    for (let lvl = fromLevel + 1; lvl <= toLevel; lvl++) {
      const cost = calculateMasterCost(lvl)
      data.push({ level: lvl, tomes: cost.tomes, gold: cost.gold })
    }
    setResults(data)
  }

  const totals = results ? results.reduce((acc, r) => ({ tomes: acc.tomes + r.tomes, gold: acc.gold + r.gold }), { tomes: 0, gold: 0 }) : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2"><span className="gradient-text">{t("calculator.master")}</span></h1>
        <p className="text-[#a0a0b0] mb-8">{t("calculator.calculateMaster")}</p>

        <GlassCard className="mb-8">
          <GlassCardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#a0a0b0] mb-1">{t("calculator.fromLevel")}</label>
                <Select options={levels.slice(0, -1)} value={fromLevel} onChange={(e) => { setFromLevel(Number(e.target.value)); setResults(null) }} />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0b0] mb-1">{t("calculator.toLevel")}</label>
                <Select options={levels.slice(fromLevel)} value={toLevel} onChange={(e) => { setToLevel(Number(e.target.value)); setResults(null) }} />
              </div>
            </div>
            <Button onClick={handleCalculate} className="w-full">{t("calculator.calculate")}</Button>
          </GlassCardContent>
        </GlassCard>

        {results && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle>{t("calculator.results")}: {t("calculator.level")} {fromLevel} → {toLevel}</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("calculator.level")}</th>
                        <th className="text-right py-3 px-4 text-[#00c8ff]">{t("calculator.tomes")}</th>
                        <th className="text-right py-3 px-4 text-[#fbbf24]">{t("calculator.gold")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r) => (
                        <tr key={r.level} className="border-b border-white/5 hover:bg-white/[0.02]">
                          <td className="py-2 px-4">{t("calculator.level")} {r.level}</td>
                          <td className="py-2 px-4 text-right text-[#00c8ff]">{formatNumber(r.tomes)}</td>
                          <td className="py-2 px-4 text-right text-[#fbbf24]">{formatNumber(r.gold)}</td>
                        </tr>
                      ))}
                    </tbody>
                    {totals && (
                      <tfoot>
                        <tr className="border-t-2 border-[#00c8ff]/30 bg-[#00c8ff]/5">
                          <td className="py-3 px-4 font-bold">{t("calculator.total")}</td>
                          <td className="py-3 px-4 text-right font-bold text-[#00c8ff]">{formatNumber(totals.tomes)}</td>
                          <td className="py-3 px-4 text-right font-bold text-[#fbbf24]">{formatNumber(totals.gold)}</td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </GlassCardContent>
            </GlassCard>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
