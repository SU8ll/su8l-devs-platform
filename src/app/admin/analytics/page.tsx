"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/components/language-provider"

export default function AdminAnalyticsPage() {
  const { t } = useLocale()
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2"><span className="gradient-text">{t("admin.analytics.title")}</span></h1>
        <p className="text-[#a0a0b0] mb-8">{t("admin.analytics.desc")}</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: t("admin.analytics.totalUsers"), value: "0", color: "#00c8ff" },
            { label: t("admin.analytics.calculationsRun"), value: "0", color: "#ff6b35" },
            { label: t("admin.analytics.pageViews"), value: "0", color: "#7c3aed" },
            { label: t("admin.analytics.activeToday"), value: "0", color: "#34d399" },
          ].map((stat) => (
            <GlassCard key={stat.label}>
              <GlassCardContent>
                <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <p className="text-sm text-[#a0a0b0]">{stat.label}</p>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>{t("admin.analytics.popularTools")}</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-center py-8 text-[#a0a0b0] text-sm">
                {t("admin.analytics.noData")}
              </div>
            </GlassCardContent>
          </GlassCard>
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>{t("admin.analytics.userGrowth")}</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-center py-8 text-[#a0a0b0] text-sm">
                {t("admin.analytics.noData")}
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}
