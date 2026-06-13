"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const guides = [
  { title: "Getting Started Guide", excerpt: "Everything you need to know to start your journey.", category: "Beginner", difficulty: "Easy", readTime: "5 min" },
  { title: "Efficient Building Upgrade Path", excerpt: "Optimize your building upgrade order for maximum efficiency.", category: "Strategy", difficulty: "Medium", readTime: "10 min" },
  { title: "VIP Leveling Deep Dive", excerpt: "Complete analysis of VIP costs, benefits, and optimal leveling strategies.", category: "Advanced", difficulty: "Hard", readTime: "15 min" },
]

export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">Guides</span></h1>
          <p className="text-[#a0a0b0]">Comprehensive guides and strategies</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <GlassCard key={guide.title} hover>
              <GlassCardHeader>
                <Badge variant="primary">{guide.category}</Badge>
                <span className="text-xs text-[#a0a0b0]">{guide.readTime}</span>
              </GlassCardHeader>
              <GlassCardTitle className="mb-2">{guide.title}</GlassCardTitle>
              <GlassCardContent>
                <p className="text-sm text-[#a0a0b0]">{guide.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <Badge variant={guide.difficulty === "Easy" ? "success" : guide.difficulty === "Medium" ? "warning" : "danger"}>
                    {guide.difficulty}
                  </Badge>
                  <Button variant="ghost" size="sm">Read Guide</Button>
                </div>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
