"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/components/language-provider"

export default function AdminDatabasePage() {
  const { t } = useLocale()
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2"><span className="gradient-text">{t("admin.database.title")}</span></h1>
        <p className="text-[#a0a0b0] mb-8">{t("admin.database.desc")}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: t("admin.database.heroes"), count: 0, icon: "⭐" },
            { name: t("admin.database.buildings"), count: 0, icon: "🏗️" },
            { name: t("admin.database.equipment"), count: 0, icon: "🛡️" },
            { name: t("admin.database.pets"), count: 0, icon: "🐾" },
            { name: t("admin.database.masters"), count: 0, icon: "📖" },
            { name: t("admin.database.technology"), count: 0, icon: "🔬" },
          ].map((cat) => (
            <GlassCard key={cat.name} hover>
              <GlassCardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{cat.icon}</span>
                  <Badge variant="primary">{t("admin.database.entries", { count: String(cat.count) })}</Badge>
                </div>
                <GlassCardTitle>{cat.name}</GlassCardTitle>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
