"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const fadeUp: any = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" } }) }
const stagger: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const itemVariants: any = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }

const projects = [
  {
    title: "SU8L Bot",
    badge: "Active",
    badgeVariant: "primary" as const,
    icon: "🤖",
    desc: "Full-featured Discord bot for Kingshot game servers. Manages alliances, gift codes, attendance, captcha, shop, and login system.",
    features: ["Alliance management", "Gift code redemption", "Attendance tracking", "Captcha system", "Minister scheduling", "Bear tracking"],
    links: [{ href: "/kingshot/bot", label: "Bot Page" }],
  },
  {
    title: "KINGSHOT Calculator Suite",
    badge: "Active",
    badgeVariant: "primary" as const,
    icon: "🧮",
    desc: "Comprehensive collection of 13+ calculators for hero progression, buildings, troops, VIP, equipment, and more.",
    features: ["Real-time calculations", "Mobile-responsive", "Multi-language support", "Free forever"],
    links: [{ href: "/kingshot", label: "Kingshot Hub" }],
  },
  {
    title: "KINGSHOT Database",
    badge: "Active",
    badgeVariant: "primary" as const,
    icon: "🗄️",
    desc: "Complete databases for masters, buildings, pets, and war academy technologies with search and filtering.",
    features: ["Browse all game data", "Search and filter", "Detailed stats", "Upgrade costs"],
    links: [{ href: "/kingshot/database", label: "Database" }],
  },
  {
    title: "Planning Tools",
    badge: "Active",
    badgeVariant: "primary" as const,
    icon: "📋",
    desc: "Plan upgrades, track resources, schedule events, and generate timelines for your kingdom.",
    features: ["Kingdom timeline", "Transfer planner", "Appointment scheduler", "Truegold tools"],
    links: [{ href: "/kingshot/planning", label: "Planning Tools" }],
  },
  {
    title: "Web Platform",
    badge: "In Development",
    badgeVariant: "secondary" as const,
    icon: "🌐",
    desc: "Our all-in-one web platform bringing together all SU8L DEvs tools, bots, and services in one place.",
    features: ["Unified dashboard", "Account system", "Community features", "Real-time sync"],
    links: [{ href: "/", label: "Platform Home" }],
  },
  {
    title: "Automation Tool",
    badge: "Coming Soon",
    badgeVariant: "success" as const,
    icon: "⚡",
    desc: "Desktop automation tool for repetitive game tasks. Designed to save time and increase efficiency.",
    features: ["Task automation", "Scheduler", "Multi-account support", "Safe & secure"],
    links: [],
  },
]

export default function ProjectsPage() {
  return (
    <div className="relative overflow-hidden pt-24">
      <div className="hero-glow left-1/4 top-1/4 bg-[#00c8ff]" />
      <div className="hero-glow right-1/4 top-1/3 bg-[#7c3aed]" />

      <section className="relative px-4 py-24 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mx-auto max-w-4xl">
          <motion.div variants={fadeUp} custom={0} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00c8ff]/20 bg-[#00c8ff]/5 px-4 py-1.5 text-sm text-[#00c8ff]">
            <span className="h-2 w-2 rounded-full bg-[#00c8ff] animate-pulse-glow" />
            Our Work
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="mb-6 text-5xl font-extrabold sm:text-6xl md:text-7xl">
            Our <span className="gradient-text">Projects</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mb-8 max-w-2xl text-lg text-[#a0a0b0]">
            From Discord bots to web platforms — we build tools that make a difference.
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