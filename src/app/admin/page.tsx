"use client"
export const dynamic = 'force-dynamic'
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const adminSections = [
  { title: "Users", href: "/admin/users", desc: "Manage user accounts and roles", color: "#00c8ff", count: "0" },
  { title: "Tools", href: "/admin/tools", desc: "Manage calculators and features", color: "#7c3aed", count: "12" },
  { title: "Content", href: "/admin/content", desc: "Manage blog posts and guides", color: "#ff6b35", count: "0" },
  { title: "Database", href: "/admin/database", desc: "Manage heroes, buildings, equipment", color: "#34d399", count: "0" },
  { title: "Analytics", href: "/admin/analytics", desc: "Platform usage and statistics", color: "#fbbf24", count: "—" },
  { title: "Feedback", href: "/admin/feedback", desc: "User feedback and reports", color: "#ef4444", count: "0" },
]

export default function AdminPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00c8ff] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              <span className="gradient-text">Admin Panel</span>
            </h1>
            <p className="text-[#a0a0b0] mt-1">Manage your platform</p>
          </div>
          <Badge variant="info">ADMIN</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => (
            <Link key={section.href} href={section.href}>
              <GlassCard hover>
                <GlassCardContent>
                  <div className="flex items-start justify-between mb-3">
                    <GlassCardTitle>{section.title}</GlassCardTitle>
                    <span className="text-2xl font-bold" style={{ color: section.color }}>
                      {section.count}
                    </span>
                  </div>
                  <p className="text-sm text-[#a0a0b0]">{section.desc}</p>
                </GlassCardContent>
              </GlassCard>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-bold mt-12 mb-4">Recent Activity</h2>
        <GlassCard>
          <GlassCardContent>
            <div className="text-center py-8 text-[#a0a0b0]">
              <p>No recent activity to display</p>
            </div>
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  )
}
