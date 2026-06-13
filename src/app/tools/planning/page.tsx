"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"

const planningTools = [
  { title: "Transfer Planner", icon: "🔄", desc: "Plan and optimize troop transfers between kingdoms", status: "Coming Soon" },
  { title: "Event Planner", icon: "📅", desc: "Schedule and plan for upcoming in-game events", status: "Coming Soon" },
  { title: "Kingdom Timeline", icon: "⏱️", desc: "Track kingdom milestones and age progression", status: "Coming Soon" },
  { title: "Resource Planner", icon: "💰", desc: "Plan resource gathering and production", status: "Coming Soon" },
  { title: "Team Planner", icon: "👥", desc: "Build and optimize your team compositions", status: "Coming Soon" },
  { title: "Appointment Planner", icon: "📋", desc: "Schedule in-game activities and timers", status: "Coming Soon" },
]

export default function PlanningPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">Planning Tools</span></h1>
          <p className="text-[#a0a0b0]">Strategic planning tools for kingdom management</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planningTools.map((tool) => (
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
