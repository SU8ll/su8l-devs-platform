"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { formatNumber } from "@/lib/utils"
import { useLocale } from "@/components/language-provider"

const eventTypeData = [
  { value: "kill", labelKey: "calculator.eventKill", pointsPerTier: [100, 250, 500, 1000, 2500, 5000, 10000, 25000] },
  { value: "gather", labelKey: "calculator.eventGathering", pointsPerTier: [500, 1000, 2500, 5000, 10000, 25000, 50000, 100000] },
  { value: "building", labelKey: "calculator.eventBuilding", pointsPerTier: [200, 500, 1000, 2000, 5000, 10000, 20000, 50000] },
  { value: "training", labelKey: "calculator.eventTraining", pointsPerTier: [150, 400, 800, 1500, 4000, 8000, 15000, 40000] },
  { value: "research", labelKey: "calculator.eventResearch", pointsPerTier: [300, 600, 1200, 2500, 6000, 12000, 25000, 60000] },
]

export default function EventCalculator() {
  const { t } = useLocale()
  const [eventType, setEventType] = useState("kill")
  const [currentPoints, setCurrentPoints] = useState(0)
  const [result, setResult] = useState<{ currentTier: number; pointsToNext: number; nextTier: number; totalPointsToMax: number } | null>(null)

  const eventTypes = eventTypeData.map((e) => ({ ...e, label: t(e.labelKey) }))

  const handleCalculate = () => {
    const event = eventTypes.find((e) => e.value === eventType)
    if (!event) return

    let currentTier = 0
    let pointsToNext = 0
    let nextTier = 0

    for (let i = 0; i < event.pointsPerTier.length; i++) {
      if (currentPoints < event.pointsPerTier[i]) {
        currentTier = i
        pointsToNext = event.pointsPerTier[i] - currentPoints
        nextTier = i + 1
        break
      }
      currentTier = i + 1
    }

    if (currentTier >= event.pointsPerTier.length) {
      setResult({ currentTier: event.pointsPerTier.length, pointsToNext: 0, nextTier: event.pointsPerTier.length, totalPointsToMax: 0 })
      return
    }

    const totalPointsToMax = event.pointsPerTier[event.pointsPerTier.length - 1] - currentPoints

    setResult({ currentTier, pointsToNext, nextTier, totalPointsToMax })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2"><span className="gradient-text">{t("calculator.event")}</span></h1>
        <p className="text-[#a0a0b0] mb-8">{t("calculator.calculateEvent")}</p>

        <GlassCard className="mb-8">
          <GlassCardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#a0a0b0] mb-1">{t("calculator.eventType")}</label>
                <Select options={eventTypes} value={eventType} onChange={(e) => setEventType(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0b0] mb-1">{t("calculator.currentPoints")}</label>
                <input type="number" value={currentPoints} onChange={(e) => setCurrentPoints(Number(e.target.value))} className="input-glass w-full" min={0} />
              </div>
            </div>
            <Button onClick={handleCalculate} className="w-full">{t("calculator.calculate")}</Button>
          </GlassCardContent>
        </GlassCard>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle>{t("calculator.eventProgress")}</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-[#00c8ff]">{t("calculator.eventTier", { current: String(result.currentTier) })}</div>
                    <div className="text-xs text-[#a0a0b0] mt-1">{t("calculator.currentTier")}</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-[#ff6b35]">{formatNumber(result.pointsToNext)}</div>
                    <div className="text-xs text-[#a0a0b0] mt-1">{t("calculator.pointsToTier", { tier: String(result.nextTier) })}</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold text-[#fbbf24]">{formatNumber(result.totalPointsToMax)}</div>
                    <div className="text-xs text-[#a0a0b0] mt-1">{t("calculator.pointsToMax")}</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-3">{t("calculator.tierRequirements")}</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 px-3 text-[#a0a0b0]">{t("calculator.currentTier")}</th>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((t) => (
                            <th key={t} className={`text-right py-2 px-3 ${t <= result.currentTier ? "text-[#00c8ff]" : "text-[#a0a0b0]"}`}>{t}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-3 text-[#a0a0b0]">{t("calculator.currentPoints")}</td>
                          {eventTypes.find((e) => e.value === eventType)?.pointsPerTier.map((pts, i) => (
                            <td key={i} className={`text-right py-2 px-3 font-mono ${i < result.currentTier ? "text-[#34d399]" : "text-[#a0a0b0]"}`}>
                              {formatNumber(pts)}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
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
