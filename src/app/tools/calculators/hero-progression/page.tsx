"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { formatNumber } from "@/lib/utils"

const CUMULATIVE = [0, 10, 40, 115, 300, 600]

const starOptions = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => ({
    value: from + i,
    label: "\u2605".repeat(from + i) + " Star",
  }))

const currentOptions = starOptions(1, 5)

export default function HeroProgressionPage() {
  const [current, setCurrent] = useState(1)
  const [target, setTarget] = useState(2)

  const targetOptions = starOptions(current + 1, 6)
  const safeTarget = target <= current ? current + 1 : target
  const shardsNeeded = CUMULATIVE[safeTarget - 1] - CUMULATIVE[current - 1]

  return (
    <div className="min-h-screen bg-[#06060e] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl space-y-6"
      >
        <h1 className="gradient-text text-center text-4xl font-bold">
          Hero Progression Calculator
        </h1>

        <GlassCard>
          <GlassCardHeader>
            <GlassCardTitle>Select Star Levels</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="input-glass space-y-2">
                <label className="text-sm text-gray-400">Current Star Level</label>
                <Select
                  options={currentOptions}
                  value={current}
                  onChange={(e) => {
                    const val = Number(e.target.value)
                    setCurrent(val)
                    if (val >= target) setTarget(val + 1)
                  }}
                />
              </div>
              <div className="input-glass space-y-2">
                <label className="text-sm text-gray-400">Target Star Level</label>
                <Select
                  options={targetOptions}
                  value={safeTarget}
                  onChange={(e) => setTarget(Number(e.target.value))}
                />
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>

        <motion.div
          key={`${current}-${safeTarget}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <GlassCard className="gradient-border">
            <GlassCardHeader>
              <GlassCardTitle>Shards Required</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent className="text-center">
              <p className="mb-2 text-sm text-gray-400">
                From \u2605{current} to \u2605{safeTarget}
              </p>
              <p className="text-6xl font-bold text-[#00c8ff]">
                {formatNumber(shardsNeeded)}
              </p>
            </GlassCardContent>
          </GlassCard>
        </motion.div>

        <GlassCard>
          <GlassCardHeader>
            <GlassCardTitle>Star Level Reference</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-sm text-gray-400">
                  <th className="pb-2">Star Level</th>
                  <th className="pb-2">Cumulative Shards</th>
                </tr>
              </thead>
              <tbody>
                {CUMULATIVE.map((shards, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2 text-[#ff6b35]">
                      {"\u2605".repeat(i + 1)}
                    </td>
                    <td className="py-2 font-mono text-[#00c8ff]">
                      {formatNumber(shards)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  )
}
