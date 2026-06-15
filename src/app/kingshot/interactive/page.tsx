"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/components/language-provider"

export default function InteractivePage() {
  const { t } = useLocale()
  const interactiveTools = [
    { title: t("kingshot.interactiveMap"), icon: "🗺️", desc: t("kingshot.interactiveMapDesc"), status: t("common.comingSoon") },
    { title: t("kingshot.interactiveTech"), icon: "🌳", desc: t("kingshot.interactiveTechDesc"), status: t("common.comingSoon") },
    { title: t("kingshot.interactiveHero"), icon: "⚔️", desc: t("kingshot.interactiveHeroDesc"), status: t("common.comingSoon") },
    { title: t("kingshot.interactiveResource"), icon: "📊", desc: t("kingshot.interactiveResourceDesc"), status: t("common.comingSoon") },
    { title: t("kingshot.interactiveProgress"), icon: "📈", desc: t("kingshot.interactiveProgressDesc"), status: t("common.comingSoon") },
    { title: t("kingshot.interactiveKingdom"), icon: "👑", desc: t("kingshot.interactiveKingdomDesc"), status: t("common.comingSoon") },
  ]
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">{t("kingshot.interactiveTitle")}</span></h1>
          <p className="text-[#a0a0b0]">{t("kingshot.interactiveDesc")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interactiveTools.map((tool) => (
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
