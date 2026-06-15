"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/components/language-provider"

export default function AdminToolsPage() {
  const { t } = useLocale()
  const tools = [
    { name: t("admin.tools.heroProgression"), status: "active", usage: "High", slug: "hero-progression" },
    { name: t("admin.tools.buildingUpgrade"), status: "active", usage: "High", slug: "building-upgrade" },
    { name: t("admin.tools.troopTraining"), status: "active", usage: "Medium", slug: "training" },
    { name: t("admin.tools.vipCalculator"), status: "active", usage: "High", slug: "vip" },
    { name: t("admin.tools.equipmentCalculator"), status: "active", usage: "Medium", slug: "equipment" },
    { name: t("admin.tools.researchCalculator"), status: "active", usage: "Low", slug: "research" },
    { name: t("admin.tools.forgehammer"), status: "active", usage: "Low", slug: "forgehammer" },
    { name: t("admin.tools.governorGear"), status: "active", usage: "Medium", slug: "governor-gear" },
    { name: t("admin.tools.masterCalculator"), status: "active", usage: "Low", slug: "master" },
    { name: t("admin.tools.petCalculator"), status: "active", usage: "Low", slug: "pet" },
    { name: t("admin.tools.warAcademy"), status: "active", usage: "Low", slug: "war-academy" },
    { name: t("admin.tools.resourceCalculator"), status: "active", usage: "Medium", slug: "resource" },
    { name: t("admin.tools.eventCalculator"), status: "active", usage: "Low", slug: "event" },
  ]
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2"><span className="gradient-text">{t("admin.tools.title")}</span></h1>
        <p className="text-[#a0a0b0] mb-8">{t("admin.tools.desc")}</p>

        <GlassCard>
          <GlassCardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("admin.tools.tableTool")}</th>
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("admin.tools.tableSlug")}</th>
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("admin.tools.tableStatus")}</th>
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("admin.tools.tableUsage")}</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map((tool) => (
                    <tr key={tool.slug} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-medium">{tool.name}</td>
                      <td className="py-3 px-4 text-[#a0a0b0]">{tool.slug}</td>
                      <td className="py-3 px-4">
                        <Badge variant="success">{t("admin.tools.active")}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={tool.usage === "High" ? "primary" : tool.usage === "Medium" ? "warning" : "info"}>
                          {t(`admin.tools.${tool.usage.toLowerCase()}`)}
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
