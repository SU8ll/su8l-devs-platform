"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/components/language-provider"

export default function DatabasePage() {
  const { t } = useLocale()
  const dbCategories = [
    { title: t("kingshot.databaseHeroes"), icon: "⭐", desc: t("kingshot.databaseHeroesDesc"), slug: "#", count: t("kingshot.databaseHeroesCount") },
    { title: t("kingshot.databaseBuildings"), icon: "🏗️", desc: t("kingshot.databaseBuildingsDesc"), slug: "#", count: t("kingshot.databaseBuildingsCount") },
    { title: t("kingshot.databaseEquipment"), icon: "🛡️", desc: t("kingshot.databaseEquipmentDesc"), slug: "#", count: t("kingshot.databaseEquipmentCount") },
    { title: t("kingshot.databasePets"), icon: "🐾", desc: t("kingshot.databasePetsDesc"), slug: "#", count: t("kingshot.databasePetsCount") },
    { title: t("kingshot.databaseMasters"), icon: "📖", desc: t("kingshot.databaseMastersDesc"), slug: "#", count: t("kingshot.databaseMastersCount") },
    { title: t("kingshot.databaseTechnology"), icon: "🔬", desc: t("kingshot.databaseTechnologyDesc"), slug: "#", count: t("kingshot.databaseTechnologyCount") },
  ]
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">{t("kingshot.databaseTitle")}</span></h1>
          <p className="text-[#a0a0b0]">{t("kingshot.databaseDesc")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dbCategories.map((cat) => (
            <Link key={cat.title} href={cat.slug}>
              <GlassCard hover>
                <GlassCardContent>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <Badge variant="primary">{t("kingshot.entries", { count: cat.count })}</Badge>
                  </div>
                  <GlassCardTitle className="mb-2">{cat.title}</GlassCardTitle>
                  <p className="text-sm text-[#a0a0b0]">{cat.desc}</p>
                </GlassCardContent>
              </GlassCard>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
