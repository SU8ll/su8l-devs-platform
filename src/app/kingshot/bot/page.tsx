"use client"

import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/components/language-provider"

const fadeUp: any = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" } }) }
const stagger: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const itemVariants: any = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }

export default function BotPage() {
  const { t } = useLocale()

  const features = [
    { icon: "🏰", title: t("bot.featuresList.alliance"), desc: t("bot.featuresList.allianceDesc") },
    { icon: "🎁", title: t("bot.featuresList.gifts"), desc: t("bot.featuresList.giftsDesc") },
    { icon: "🔔", title: t("bot.featuresList.notifications"), desc: t("bot.featuresList.notificationsDesc") },
    { icon: "📋", title: t("bot.featuresList.attendance"), desc: t("bot.featuresList.attendanceDesc") },
    { icon: "🐻", title: t("bot.featuresList.bear"), desc: t("bot.featuresList.bearDesc") },
    { icon: "🏛️", title: t("bot.featuresList.minister"), desc: t("bot.featuresList.ministerDesc") },
    { icon: "🎨", title: t("bot.featuresList.themes"), desc: t("bot.featuresList.themesDesc") },
    { icon: "🔒", title: t("bot.featuresList.permissions"), desc: t("bot.featuresList.permissionsDesc") },
    { icon: "🆘", title: t("bot.featuresList.backup"), desc: t("bot.featuresList.backupDesc") },
    { icon: "🎯", title: t("bot.featuresList.captcha"), desc: t("bot.featuresList.captchaDesc") },
    { icon: "🛒", title: t("bot.featuresList.shop"), desc: t("bot.featuresList.shopDesc") },
    { icon: "🔑", title: t("bot.featuresList.login"), desc: t("bot.featuresList.loginDesc") },
    { icon: "📊", title: t("bot.featuresList.stats"), desc: t("bot.featuresList.statsDesc") },
    { icon: "🤝", title: t("bot.featuresList.support"), desc: t("bot.featuresList.supportDesc") },
  ]
  return (
    <div className="relative overflow-hidden pt-24">
      <div className="hero-glow left-1/4 top-1/4 bg-[#5865F2]" />
      <div className="hero-glow right-1/4 top-1/3 bg-[#00c8ff]" />

      <section className="relative px-4 py-24 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mx-auto max-w-4xl">
          <motion.div variants={fadeUp} custom={0} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#5865F2]/20 bg-[#5865F2]/5 px-4 py-1.5 text-sm text-[#5865F2]">
            <span className="h-2 w-2 rounded-full bg-[#5865F2] animate-pulse-glow" />
            {t("bot.badge")}
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="mb-6 text-5xl font-extrabold sm:text-6xl">
            {t("bot.title").split(" ")[0]} <span className="text-[#5865F2]">{t("bot.title").split(" ")[1] || ""}</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mb-2 max-w-2xl text-lg text-[#a0a0b0]">
            {t("bot.subtitle")}
          </motion.p>
          <motion.p variants={fadeUp} custom={3} className="mx-auto mb-8 max-w-xl text-sm text-[#a0a0b0]/70">
            {t("bot.desc")}
          </motion.p>
          <motion.div variants={fadeUp} custom={4} className="flex flex-wrap justify-center gap-4">
            <a href="https://discord.gg/VYQjs6wWnN" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg" className="bg-[#5865F2] from-[#5865F2] to-[#4752C4]">
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" /></svg>
                {t("bot.getBot")}
              </Button>
            </a>
            <a href="https://discord.gg/VYQjs6wWnN" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg">{t("bot.supportServer")}</Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="section-title">{t("bot.features")}</h2>
            <p className="mx-auto max-w-xl text-[#a0a0b0]">{t("bot.featuresDesc")}</p>
          </motion.div>
          <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {features.map((f) => (
              <motion.div key={f.title} variants={itemVariants}>
                <GlassCard className="h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#5865F2]/20 to-[#00c8ff]/20 text-2xl">{f.icon}</div>
                  <GlassCardTitle className="mb-2">{f.title}</GlassCardTitle>
                  <GlassCardContent>
                    <p className="text-sm leading-relaxed text-[#a0a0b0]">{f.desc}</p>
                  </GlassCardContent>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="section-title mb-4">{t("bot.needHelp")}</h2>
            <p className="mx-auto mb-8 max-w-lg text-[#a0a0b0]">
              {t("bot.needHelpDesc")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://discord.gg/VYQjs6wWnN" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" className="bg-[#5865F2]">{t("bot.joinDiscord")}</Button>
              </a>
              <a href="https://wa.me/966561261377" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="lg">{t("bot.whatsapp")}</Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}