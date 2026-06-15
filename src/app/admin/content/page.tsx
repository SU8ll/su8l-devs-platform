"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/components/language-provider"

export default function AdminContentPage() {
  const { t } = useLocale()
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold"><span className="gradient-text">{t("admin.content.title")}</span></h1>
            <p className="text-[#a0a0b0] mt-1">{t("admin.content.desc")}</p>
          </div>
          <Button>{t("admin.content.newPost")}</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>{t("admin.content.blogPosts")}</GlassCardTitle>
              <Badge variant="primary">{t("admin.content.published", { count: "0" })}</Badge>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-center py-8 text-[#a0a0b0] text-sm">
                {t("admin.content.noPosts")}
              </div>
            </GlassCardContent>
          </GlassCard>
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>{t("admin.content.guides")}</GlassCardTitle>
              <Badge variant="primary">{t("admin.content.published", { count: "0" })}</Badge>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-center py-8 text-[#a0a0b0] text-sm">
                {t("admin.content.noGuides")}
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}
