"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"

const interactiveTools = [
  { title: "Interactive Map", icon: "🗺️", desc: "Explore kingdoms and territories interactively", status: "Coming Soon" },
  { title: "Technology Tree", icon: "🌳", desc: "Visual research tree with requirements", status: "Coming Soon" },
  { title: "Hero Comparison", icon: "⚔️", desc: "Compare hero stats and skills side by side", status: "Coming Soon" },
  { title: "Resource Tracker", icon: "📊", desc: "Track your resource income and spending", status: "Coming Soon" },
  { title: "Progress Tracker", icon: "📈", desc: "Monitor your kingdom progression over time", status: "Coming Soon" },
  { title: "Kingdom Tracker", icon: "👑", desc: "Track multiple kingdoms and alliances", status: "Coming Soon" },
]

export default function InteractivePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">Interactive Tools</span></h1>
          <p className="text-[#a0a0b0]">Visual and interactive tools for deeper analysis</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interactiveTools.map((tool) => (
            <GlassCard key={tool.title} hover>
              <GlassCardContent>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{tool.icon}</span>
                  <Badge variant="warning">{tool.status}</Badge>
                </div>
                <GlassCardTitle className="mb-2">{tool.title}</GlassCardTitle>
                <p className="text-sm text-[#a0a0b0]">{tool.desc}</p>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
