"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/components/language-provider"

export default function AdminFeedbackPage() {
  const { t } = useLocale()
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2"><span className="gradient-text">{t("admin.feedback.title")}</span></h1>
        <p className="text-[#a0a0b0] mb-8">{t("admin.feedback.desc")}</p>

        <GlassCard>
          <GlassCardContent>
            <div className="flex items-center gap-4 mb-6">
              {["all", "pending", "reviewed", "implemented"].map((tab) => (
                <button key={tab} className={`px-4 py-2 rounded-lg text-sm transition-colors ${tab === "all" ? "bg-[#00c8ff]/20 text-[#00c8ff]" : "text-[#a0a0b0] hover:text-white hover:bg-white/5"}`}>
                  {t(`admin.feedback.${tab}`)}
                </button>
              ))}
            </div>
            <div className="text-center py-12 text-[#a0a0b0]">
              <p>{t("admin.feedback.noFeedback")}</p>
            </div>
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  )
}
