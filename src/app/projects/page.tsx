"use client"

import { motion } from "framer-motion"
import { useLocale } from "@/components/language-provider"
import Link from "next/link"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const fadeUp: any = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" } }) }
const stagger: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const itemVariants: any = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }

export default function ProjectsPage() {
  const { t } = useLocale()
  const projects = [
    {
      title: t("data.projectSU8LBot"),
      badge: t("projects.active"),
      badgeVariant: "primary" as const,
      icon: "🤖",
      desc: t("data.projectSU8LBotDesc"),
      features: [t("data.projectSU8LBotFeature1"), t("data.projectSU8LBotFeature2"), t("data.projectSU8LBotFeature3"), t("data.projectSU8LBotFeature4"), t("data.projectSU8LBotFeature5"), t("data.projectSU8LBotFeature6")],
      links: [{ href: "/kingshot/bot", label: t("data.projectBotPage") }],
    },
    {
      title: t("data.projectCalcSuite"),
      badge: t("projects.active"),
      badgeVariant: "primary" as const,
      icon: "🧮",
      desc: t("data.projectCalcSuiteDesc"),
      features: [t("data.projectCalcSuiteFeature1"), t("data.projectCalcSuiteFeature2"), t("data.projectCalcSuiteFeature3"), t("data.projectCalcSuiteFeature4")],
      links: [{ href: "/kingshot", label: t("data.projectKingshotHub") }],
    },
    {
      title: t("data.projectDatabase"),
      badge: t("projects.active"),
      badgeVariant: "primary" as const,
      icon: "🗄️",
      desc: t("data.projectDatabaseDesc"),
      features: [t("data.projectDatabaseFeature1"), t("data.projectDatabaseFeature2"), t("data.projectDatabaseFeature3"), t("data.projectDatabaseFeature4")],
      links: [{ href: "/kingshot/database", label: t("data.projectDatabaseLink") }],
    },
    {
      title: t("data.projectPlanning"),
      badge: t("projects.active"),
      badgeVariant: "primary" as const,
      icon: "📋",
      desc: t("data.projectPlanningDesc"),
      features: [t("data.projectPlanningFeature1"), t("data.projectPlanningFeature2"), t("data.projectPlanningFeature3"), t("data.projectPlanningFeature4")],
      links: [{ href: "/kingshot/planning", label: t("data.projectPlanningTools") }],
    },
    {
      title: t("data.projectWeb"),
      badge: t("projects.inDevelopment"),
      badgeVariant: "secondary" as const,
      icon: "🌐",
      desc: t("data.projectWebDesc"),
      features: [t("data.projectWebFeature1"), t("data.projectWebFeature2"), t("data.projectWebFeature3"), t("data.projectWebFeature4")],
      links: [{ href: "/", label: t("data.projectPlatformHome") }],
    },
    {
      title: t("data.projectAutomation"),
      badge: t("projects.comingSoon"),
      badgeVariant: "success" as const,
      icon: "⚡",
      desc: t("data.projectAutomationDesc"),
      features: [t("data.projectAutomationFeature1"), t("data.projectAutomationFeature2"), t("data.projectAutomationFeature3"), t("data.projectAutomationFeature4")],
      links: [],
    },
  ]

  return (
    <div className="relative overflow-hidden pt-24">
      <div className="hero-glow left-1/4 top-1/4 bg-[#00c8ff]" />
      <div className="hero-glow right-1/4 top-1/3 bg-[#7c3aed]" />

      <section className="relative px-4 py-24 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mx-auto max-w-4xl">
          <motion.div variants={fadeUp} custom={0} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00c8ff]/20 bg-[#00c8ff]/5 px-4 py-1.5 text-sm text-[#00c8ff]">
            <span className="h-2 w-2 rounded-full bg-[#00c8ff] animate-pulse-glow" />
            {t("projects.badge")}
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="mb-6 text-5xl font-extrabold sm:text-6xl md:text-7xl">
            {t("projects.title").split(" ").length > 1 ? (
              <>{t("projects.title").split(" ").slice(0, -1).join(" ")} <span className="gradient-text">{t("projects.title").split(" ").pop()}</span></>
            ) : (
              <span className="gradient-text">{t("projects.title")}</span>
            )}
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mb-8 max-w-2xl text-lg text-[#a0a0b0]">
            {t("projects.desc")}
          </motion.p>
        </motion.div>
      </section>

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div className="grid gap-8 md:grid-cols-2" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {projects.map((p) => (
              <motion.div key={p.title} variants={itemVariants}>
                <GlassCard className="h-full">
                  <div className="mb-4 flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00c8ff]/20 to-[#7c3aed]/20 text-3xl">{p.icon}</span>
                    <Badge variant={p.badgeVariant}>{p.badge}</Badge>
                  </div>
                  <GlassCardTitle className="mb-3 text-2xl">{p.title}</GlassCardTitle>
                  <GlassCardContent>
                    <p className="mb-4 text-sm leading-relaxed text-[#a0a0b0]">{p.desc}</p>
                    <ul className="mb-6 space-y-2">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-[#a0a0b0]/80">
                          <svg className="h-4 w-4 shrink-0 text-[#00c8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                    {p.links.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {p.links.map((l) => (
                          <Link key={l.href} href={l.href}>
                            <Button variant="ghost" size="sm">{l.label}</Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </GlassCardContent>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}