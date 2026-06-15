"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLocale } from "@/components/language-provider"

export default function CommunityPage() {
  const { t } = useLocale()
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">{t("community.title")}</span></h1>
          <p className="text-[#a0a0b0]">{t("community.desc")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <GlassCard hover>
            <GlassCardContent className="text-center">
              <div className="text-4xl mb-3">💬</div>
              <GlassCardTitle>{t("community.discord")}</GlassCardTitle>
              <p className="text-sm text-[#a0a0b0] my-3">{t("community.discordDesc")}</p>
              <a href="https://discord.gg/VYQjs6wWnN" target="_blank" rel="noopener noreferrer"><Button variant="primary" size="sm">{t("community.discord")}</Button></a>
            </GlassCardContent>
          </GlassCard>
          <GlassCard hover>
            <GlassCardContent className="text-center">
              <div className="text-4xl mb-3">📝</div>
              <GlassCardTitle>{t("community.feedback")}</GlassCardTitle>
              <p className="text-sm text-[#a0a0b0] my-3">{t("community.feedbackDesc")}</p>
              <Link href="/community/feedback">
                <Button variant="secondary" size="sm">{t("community.feedback")}</Button>
              </Link>
            </GlassCardContent>
          </GlassCard>
          <GlassCard hover>
            <GlassCardContent className="text-center">
              <div className="text-4xl mb-3">🐛</div>
              <GlassCardTitle>{t("community.bugs")}</GlassCardTitle>
              <p className="text-sm text-[#a0a0b0] my-3">{t("community.bugsDesc")}</p>
              <Button variant="ghost" size="sm">{t("community.bugs")}</Button>
            </GlassCardContent>
          </GlassCard>
        </div>

        <GlassCard>
          <GlassCardContent className="text-center py-12">
            <h2 className="text-2xl font-bold mb-3">{t("community.stayConnected")}</h2>
            <p className="text-[#a0a0b0] mb-6 max-w-md mx-auto">
              {t("community.stayConnectedDesc")}
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://discord.gg/VYQjs6wWnN" target="_blank" rel="noopener noreferrer"><GlassCard hover className="px-6 py-3"><span className="font-semibold">{t("community.discord")}</span></GlassCard></a>
              <a href="https://www.instagram.com/3erdo?igsh=d2RhdWZlZHpkZmFl&utm_source=qr" target="_blank" rel="noopener noreferrer"><GlassCard hover className="px-6 py-3"><span className="font-semibold">{t("social.instagram")}</span></GlassCard></a>
              <a href="https://www.tiktok.com/@b8n?_r=1&_t=ZS-97BFIcjmVGf" target="_blank" rel="noopener noreferrer"><GlassCard hover className="px-6 py-3"><span className="font-semibold">{t("social.tiktok")}</span></GlassCard></a>
              <a href="https://wa.me/966561261377" target="_blank" rel="noopener noreferrer"><GlassCard hover className="px-6 py-3"><span className="font-semibold">{t("social.whatsapp")}</span></GlassCard></a>
            </div>
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  )
}
