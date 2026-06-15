"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader, GlassCardFooter } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { formatNumber } from "@/lib/utils"
import { useLocale } from "@/components/language-provider"

const GEAR_PIECES = ["Crown", "Pauldron", "Gauntlet", "Greaves", "Weapon", "Tome"]

const MAX_LEVEL = 58

const PIECE_BASES: Record<string, { satin: number; threads: number; visions: number }> = {
  Crown:    { satin: 200, threads: 100, visions: 3 },
  Pauldron: { satin: 80,  threads: 40,  visions: 2 },
  Gauntlet: { satin: 120, threads: 60,  visions: 2 },
  Greaves:  { satin: 60,  threads: 30,  visions: 1 },
  Weapon:   { satin: 180, threads: 90,  visions: 3 },
  Tome:     { satin: 50,  threads: 20,  visions: 1 },
}

function genCostArray(base: number, growth: number, maxLevel: number, startAt = 1): number[] {
  return Array.from({ length: maxLevel }, (_, i) => {
    if (i + 1 < startAt) return 0
    return Math.floor(base * Math.pow(growth, i))
  })
}

const COST_DATA = Object.fromEntries(
  GEAR_PIECES.map((name) => {
    const b = PIECE_BASES[name]
    return [
      name,
      {
        satin: genCostArray(b.satin, 1.08, MAX_LEVEL),
        threads: genCostArray(b.threads, 1.08, MAX_LEVEL),
        visions: genCostArray(b.visions, 1.12, MAX_LEVEL, 10),
      },
    ]
  })
)

function getGearLevelOptions(t: (path: string, params?: Record<string, string>) => string, max: number, offset = 0) {
  return Array.from({ length: max }, (_, i) => ({
    value: i + offset,
    label: t("calculator.levelOption", { level: String(i + offset) }),
  }))
}

const ICONS: Record<string, string> = {
  Crown: "\u{1F451}",
  Pauldron: "\u{1F6E1}\u{FE0F}",
  Gauntlet: "\u{1F91A}",
  Greaves: "\u{1F462}",
  Weapon: "\u{2694}\u{FE0F}",
  Tome: "\u{1F4D6}",
}

interface PieceCosts {
  satin: number
  threads: number
  visions: number
}

