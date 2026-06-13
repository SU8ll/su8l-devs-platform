"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"

export default function AdminDatabasePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2"><span className="gradient-text">Database Management</span></h1>
        <p className="text-[#a0a0b0] mb-8">Manage game data entries</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Heroes", count: 0, icon: "⭐" },
            { name: "Buildings", count: 0, icon: "🏗️" },
            { name: "Equipment", count: 0, icon: "🛡️" },
            { name: "Pets", count: 0, icon: "🐾" },
            { name: "Masters", count: 0, icon: "📖" },
            { name: "Technology", count: 0, icon: "🔬" },
          ].map((cat) => (
            <GlassCard key={cat.name} hover>
              <GlassCardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{cat.icon}</span>
                  <Badge variant="primary">{cat.count} entries</Badge>
                </div>
                <GlassCardTitle>{cat.name}</GlassCardTitle>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
