"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"

const changes = [
  { version: "1.0.0", title: "Initial Release", date: "2024-12-01", items: ["Hero Progression Calculator", "Building Upgrade Calculator", "Troop Training Calculator", "VIP Calculator", "Equipment Calculator", "Research Calculator", "User authentication system", "Multi-language support"], type: "major" },
  { version: "0.9.0", title: "Beta Release", date: "2024-11-15", items: ["Core calculator functionality", "Database system foundations", "Admin panel basics"], type: "beta" },
]

export default function ChangelogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">Changelog</span></h1>
          <p className="text-[#a0a0b0]">Track all updates and improvements</p>
        </div>
        <div className="space-y-6">
          {changes.map((change) => (
            <GlassCard key={change.version} className="relative">
              <div className="absolute -left-3 top-8 w-6 h-6 rounded-full bg-[#00c8ff] border-4 border-[#06060e]" />
              <GlassCardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-[#00c8ff]">v{change.version}</span>
                  <Badge variant={change.type === "major" ? "primary" : "warning"}>
                    {change.type === "major" ? "Major Update" : "Beta"}
                  </Badge>
                </div>
                <span className="text-sm text-[#a0a0b0]">{change.date}</span>
              </GlassCardHeader>
              <GlassCardContent>
                <h3 className="font-semibold mb-3">{change.title}</h3>
                <ul className="space-y-2">
                  {change.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#a0a0b0]">
                      <span className="text-[#00c8ff] mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
