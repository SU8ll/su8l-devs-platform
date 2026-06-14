"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { formatNumber } from "@/lib/utils"

const vipXP = [0, 2500, 5000, 12500, 30000, 40000, 60000, 100000, 350000, 600000, 1200000, 2400000]

function cumulativeXP(level: number) {
  return vipXP.slice(0, level + 1).reduce((a, b) => a + b, 0)
}

export default function VIPCalculator() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [targetLevel, setTargetLevel] = useState(1)
  const [currentXP, setCurrentXP] = useState("")
  const [result, setResult] = useState<{ totalXP: number; gems: number; usd: number } | null>(null)

  const handleCalculate = () => {
    const xp = parseInt(currentXP) || 0
    let total = 0
    for (let i = currentLevel + 1; i <= targetLevel; i++) {
      total += vipXP[i]
    }
    total = Math.max(0, total - xp)
    setResult({ totalXP: total, gems: total * 2, usd: Math.ceil((total * 2) / 20000) * 99.99 })
  }

  const targetOptions = Array.from({ length: 11 - currentLevel }, (_, i) => currentLevel + 1 + i)

  return (
    <motion.div
      className="min-h-screen p-6 space-y-6"
      style={{ backgroundColor: "#06060e" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-extrabold text-center tracking-tight"
        style={{ color: "#00c8ff" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        VIP Calculator
      </motion.h1>

      <GlassCard>
        <GlassCardHeader>
          <GlassCardTitle>Calculate Your Path</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Current VIP Level</label>
            <Select
              value={String(currentLevel)}
              onChange={(e) => {
                const val = Number(e.target.value)
                setCurrentLevel(val)
                if (val >= targetLevel) setTargetLevel(val + 1)
              }}
              className="w-full"
            >
              {Array.from({ length: 11 }, (_, i) => (
                <option key={i} value={i}>
                  Level {i} {i > 0 && `(${formatNumber(vipXP[i])} XP)`}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Target VIP Level</label>
            <Select
              value={String(targetLevel)}
              onChange={(e) => setTargetLevel(Number(e.target.value))}
              className="w-full"
            >
              {targetOptions.map((level) => (
                <option key={level} value={level}>
                  Level {level} ({formatNumber(vipXP[level])} XP)
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Current XP Progress</label>
            <input
              type="number"
              value={currentXP}
              onChange={(e) => setCurrentXP(e.target.value)}
              placeholder="0"
              min={0}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00c8ff] focus:ring-1 focus:ring-[#00c8ff]/30 transition-all"
            />
            <p className="text-xs text-gray-500">How much XP you already have toward the next level</p>
          </div>

          <Button
            onClick={handleCalculate}
            className="w-full py-3 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #00c8ff 0%, #0080ff 100%)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(0,200,255,0.3)",
            }}
          >
            Calculate
          </Button>
        </GlassCardContent>
      </GlassCard>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>Results</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-gray-400">Total XP Needed</span>
                <span className="text-lg font-bold" style={{ color: "#00c8ff" }}>
                  {formatNumber(result.totalXP)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-gray-400">Gems Needed</span>
                <span className="text-lg font-bold" style={{ color: "#a855f7" }}>
                  {formatNumber(result.gems)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-gray-400">USD Cost Estimate</span>
                <span className="text-lg font-bold" style={{ color: "#fbbf24" }}>
                  ${result.usd.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500 text-center pt-2">
                Based on ~$99.99 per 20,000 gems
              </p>
            </GlassCardContent>
          </GlassCard>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard>
          <GlassCardHeader>
            <GlassCardTitle>VIP Reference Table</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2.5 px-4 text-left text-gray-400 font-medium">Level</th>
                    <th className="py-2.5 px-4 text-right text-gray-400 font-medium">XP Required</th>
                    <th className="py-2.5 px-4 text-right text-gray-400 font-medium">Cumulative XP</th>
                  </tr>
                </thead>
                <tbody>
                  {vipXP.map((xp, i) => {
                    const isEven = i % 2 === 0
                    const isActive = result && i >= currentLevel && i <= targetLevel
                    return (
                      <tr
                        key={i}
                        className="border-b border-white/5 transition-colors"
                        style={{
                          backgroundColor: isActive ? "rgba(0,200,255,0.05)" : isEven ? "rgba(255,255,255,0.02)" : "transparent",
                        }}
                      >
                        <td className="py-2.5 px-4 font-semibold" style={{ color: "#00c8ff" }}>
                          {i}
                        </td>
                        <td className="py-2.5 px-4 text-right text-gray-300">
                          {i === 0 ? <span className="text-gray-600">-</span> : formatNumber(xp)}
                        </td>
                        <td className="py-2.5 px-4 text-right text-gray-300">
                          {formatNumber(cumulativeXP(i))}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}
