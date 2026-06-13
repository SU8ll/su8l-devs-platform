"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const posts = [
  { title: "New Hero Progression System", excerpt: "Detailed breakdown of the updated hero leveling mechanics and star system changes.", date: "2024-12-01", category: "Updates", author: "SU8L Team" },
  { title: "Building Upgrade Guide 2024", excerpt: "Complete guide to efficiently upgrade your buildings with calculated resource paths.", date: "2024-11-28", category: "Guides", author: "Commander" },
  { title: "VIP Leveling Strategy", excerpt: "Optimize your VIP progression with our detailed cost analysis and recommendations.", date: "2024-11-25", category: "Strategy", author: "SU8L Team" },
]

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">Blog</span></h1>
          <p className="text-[#a0a0b0]">Latest news, guides, and updates</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <GlassCard key={post.title} hover>
              <GlassCardHeader>
                <Badge variant="primary">{post.category}</Badge>
                <span className="text-xs text-[#a0a0b0]">{post.date}</span>
              </GlassCardHeader>
              <GlassCardTitle className="mb-2">{post.title}</GlassCardTitle>
              <GlassCardContent>
                <p className="text-sm text-[#a0a0b0]">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <span className="text-xs text-[#a0a0b0]">By {post.author}</span>
                  <Button variant="ghost" size="sm">Read More</Button>
                </div>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
