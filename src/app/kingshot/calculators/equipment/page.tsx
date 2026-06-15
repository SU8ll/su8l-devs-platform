"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { formatNumber } from "@/lib/utils"
import { EQUIPMENT_PIECES } from "@/lib/constants"
import { useLocale } from "@/components/language-provider"

function genCost(base: number, growth: number, maxLevel: number, startAt = 1): number[] {
  return Array.from({ length: maxLevel }, (_, i) => {
    if (i + 1 < startAt) return 0
    return Math.floor(base * Math.pow(growth, i))
  })
}

const MAX_LEVEL = 58

const EQUIPMENT_CONFIG: Record<string, { satin: number[]; threads: number[]; visions: number[] }> = {
  Crown: {
    satin: genCost(200, 1.08, MAX_LEVEL),
    threads: genCost(100, 1.08, MAX_LEVEL),
    visions: genCost(1, 1.12, MAX_LEVEL, 10),
  },
  Pauldron: {
    satin: genCost(80, 1.08, MAX_LEVEL),
    threads: genCost(40, 1.08, MAX_LEVEL),
    visions: genCost(1, 1.12, MAX_LEVEL, 10),
  },
  Gauntlet: {
    satin: genCost(120, 1.08, MAX_LEVEL),
    threads: genCost(60, 1.08, MAX_LEVEL),
    visions: genCost(1, 1.12, MAX_LEVEL, 10),
  },
  Greaves: {
    satin: genCost(60, 1.08, MAX_LEVEL),
    threads: genCost(30, 1.08, MAX_LEVEL),
    visions: genCost(1, 1.12, MAX_LEVEL, 10),
  },
  Weapon: {
    satin: genCost(180, 1.08, MAX_LEVEL),
    threads: genCost(90, 1.08, MAX_LEVEL),
    visions: genCost(1, 1.12, MAX_LEVEL, 10),
  },
  Tome: {
    satin: genCost(50, 1.08, MAX_LEVEL),
    threads: genCost(20, 1.08, MAX_LEVEL),
    visions: genCost(1, 1.12, MAX_LEVEL, 10),
  },
}

const pieceNames = EQUIPMENT_PIECES

function getLevelOptions(t: (path: string, params?: Record<string, string>) => string, max: number, offset = 0) {
  return Array.from({ length: max }, (_, i) => ({
    value: i + offset,
    label: t("calculator.levelOption", { level: String(i + offset) }),
  }))
}

interface LevelCost {
  level: number
  satin: number
  threads: number
  visions: number
}

