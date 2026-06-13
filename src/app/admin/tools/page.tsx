"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"

const tools = [
  { name: "Hero Progression", status: "active", usage: "High", slug: "hero-progression" },
  { name: "Building Upgrade", status: "active", usage: "High", slug: "building-upgrade" },
  { name: "Troop Training", status: "active", usage: "Medium", slug: "training" },
  { name: "VIP Calculator", status: "active", usage: "High", slug: "vip" },
  { name: "Equipment Calculator", status: "active", usage: "Medium", slug: "equipment" },
  { name: "Research Calculator", status: "active", usage: "Low", slug: "research" },
  { name: "Forgehammer", status: "active", usage: "Low", slug: "forgehammer" },
  { name: "Governor Gear", status: "active", usage: "Medium", slug: "governor-gear" },
  { name: "Master Calculator", status: "active", usage: "Low", slug: "master" },
  { name: "Pet Calculator", status: "active", usage: "Low", slug: "pet" },
  { name: "War Academy", status: "active", usage: "Low", slug: "war-academy" },
  { name: "Resource Calculator", status: "active", usage: "Medium", slug: "resource" },
  { name: "Event Calculator", status: "active", usage: "Low", slug: "event" },
]

export default function AdminToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2"><span className="gradient-text">Tools Management</span></h1>
        <p className="text-[#a0a0b0] mb-8">Manage calculators and features</p>

        <GlassCard>
          <GlassCardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">Tool</th>
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">Slug</th>
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">Status</th>
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map((tool) => (
                    <tr key={tool.slug} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-medium">{tool.name}</td>
                      <td className="py-3 px-4 text-[#a0a0b0]">{tool.slug}</td>
                      <td className="py-3 px-4">
                        <Badge variant="success">Active</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={tool.usage === "High" ? "primary" : tool.usage === "Medium" ? "warning" : "info"}>
                          {tool.usage}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  )
}
