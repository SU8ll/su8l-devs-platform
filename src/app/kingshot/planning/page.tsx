"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/components/language-provider"

export default function PlanningPage() {
  const { t } = useLocale()
  const planningTools = [
    { title: t("kingshot.planningTransfer"), icon: "🔄", desc: t("kingshot.planningTransferDesc"), status: t("common.comingSoon") },
    { title: t("kingshot.planningEvent"), icon: "📅", desc: t("kingshot.planningEventDesc"), status: t("common.comingSoon") },
    { title: t("kingshot.planningKingdom"), icon: "⏱️", desc: t("kingshot.planningKingdomDesc"), status: t("common.comingSoon") },
    { title: t("kingshot.planningResource"), icon: "💰", desc: t("kingshot.planningResourceDesc"), status: t("common.comingSoon") },
    { title: t("kingshot.planningTeam"), icon: "👥", desc: t("kingshot.planningTeamDesc"), status: t("common.comingSoon") },
    { title: t("kingshot.planningAppointment"), icon: "📋", desc: t("kingshot.planningAppointmentDesc"), status: t("common.comingSoon") },
  ]
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">{t("kingshot.planningTitle")}</span></h1>
          <p className="text-[#a0a0b0]">{t("kingshot.planningDesc")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planningTools.map((tool) => (
            <GlassCard key={tool.title} hover>
              <GlassCardContent>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{tool.icon}</span>
                  <Badge variant="warning">{tool.status}</Badge>
                </div>
                <GlassCardTitle className="mb-2">{tool.title}</GlassCardTitle>
                <p className="text-sm text-[#a0a0b0]">{tool.desc}</p>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
