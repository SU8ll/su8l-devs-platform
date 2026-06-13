"use client"
export const dynamic = 'force-dynamic'
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CALCULATOR_LIST } from "@/lib/constants"

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === "unauthenticated") {
    redirect("/login")
  }

  if (status === "loading") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00c8ff] border-t-transparent rounded-full animate-spin" />
      </div>
    )
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
              Welcome back, <span className="gradient-text">{session?.user?.name || "Commander"}</span>
            </h1>
            <p className="text-[#a0a0b0] mt-1">Manage your profiles and saved builds</p>
          </div>
          <Badge variant="primary">{session?.user?.role || "USER"}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <GlassCard>
            <GlassCardContent>
              <div className="text-3xl font-bold gradient-text">0</div>
              <p className="text-[#a0a0b0] text-sm mt-1">Saved Builds</p>
            </GlassCardContent>
          </GlassCard>
          <GlassCard>
            <GlassCardContent>
              <div className="text-3xl font-bold text-[#ff6b35]">0</div>
              <p className="text-[#a0a0b0] text-sm mt-1">Active Profiles</p>
            </GlassCardContent>
          </GlassCard>
          <GlassCard>
            <GlassCardContent>
              <div className="text-3xl font-bold text-[#34d399]">0</div>
              <p className="text-[#a0a0b0] text-sm mt-1">Calculations Run</p>
            </GlassCardContent>
          </GlassCard>
        </div>

        <h2 className="text-xl font-bold mb-4">Quick Access Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CALCULATOR_LIST.slice(0, 6).map((calc) => (
            <Link key={calc.slug} href={`/tools/calculators/${calc.slug}`}>
              <GlassCard hover className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{calc.icon}</span>
                  <div>
                    <p className="font-semibold text-sm">{calc.title}</p>
                    <Badge variant="primary" className="text-[10px] mt-1">{calc.category}</Badge>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
