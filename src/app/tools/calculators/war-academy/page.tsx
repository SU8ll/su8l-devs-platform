"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { formatNumber, calculateWarAcademyCost } from "@/lib/utils"

export default function WarAcademyCalculator() {
  const [fromLevel, setFromLevel] = useState(1)
  const [toLevel, setToLevel] = useState(2)
  const [results, setResults] = useState<{ level: number; books: number; gold: number }[] | null>(null)

  const levels = Array.from({ length: 35 }, (_, i) => ({ value: i + 1, label: `Level ${i + 1}` }))

  const handleCalculate = () => {
    const data = []
    for (let lvl = fromLevel + 1; lvl <= toLevel; lvl++) {
      const cost = calculateWarAcademyCost(lvl)
      data.push({ level: lvl, books: cost.books, gold: cost.gold })
    }
    setResults(data)
  }

  const totals = results ? results.reduce((acc, r) => ({ books: acc.books + r.books, gold: acc.gold + r.gold }), { books: 0, gold: 0 }) : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2"><span className="gradient-text">War Academy Calculator</span></h1>
        <p className="text-[#a0a0b0] mb-8">Calculate War Academy research costs (Levels 1-35)</p>

        <GlassCard className="mb-8">
          <GlassCardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#a0a0b0] mb-1">From Level</label>
                <Select options={levels.slice(0, -1)} value={fromLevel} onChange={(e) => { setFromLevel(Number(e.target.value)); setResults(null) }} />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0b0] mb-1">To Level</label>
                <Select options={levels.slice(fromLevel)} value={toLevel} onChange={(e) => { setToLevel(Number(e.target.value)); setResults(null) }} />
              </div>
            </div>
            <Button onClick={handleCalculate} className="w-full">Calculate</Button>
          </GlassCardContent>
        </GlassCard>

        {results && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle>Results: Level {fromLevel} → {toLevel}</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-[#a0a0b0]">Level</th>
                        <th className="text-right py-3 px-4 text-[#7c3aed]">Books</th>
                        <th className="text-right py-3 px-4 text-[#fbbf24]">Gold</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r) => (
                        <tr key={r.level} className="border-b border-white/5 hover:bg-white/[0.02]">
                          <td className="py-2 px-4">Level {r.level}</td>
                          <td className="py-2 px-4 text-right text-[#7c3aed]">{formatNumber(r.books)}</td>
                          <td className="py-2 px-4 text-right text-[#fbbf24]">{formatNumber(r.gold)}</td>
                        </tr>
                      ))}
                    </tbody>
                    {totals && (
                      <tfoot>
                        <tr className="border-t-2 border-[#7c3aed]/30 bg-[#7c3aed]/5">
                          <td className="py-3 px-4 font-bold">Total</td>
                          <td className="py-3 px-4 text-right font-bold text-[#7c3aed]">{formatNumber(totals.books)}</td>
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
