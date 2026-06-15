"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/components/language-provider"
import { CALCULATOR_LIST } from "@/lib/constants"

const fadeUp: any = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" } }) }
const stagger: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const itemVariants: any = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }

export default function KingshotPage() {
  const { t } = useLocale()

  const categories = [
    { key: "all", label: t("kingshot.categoryAll"), icon: "⭐" },
    { key: "heroes", label: t("kingshot.categoryHeroes"), icon: "⚔️" },
    { key: "buildings", label: t("kingshot.categoryBuildings"), icon: "🏗️" },
    { key: "military", label: t("kingshot.categoryMilitary"), icon: "🛡️" },
    { key: "gear", label: t("kingshot.categoryGear"), icon: "🔨" },
    { key: "tech", label: t("kingshot.categoryTech"), icon: "🔬" },
    { key: "premium", label: t("kingshot.categoryPremium"), icon: "👑" },
    { key: "economy", label: t("kingshot.categoryEconomy"), icon: "💰" },
    { key: "pets", label: t("kingshot.categoryPets"), icon: "🐾" },
    { key: "events", label: t("kingshot.categoryEvents"), icon: "📅" },
  ]

  const sections = [
    { title: t("kingshot.sectionList.calculators"), desc: t("kingshot.sectionList.calculatorsDesc"), href: "/kingshot/calculators", icon: "🧮", tools: 13 },
    { title: t("kingshot.sectionList.database"), desc: t("kingshot.sectionList.databaseDesc"), href: "/kingshot/database", icon: "🗄️", tools: 4 },
    { title: t("kingshot.sectionList.planning"), desc: t("kingshot.sectionList.planningDesc"), href: "/kingshot/planning", icon: "📋", tools: 5 },
    { title: t("kingshot.sectionList.interactive"), desc: t("kingshot.sectionList.interactiveDesc"), href: "/kingshot/interactive", icon: "🗺️", tools: 3 },
    { title: t("kingshot.sectionList.bot"), desc: t("kingshot.sectionList.botDesc"), href: "/kingshot/bot", icon: "🤖", tools: 9 },
  ]
  return (
    <div className="relative overflow-hidden pt-24">
      <div className="hero-glow left-1/4 top-1/4 bg-[#00c8ff]" />
      <div className="hero-glow right-1/4 top-1/3 bg-[#ff6b35]" />

      <section className="relative px-4 py-24 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mx-auto max-w-4xl">
          <motion.div variants={fadeUp} custom={0} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff6b35]/20 bg-[#ff6b35]/5 px-4 py-1.5 text-sm text-[#ff6b35]">
            <span className="h-2 w-2 rounded-full bg-[#ff6b35] animate-pulse-glow" />
            {t("kingshot.badge")}
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="mb-6 text-5xl font-extrabold sm:text-6xl md:text-7xl">
            KING<span className="text-[#ff6b35]">SHOT</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mb-8 max-w-2xl text-lg text-[#a0a0b0]">
            {t("kingshot.subtitle")}
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap justify-center gap-4">
            <Link href="/kingshot/bot">
              <Button variant="secondary" size="lg">
                <span className="mr-2">🤖</span> {t("kingshot.bot")}
              </Button>
            </Link>
            <Link href="/kingshot/calculators">
              <Button variant="ghost" size="lg">{t("kingshot.explore")}</Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="section-title">{t("kingshot.sections")}</h2>
            <p className="mx-auto max-w-xl text-[#a0a0b0]">{t("kingshot.sectionsDesc")}</p>
          </motion.div>
          <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {sections.map((s, i) => (
              <motion.div key={s.title} variants={itemVariants}>
                <Link href={s.href} className="block h-full">
                  <GlassCard hover className="flex h-full flex-col">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6b35]/20 to-[#ff6b35]/5 text-2xl">{s.icon}</span>
                      <GlassCardTitle>{s.title}</GlassCardTitle>
                    </div>
                    <GlassCardContent className="flex-1">
                      <p className="mb-3 text-sm text-[#a0a0b0]">{s.desc}</p>
                      <Badge variant="secondary">{t("kingshot.toolsCount", { count: String(s.tools) })}</Badge>
                    </GlassCardContent>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="section-title">{t("kingshot.allCalculators")}</h2>
            <p className="mx-auto max-w-xl text-[#a0a0b0]">{t("kingshot.allCalculatorsDesc")}</p>
          </motion.div>
          <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {CALCULATOR_LIST.map((tool, i) => (
              <motion.div key={tool.slug} variants={itemVariants}>
                <Link href={`/kingshot/calculators/${tool.slug}`} className="block h-full">
                  <GlassCard hover className="flex h-full flex-col">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff6b35]/10 text-2xl">{tool.icon}</span>
                      <GlassCardTitle>{tool.title}</GlassCardTitle>
                    </div>
                    <GlassCardContent className="flex-1">
                      <p className="text-sm text-[#a0a0b0]">{t("calculator.calculate")} {tool.title.toLowerCase()}</p>
                    </GlassCardContent>
                    <div className="mt-4 flex items-center gap-2 text-xs text-[#ff6b35]">
                      <span>{t("calculator.calculate")}</span>
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}