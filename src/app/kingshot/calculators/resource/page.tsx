"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { formatNumber, formatTime } from "@/lib/utils"
import { useLocale } from "@/components/language-provider"

const resourceTypes = [
  { value: "wood", label: "Wood", basePerHour: 5000, icon: "🪵" },
  { value: "stone", label: "Stone", basePerHour: 4000, icon: "🪨" },
  { value: "iron", label: "Iron", basePerHour: 3000, icon: "⛏️" },
  { value: "bread", label: "Bread", basePerHour: 6000, icon: "🍞" },
  { value: "gold", label: "Gold", basePerHour: 2000, icon: "👑" },
]

export default function ResourceCalculator() {
  const { t } = useLocale()
  const [resource, setResource] = useState("wood")
  const [amount, setAmount] = useState(100000)
  const [bonus, setBonus] = useState(0)
  const [result, setResult] = useState<{ hours: number; minutes: number; days: number } | null>(null)

  const handleCalculate = () => {
    const selected = resourceTypes.find((r) => r.value === resource)
    if (!selected) return
    const rate = selected.basePerHour * (1 + bonus / 100)
    const hours = amount / rate
    setResult({
      hours: hours,
      minutes: hours * 60,
      days: hours / 24,
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2"><span className="gradient-text">{t("calculator.resource")}</span></h1>
        <p className="text-[#a0a0b0] mb-8">{t("calculator.calculateResource")}</p>

        <GlassCard className="mb-8">
          <GlassCardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-[#a0a0b0] mb-1">{t("calculator.resourceType")}</label>
                <Select options={resourceTypes} value={resource} onChange={(e) => setResource(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0b0] mb-1">{t("calculator.amountNeeded")}</label>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="input-glass w-full" min={1} />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0b0] mb-1">{t("calculator.gatheringBonus")}</label>
                <input type="number" value={bonus} onChange={(e) => setBonus(Number(e.target.value))} className="input-glass w-full" min={0} max={200} />
              </div>
            </div>
            <Button onClick={handleCalculate} className="w-full">{t("calculator.calculateTime")}</Button>
          </GlassCardContent>
        </GlassCard>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle>{t("calculator.timeRequired")}</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-[#00c8ff]">{formatTime(result.hours * 3600)}</div>
                    <div className="text-xs text-[#a0a0b0] mt-1">{t("calculator.hms")}</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-[#ff6b35]">{result.minutes.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                    <div className="text-xs text-[#a0a0b0] mt-1">{t("calculator.totalMinutes")}</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-[#fbbf24]">{result.days.toFixed(1)}</div>
                    <div className="text-xs text-[#a0a0b0] mt-1">{t("calculator.days")}</div>
                  </div>
                </div>
              </GlassCardContent>
            </GlassCard>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