export default function GovernorGearCalculator() {
  const { t } = useLocale()
  const [currentLevels, setCurrentLevels] = useState<Record<string, number>>(
    Object.fromEntries(GEAR_PIECES.map((name) => [name, 0]))
  )
  const [targetLevels, setTargetLevels] = useState<Record<string, number>>(
    Object.fromEntries(GEAR_PIECES.map((name) => [name, 1]))
  )
  const [results, setResults] = useState<Record<string, PieceCosts | null>>(
    Object.fromEntries(GEAR_PIECES.map((name) => [name, null]))
  )

  const currentLevelOptions = getGearLevelOptions(t, MAX_LEVEL, 0)
  const targetLevelOptions = getGearLevelOptions(t, MAX_LEVEL, 1)

  const handleCurrentChange = (piece: string, value: number) => {
    const v = Math.min(Math.max(0, value), MAX_LEVEL - 1)
    setCurrentLevels((prev) => ({ ...prev, [piece]: v }))
    setTargetLevels((prev) => {
      if (v >= prev[piece]) return { ...prev, [piece]: v + 1 }
      return prev
    })
    setResults((prev) => ({ ...prev, [piece]: null }))
  }

  const handleTargetChange = (piece: string, value: number) => {
    const v = Math.min(Math.max(currentLevels[piece] + 1, value), MAX_LEVEL)
    setTargetLevels((prev) => ({ ...prev, [piece]: v }))
    setResults((prev) => ({ ...prev, [piece]: null }))
  }

  const handleCalculateAll = () => {
    const newResults: Record<string, PieceCosts> = {}
    for (const piece of GEAR_PIECES) {
      const from = currentLevels[piece]
      const to = targetLevels[piece]
      if (from >= to) {
        newResults[piece] = { satin: 0, threads: 0, visions: 0 }
        continue
      }
      const costs = COST_DATA[piece]
      let satin = 0, threads = 0, visions = 0
      for (let level = from + 1; level <= to; level++) {
        const idx = level - 1
        satin += costs.satin[idx]
        threads += costs.threads[idx]
        visions += costs.visions[idx]
      }
      newResults[piece] = { satin, threads, visions }
    }
    setResults(newResults)
  }

  const hasAnyResults = Object.values(results).some((r) => r !== null)

  const grandTotals = hasAnyResults
    ? GEAR_PIECES.reduce(
        (acc, piece) => {
          const r = results[piece]
          if (r) {
            acc.satin += r.satin
            acc.threads += r.threads
            acc.visions += r.visions
          }
          return acc
        },
        { satin: 0, threads: 0, visions: 0 }
      )
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-[#00c8ff]">{t("calculator.governorGear")}</h1>

      <GlassCard>
        <GlassCardHeader>
          <GlassCardTitle>{t("calculator.gearConfiguration")}</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
                  <th className="p-3 text-left font-medium">{t("calculator.piece")}</th>
                  <th className="p-3 text-left font-medium">{t("calculator.currentLevel")}</th>
                  <th className="p-3 text-left font-medium">{t("calculator.targetLevel")}</th>
                  <th className="p-3 text-right font-medium">{t("calculator.satin")}</th>
                  <th className="p-3 text-right font-medium">{t("calculator.threads")}</th>
                  <th className="p-3 text-right font-medium">{t("calculator.artisansVisions")}</th>
                </tr>
              </thead>
              <tbody>
                {GEAR_PIECES.map((piece, i) => {
                  const res = results[piece]
                  return (
                    <tr
                      key={piece}
                      className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.06]"}`}
                    >
                      <td className="p-3 text-white font-medium whitespace-nowrap">
                        {ICONS[piece]} {piece}
                      </td>
                      <td className="p-3 min-w-[130px]">
                        <Select
                          options={currentLevelOptions}
                          value={currentLevels[piece]}
                          onChange={(e) => handleCurrentChange(piece, Number(e.target.value))}
                        />
                      </td>
                      <td className="p-3 min-w-[130px]">
                        <Select
                          options={targetLevelOptions}
                          value={targetLevels[piece]}
                          onChange={(e) => handleTargetChange(piece, Number(e.target.value))}
                        />
                      </td>
                      <td className="p-3 text-right text-[#00c8ff] font-medium whitespace-nowrap">
                        {res !== null ? formatNumber(res.satin) : "-"}
                      </td>
                      <td className="p-3 text-right text-[#ff6b35] font-medium whitespace-nowrap">
                        {res !== null ? formatNumber(res.threads) : "-"}
                      </td>
                      <td className="p-3 text-right text-[#7c3aed] font-medium whitespace-nowrap">
                        {res !== null ? formatNumber(res.visions) : "-"}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </GlassCardContent>
        <GlassCardFooter>
          <Button onClick={handleCalculateAll} className="w-full">
            {t("calculator.calculateAll")}
          </Button>
        </GlassCardFooter>
      </GlassCard>

      {grandTotals && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <GlassCard glow>
            <GlassCardHeader>
              <GlassCardTitle>{t("calculator.combinedSummary")}</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[#00c8ff]/20 bg-[#00c8ff]/5 p-4 text-center">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{t("calculator.total")} {t("calculator.satin")}</p>
                  <p className="text-2xl font-bold text-[#00c8ff]">{formatNumber(grandTotals.satin)}</p>
                </div>
                <div className="rounded-xl border border-[#ff6b35]/20 bg-[#ff6b35]/5 p-4 text-center">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{t("calculator.total")} {t("calculator.threads")}</p>
                  <p className="text-2xl font-bold text-[#ff6b35]">{formatNumber(grandTotals.threads)}</p>
                </div>
                <div className="rounded-xl border border-[#7c3aed]/20 bg-[#7c3aed]/5 p-4 text-center">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{t("calculator.total")} {t("calculator.artisansVisions")}</p>
                  <p className="text-2xl font-bold text-[#7c3aed]">{formatNumber(grandTotals.visions)}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-6 text-center text-xs text-white/40">
                {GEAR_PIECES.map((piece) => {
                  const res = results[piece]
                  const from = currentLevels[piece]
                  const to = targetLevels[piece]
                  return (
                    <div key={piece}>
                      {piece}: {from} &rarr; {to}
                      {res !== null && ` (${to - from} lv)`}
                    </div>
                  )
                })}
              </div>
            </GlassCardContent>
          </GlassCard>
        </motion.div>
      )}
    </motion.div>
  )
}
