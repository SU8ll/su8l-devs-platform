"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AdminContentPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold"><span className="gradient-text">Content Management</span></h1>
            <p className="text-[#a0a0b0] mt-1">Manage blog posts and guides</p>
          </div>
          <Button>New Post</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>Blog Posts</GlassCardTitle>
              <Badge variant="primary">0 published</Badge>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-center py-8 text-[#a0a0b0] text-sm">
                No blog posts yet
              </div>
            </GlassCardContent>
          </GlassCard>
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>Guides</GlassCardTitle>
              <Badge variant="primary">0 published</Badge>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-center py-8 text-[#a0a0b0] text-sm">
                No guides yet
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}
