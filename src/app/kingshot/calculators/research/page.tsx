"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { formatNumber } from "@/lib/utils"
import { calculateMasterCost, calculateWarAcademyCost, calculatePetCost } from "@/lib/utils"
import { useLocale } from "@/components/language-provider"

type ResearchType = "master" | "war-academy" | "pet"

interface LevelCost {
  level: number
  tomes?: number
  books?: number
  food?: number
  gold?: number
  time?: number
  timeFormatted?: string
}

const MAX_LEVELS: Record<ResearchType, number> = {
  master: 100,
  "war-academy": 35,
  pet: 50,
}

let TYPE_OPTIONS: { value: string; label: string }[] = []

function getTypeOptions(t: (path: string) => string) {
  return [
    { value: "master", label: t("calculator.master") },
    { value: "war-academy", label: t("calculator.warAcademy") },
    { value: "pet", label: t("calculator.pet") },
  ]
}

function formatTime(seconds: number): string {
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const parts: string[] = []
  if (d > 0) parts.push(`${d}d`)
  if (h > 0) parts.push(`${h}h`)
  if (m > 0) parts.push(`${m}m`)
  if (s > 0 || parts.length === 0) parts.push(`${s}s`)
  return parts.join(" ")
}

export default function ResearchCalculatorPage() {
  const { t } = useLocale()
  const [type, setType] = useState<ResearchType>("master")
  const [currentLevel, setCurrentLevel] = useState(1)
  const [targetLevel, setTargetLevel] = useState(2)
  const [results, setResults] = useState<LevelCost[] | null>(null)

  const typeOptions = getTypeOptions(t)
  const maxLevel = MAX_LEVELS[type]

  const currentOptions = Array.from({ length: maxLevel - 1 }, (_, i) => ({
    value: i + 1,
    label: `Level ${i + 1}`,
  }))

  const targetOptions = Array.from({ length: maxLevel - currentLevel }, (_, i) => ({
    value: currentLevel + i + 1,
    label: `Level ${currentLevel + i + 1}`,
  }))

  function handleTypeChange(value: string) {
    const newType = value as ResearchType
    setType(newType)
    const newMax = MAX_LEVELS[newType]
    setCurrentLevel(1)
    setTargetLevel(2)
    setResults(null)
  }

  function calculate() {
    const rows: LevelCost[] = []
    for (let lvl = currentLevel + 1; lvl <= targetLevel; lvl++) {
      let row: LevelCost = { level: lvl }
      if (type === "master") {
        const c = calculateMasterCost(lvl)
        row.tomes = c.tomes
        row.gold = c.gold
      } else if (type === "war-academy") {
        const c = calculateWarAcademyCost(lvl)
        row.books = c.books
        row.gold = c.gold
      } else {
        const c = calculatePetCost(lvl)
        row.food = c.food
        row.time = c.time
        row.timeFormatted = formatTime(c.time)
      }
      rows.push(row)
    }
    setResults(rows)
  }

  function getTotals() {
    if (!results || results.length === 0) return null
    const totals: Record<string, number> = {}
    for (const row of results) {
      for (const [key, val] of Object.entries(row)) {
        if (key === "level" || key === "timeFormatted") continue
        if (typeof val === "number") {
          totals[key] = (totals[key] || 0) + val
        }
      }
    }
    return totals
  }

  const totals = getTotals()
  const hasTime = results?.[0]?.time !== undefined

  return (
    <div className="min-h-screen bg-[#06060e] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>{t("calculator.research")}</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">{t("calculator.researchType")}</label>
                <Select
                  options={typeOptions}
                  value={type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">{t("calculator.currentLevel")}</label>
                  <Select
                    options={currentOptions}
                    value={currentLevel}
                    onChange={(e) => {
                      const v = Number(e.target.value)
                      setCurrentLevel(v)
                      if (targetLevel <= v) setTargetLevel(v + 1)
                      setResults(null)
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1">{t("calculator.targetLevel")}</label>
                  <Select
                    options={targetOptions}
                    value={targetLevel}
                    onChange={(e) => {
                      setTargetLevel(Number(e.target.value))
                      setResults(null)
                    }}
                  />
                </div>
              </div>
              <Button onClick={calculate} className="w-full">
                {t("calculator.calculate")}
              </Button>
            </GlassCardContent>
          </GlassCard>
        </motion.div>

        {results && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle>{t("calculator.levelBreakdown")}</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-white/60 border-b border-white/10">
                        <th className="text-left py-2 px-3 sticky top-0 bg-[#0a0a1a]">{t("calculator.level")}</th>
                        {type === "master" && (
                          <>
                            <th className="text-right py-2 px-3 sticky top-0 bg-[#0a0a1a]">{t("calculator.tomes")}</th>
                            <th className="text-right py-2 px-3 sticky top-0 bg-[#0a0a1a]">{t("calculator.gold")}</th>
                          </>
                        )}
                        {type === "war-academy" && (
                          <>
                            <th className="text-right py-2 px-3 sticky top-0 bg-[#0a0a1a]">{t("calculator.academyBooks")}</th>
                            <th className="text-right py-2 px-3 sticky top-0 bg-[#0a0a1a]">{t("calculator.gold")}</th>
                          </>
                        )}
                        {type === "pet" && (
                          <>
                            <th className="text-right py-2 px-3 sticky top-0 bg-[#0a0a1a]">{t("calculator.food")}</th>
                            <th className="text-right py-2 px-3 sticky top-0 bg-[#0a0a1a]">{t("calculator.time")}</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((row, i) => (
                        <tr
                          key={row.level}
                          className={
                            i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.06]"
                          }
                        >
                          <td className="py-2 px-3 font-medium text-[#00c8ff]">
                            {row.level}
                          </td>
                          {type === "master" && (
                            <>
                              <td className="text-right py-2 px-3">{formatNumber(row.tomes!)}</td>
                              <td className="text-right py-2 px-3 text-[#ff6b35]">{formatNumber(row.gold!)}</td>
                            </>
                          )}
                          {type === "war-academy" && (
                            <>
                              <td className="text-right py-2 px-3">{formatNumber(row.books!)}</td>
                              <td className="text-right py-2 px-3 text-[#ff6b35]">{formatNumber(row.gold!)}</td>
                            </>
                          )}
                          {type === "pet" && (
                            <>
                              <td className="text-right py-2 px-3">{formatNumber(row.food!)}</td>
                              <td className="text-right py-2 px-3">{row.timeFormatted}</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                    {totals && (
                      <tfoot>
                        <tr className="border-t border-[#00c8ff]/30 font-semibold">
                          <td className="py-2 px-3 text-[#00c8ff]">{t("calculator.total")}</td>
                          {type === "master" && (
                            <>
                              <td className="text-right py-2 px-3">{formatNumber(totals.tomes!)}</td>
                              <td className="text-right py-2 px-3 text-[#ff6b35]">{formatNumber(totals.gold!)}</td>
                            </>
                          )}
                          {type === "war-academy" && (
                            <>
                              <td className="text-right py-2 px-3">{formatNumber(totals.books!)}</td>
                              <td className="text-right py-2 px-3 text-[#ff6b35]">{formatNumber(totals.gold!)}</td>
                            </>
                          )}
                          {type === "pet" && (
                            <>
                              <td className="text-right py-2 px-3">{formatNumber(totals.food!)}</td>
                              <td className="text-right py-2 px-3">{hasTime ? formatTime(totals.time!) : ""}</td>
                            </>
                          )}
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </GlassCardContent>
            </GlassCard>

            <GlassCard className="mt-4">
              <GlassCardHeader>
                <GlassCardTitle>{t("calculator.summary")}</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="grid grid-cols-2 gap-4">
                  {totals &&
                    Object.entries(totals).map(([key, val]) => {
                      if (key === "time") return null
                      const label = key.charAt(0).toUpperCase() + key.slice(1)
                      return (
                        <div key={key} className="bg-white/[0.03] rounded-xl p-4">
                          <div className="text-sm text-white/60">{label}</div>
                          <div className="text-xl font-bold text-[#00c8ff]">
                            {formatNumber(val)}
                          </div>
                        </div>
                      )
                    })}
                  {hasTime && totals?.time && (
                    <div className="bg-white/[0.03] rounded-xl p-4">
                      <div className="text-sm text-white/60">{t("calculator.time")}</div>
                      <div className="text-xl font-bold text-[#00c8ff]">
                        {formatTime(totals.time)}
                      </div>
                    </div>
                  )}
                </div>
              </GlassCardContent>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  )
}