export default function EquipmentCalculator() {
  const { t } = useLocale()
  const [selectedPiece, setSelectedPiece] = useState(pieceNames[0])
  const [currentLevel, setCurrentLevel] = useState(0)
  const [targetLevel, setTargetLevel] = useState(1)
  const [results, setResults] = useState<LevelCost[] | null>(null)

  const currentLevelOptions = getLevelOptions(t, MAX_LEVEL, 0)
  const targetLevelOptions = getLevelOptions(t, MAX_LEVEL, 1)
  const config = EQUIPMENT_CONFIG[selectedPiece]

  const handlePieceChange = (value: string) => {
    setSelectedPiece(value)
    setCurrentLevel(0)
    setTargetLevel(1)
    setResults(null)
  }

  const handleCurrentLevelChange = (val: number) => {
    const v = Math.min(Math.max(0, val), MAX_LEVEL - 1)
    setCurrentLevel(v)
    if (v >= targetLevel) setTargetLevel(v + 1)
    setResults(null)
  }

  const handleTargetLevelChange = (val: number) => {
    const v = Math.min(Math.max(currentLevel + 1, val), MAX_LEVEL)
    setTargetLevel(v)
    setResults(null)
  }

  const handleCalculate = () => {
    const rows: LevelCost[] = []
    for (let level = currentLevel + 1; level <= targetLevel; level++) {
      const idx = level - 1
      rows.push({
        level,
        satin: config.satin[idx],
        threads: config.threads[idx],
        visions: config.visions[idx],
      })
    }
    setResults(rows)
  }

  const totals = results
    ? {
        satin: results.reduce((s, r) => s + r.satin, 0),
        threads: results.reduce((s, r) => s + r.threads, 0),
        visions: results.reduce((s, r) => s + r.visions, 0),
      }
    : null

  return (
    <div className="min-h-screen bg-[#06060e] p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-6xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-[#00c8ff]">{t("calculator.equipment")}</h1>

        <GlassCard>
          <GlassCardHeader>
            <GlassCardTitle>{t("calculator.configuration")}</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-sm text-white/60">{t("calculator.equipmentPiece")}</label>
                <Select
                  options={pieceNames.map((name) => ({ value: name, label: name }))}
                  value={selectedPiece}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handlePieceChange(e.target.value)}
                />
                <p className="text-xs text-white/40">{t("calculator.maxLevel", { level: String(MAX_LEVEL) })}</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-white/60">{t("calculator.currentLevel")}</label>
                <Select
                  options={currentLevelOptions}
                  value={currentLevel}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCurrentLevelChange(Number(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-white/60">{t("calculator.targetLevel")}</label>
                <Select
                  options={targetLevelOptions}
                  value={targetLevel}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleTargetLevelChange(Number(e.target.value))}
                />
              </div>
            </div>

            <Button onClick={handleCalculate} className="w-full md:w-auto">
              {t("calculator.calculate")}
            </Button>
          </GlassCardContent>
        </GlassCard>

        {results && totals && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle>
                  {t("calculator.pieceLabel", { piece: selectedPiece, from: String(currentLevel), to: String(targetLevel) })}
                </GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
                      <th className="p-3 text-left font-medium">{t("calculator.level")}</th>
                      <th className="p-3 text-right font-medium">{t("calculator.satin")}</th>
                      <th className="p-3 text-right font-medium">{t("calculator.threads")}</th>
                      <th className="p-3 text-right font-medium">{t("calculator.artisansVisions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => (
                      <tr
                        key={row.level}
                        className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.06]"}`}
                      >
                        <td className="p-3 text-white font-medium">{row.level}</td>
                        <td className="p-3 text-right text-[#00c8ff]">{formatNumber(row.satin)}</td>
                        <td className="p-3 text-right text-[#ff6b35]">{formatNumber(row.threads)}</td>
                        <td className="p-3 text-right text-[#7c3aed]">{formatNumber(row.visions)}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-[#00c8ff]/30 bg-[#00c8ff]/5 font-semibold">
                      <td className="p-3 text-[#00c8ff]">{t("calculator.total")}</td>
                      <td className="p-3 text-right text-[#00c8ff]">{formatNumber(totals.satin)}</td>
                      <td className="p-3 text-right text-[#ff6b35]">{formatNumber(totals.threads)}</td>
                      <td className="p-3 text-right text-[#7c3aed]">{formatNumber(totals.visions)}</td>
                    </tr>
                  </tbody>
                </table>
              </GlassCardContent>
            </GlassCard>

            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle>{t("calculator.summary")} &mdash; {selectedPiece}</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-[#00c8ff]/20 bg-[#00c8ff]/5 p-4 text-center">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{t("calculator.satin")}</p>
                    <p className="text-2xl font-bold text-[#00c8ff]">{formatNumber(totals.satin)}</p>
                  </div>
                  <div className="rounded-xl border border-[#ff6b35]/20 bg-[#ff6b35]/5 p-4 text-center">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{t("calculator.threads")}</p>
                    <p className="text-2xl font-bold text-[#ff6b35]">{formatNumber(totals.threads)}</p>
                  </div>
                  <div className="rounded-xl border border-[#7c3aed]/20 bg-[#7c3aed]/5 p-4 text-center">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{t("calculator.artisansVisions")}</p>
                    <p className="text-2xl font-bold text-[#7c3aed]">{formatNumber(totals.visions)}</p>
                  </div>
                </div>
                <p className="mt-4 text-center text-sm text-white/40">
                  {t("calculator.total")} {t("calculator.level")}s: {targetLevel - currentLevel}
                </p>
              </GlassCardContent>
            </GlassCard>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
