"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function CommunityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">Community</span></h1>
          <p className="text-[#a0a0b0]">Join our growing community of commanders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <GlassCard hover>
            <GlassCardContent className="text-center">
              <div className="text-4xl mb-3">💬</div>
              <GlassCardTitle>Discord</GlassCardTitle>
              <p className="text-sm text-[#a0a0b0] my-3">Join 5,000+ members on Discord</p>
              <Button variant="primary" size="sm">Join Discord</Button>
            </GlassCardContent>
          </GlassCard>
          <GlassCard hover>
            <GlassCardContent className="text-center">
              <div className="text-4xl mb-3">📝</div>
              <GlassCardTitle>Feedback</GlassCardTitle>
              <p className="text-sm text-[#a0a0b0] my-3">Share your ideas and suggestions</p>
              <Link href="/community/feedback">
                <Button variant="secondary" size="sm">Submit Feedback</Button>
              </Link>
            </GlassCardContent>
          </GlassCard>
          <GlassCard hover>
            <GlassCardContent className="text-center">
              <div className="text-4xl mb-3">🐛</div>
              <GlassCardTitle>Bug Reports</GlassCardTitle>
              <p className="text-sm text-[#a0a0b0] my-3">Help us improve the platform</p>
              <Button variant="ghost" size="sm">Report Bug</Button>
            </GlassCardContent>
          </GlassCard>
        </div>

        <GlassCard>
          <GlassCardContent className="text-center py-12">
            <h2 className="text-2xl font-bold mb-3">Stay Connected</h2>
            <p className="text-[#a0a0b0] mb-6 max-w-md mx-auto">
              Follow us on social media for the latest updates, guides, and community events.
            </p>
            <div className="flex justify-center gap-4">
              {["Discord", "Twitter", "YouTube", "GitHub"].map((s) => (
                <GlassCard key={s} hover className="px-6 py-3">
                  <span className="font-semibold">{s}</span>
                </GlassCard>
              ))}
            </div>
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  )
}
