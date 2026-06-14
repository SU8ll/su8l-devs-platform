"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"

const dbCategories = [
  { title: "Heroes", icon: "⭐", desc: "Complete hero database with stats, skills, and builds", slug: "#", count: "24+" },
  { title: "Buildings", icon: "🏗️", desc: "All building types, levels, and upgrade costs", slug: "#", count: "15+" },
  { title: "Equipment", icon: "🛡️", desc: "Equipment pieces, stats, and upgrade materials", slug: "#", count: "30+" },
  { title: "Pets", icon: "🐾", desc: "Pet database with skills and upgrade costs", slug: "#", count: "12+" },
  { title: "Masters", icon: "📖", desc: "Master skills, talents, and progression", slug: "#", count: "8+" },
  { title: "Technology", icon: "🔬", desc: "Research tree and technology requirements", slug: "#", count: "50+" },
]

export default function DatabasePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">Database</span></h1>
          <p className="text-[#a0a0b0]">Comprehensive game data at your fingertips</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dbCategories.map((cat) => (
            <Link key={cat.title} href={cat.slug}>
              <GlassCard hover>
                <GlassCardContent>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <Badge variant="primary">{cat.count} entries</Badge>
                  </div>
                  <GlassCardTitle className="mb-2">{cat.title}</GlassCardTitle>
                  <p className="text-sm text-[#a0a0b0]">{cat.desc}</p>
                </GlassCardContent>
              </GlassCard>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
