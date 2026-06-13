"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"

export default function AdminAnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2"><span className="gradient-text">Analytics</span></h1>
        <p className="text-[#a0a0b0] mb-8">Platform usage and statistics</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: "0", color: "#00c8ff" },
            { label: "Calculations Run", value: "0", color: "#ff6b35" },
            { label: "Page Views", value: "0", color: "#7c3aed" },
            { label: "Active Today", value: "0", color: "#34d399" },
          ].map((stat) => (
            <GlassCard key={stat.label}>
              <GlassCardContent>
                <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <p className="text-sm text-[#a0a0b0]">{stat.label}</p>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>Popular Tools</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-center py-8 text-[#a0a0b0] text-sm">
                No data available yet
              </div>
            </GlassCardContent>
          </GlassCard>
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>User Growth</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-center py-8 text-[#a0a0b0] text-sm">
                No data available yet
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}
