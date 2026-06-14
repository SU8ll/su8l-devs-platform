"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { formatNumber } from "@/lib/utils"

const FH_COSTS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]
const MG_COSTS = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 8, 10]
const MAX_LEVEL = 20

type Tab = "requirements" | "possible"

export default function ForgehammerCalculator() {
  const [tab, setTab] = useState<Tab>("requirements")

  const [fromLevel, setFromLevel] = useState(0)
  const [toLevel, setToLevel] = useState(1)
  const [breakdown, setBreakdown] = useState<{ level: number; fh: number; mg: number }[] | null>(null)
  const [totals, setTotals] = useState<{ fh: number; mg: number } | null>(null)

  const [availableFH, setAvailableFH] = useState("")
  const [availableMG, setAvailableMG] = useState("")
  const [maxLevel, setMaxLevel] = useState<number | null>(null)

  const handleRequirements = () => {
    if (fromLevel >= toLevel) return
    const steps: { level: number; fh: number; mg: number }[] = []
    let totalFH = 0
    let totalMG = 0
    for (let i = fromLevel; i < toLevel; i++) {
      const fh = FH_COSTS[i]
      const mg = MG_COSTS[i]
      steps.push({ level: i + 1, fh, mg })
      totalFH += fh
      totalMG += mg
    }
    setBreakdown(steps)
    setTotals({ fh: totalFH, mg: totalMG })
  }

  const handlePossible = () => {
    const fh = parseInt(availableFH) || 0
    const mg = parseInt(availableMG) || 0
    let remainingFH = fh
    let remainingMG = mg
    let level = 0
    for (let i = 0; i < MAX_LEVEL; i++) {
      if (remainingFH >= FH_COSTS[i] && remainingMG >= MG_COSTS[i]) {
        remainingFH -= FH_COSTS[i]
        remainingMG -= MG_COSTS[i]
        level = i + 1
      } else {
        break
      }
    }
    setMaxLevel(level)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex gap-2">
        <button
          onClick={() => setTab("requirements")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            tab === "requirements"
              ? "bg-[#00c8ff] text-white shadow-lg shadow-[#00c8ff]/30"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
        >
          Calculate Requirements
        </button>
        <button
          onClick={() => setTab("possible")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            tab === "possible"
              ? "bg-[#00c8ff] text-white shadow-lg shadow-[#00c8ff]/30"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
        >
          Calculate Possible Level
        </button>
      </div>

      {tab === "requirements" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>Calculate Requirements</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">From Level</label>
                  <Select value={fromLevel} onChange={(e) => setFromLevel(Number(e.target.value))}>
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">To Level</label>
                  <Select value={toLevel} onChange={(e) => setToLevel(Number(e.target.value))}>
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </Select>
                </div>
              </div>

              <Button onClick={handleRequirements} className="w-full">Calculate</Button>

              {breakdown && totals && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-x-auto"
                >
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400">
                        <th className="text-left py-2">Level</th>
                        <th className="text-right py-2">FH Needed</th>
                        <th className="text-right py-2">MG Needed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {breakdown.map((step) => (
                        <tr key={step.level} className="border-b border-white/5">
                          <td className="py-2">{fromLevel} → {step.level}</td>
                          <td className="text-right py-2 text-[#00c8ff]">{formatNumber(step.fh)}</td>
                          <td className="text-right py-2 text-[#ff6b35]">{step.mg > 0 ? formatNumber(step.mg) : "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-white/20 font-semibold">
                        <td className="py-2 text-gray-300">Total</td>
                        <td className="text-right py-2 text-[#00c8ff]">{formatNumber(totals.fh)}</td>
                        <td className="text-right py-2 text-[#ff6b35]">{formatNumber(totals.mg)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </motion.div>
              )}
            </GlassCardContent>
          </GlassCard>
        </motion.div>
      )}

      {tab === "possible" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>Calculate Possible Level</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Available Forgehammer</label>
                  <input
                    type="number"
                    min={0}
                    value={availableFH}
                    onChange={(e) => setAvailableFH(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#00c8ff]/50"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Available Master's Gear</label>
                  <input
                    type="number"
                    min={0}
                    value={availableMG}
                    onChange={(e) => setAvailableMG(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-[#00c8ff]/50"
                    placeholder="0"
                  />
                </div>
              </div>

              <Button onClick={handlePossible} className="w-full">Calculate</Button>

              {maxLevel !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-6"
                >
                  <p className="text-gray-400 mb-2">Maximum Level Achievable</p>
                  <p className="text-5xl font-bold text-[#00c8ff]">{maxLevel}</p>
                </motion.div>
              )}
            </GlassCardContent>
          </GlassCard>
        </motion.div>
      )}
    </motion.div>
  )
}
