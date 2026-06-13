"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CALCULATOR_LIST, SITE_NAME } from "@/lib/constants"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stagger: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const count = 0
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="tabular-nums"
      >
        {to}
        {suffix}
      </motion.span>
    </motion.span>
  )
}

const stats = [
  { value: 12, suffix: "+", label: "Tools" },
  { value: 10, suffix: "K+", label: "Users" },
  { value: 4, suffix: "", label: "Languages" },
  { value: 99.9, suffix: "%", label: "Uptime" },
]

const updates = [
  {
    version: "v2.4.0",
    badge: "primary",
    date: "June 2026",
    title: "Pet Calculator & War Academy",
    desc: "Major update with two new calculators and performance improvements.",
    items: ["New Pet Calculator with full cost tables", "War Academy skill cost calculator", "50% faster load times"],
  },
  {
    version: "v2.3.0",
    badge: "secondary",
    date: "May 2026",
    title: "Database Explorer Beta",
    desc: "Browse heroes, equipment, and buildings with live search and filters.",
    items: ["Hero stats database with skill details", "Equipment set comparison tool", "Building cost reference tables"],
  },
  {
    version: "v2.2.0",
    badge: "success",
    date: "April 2026",
    title: "Planning Tools Launch",
    desc: "Plan your upgrades with resource tracking and timelines.",
    items: ["Resource planner with goal tracking", "Upgrade timeline generator", "Export plans to PDF"],
  },
]

const features = [
  { icon: "⚡", title: "Real-time Calculators", desc: "Instant results for hero progression, buildings, troops, and more as you adjust values." },
  { icon: "🗄️", title: "Database Explorer", desc: "Comprehensive databases for heroes, equipment, buildings, and game mechanics." },
  { icon: "📋", title: "Planning Tools", desc: "Plan upgrades, track resources, and generate timelines for your goals." },
  { icon: "🗺️", title: "Interactive Maps", desc: "Visual maps for equipment sets, hero gear, and upgrade paths." },
  { icon: "🌍", title: "Multi-language", desc: "Available in 4 languages with more being added by the community." },
  { icon: "♾️", title: "Free Forever", desc: "All tools are completely free. No subscriptions, no hidden paywalls." },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* ==================== HERO ==================== */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-24 text-center">
        <div className="hero-glow left-1/4 top-1/4 bg-[#00c8ff]" />
        <div className="hero-glow right-1/4 top-1/3 bg-[#7c3aed]" />
        <div className="hero-glow bottom-1/4 left-1/3 bg-[#ff6b35]" />

        <motion.div
          className="relative z-10 max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00c8ff]/20 bg-[#00c8ff]/5 px-4 py-1.5 text-sm text-[#00c8ff]"
            variants={fadeUp}
            custom={0}
          >
            <span className="h-2 w-2 rounded-full bg-[#00c8ff] animate-pulse-glow" />
            Premium Gaming Companion Platform
          </motion.div>

          <motion.h1
            className="mb-6 text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl"
            variants={fadeUp}
            custom={1}
          >
            <span className="gradient-text">{SITE_NAME}</span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-4 max-w-2xl text-lg text-[#a0a0b0] sm:text-xl"
            variants={fadeUp}
            custom={2}
          >
            Advanced strategy game tools at your fingertips
          </motion.p>

          <motion.p
            className="mx-auto mb-10 max-w-xl text-sm text-[#a0a0b0]/70 sm:text-base"
            variants={fadeUp}
            custom={3}
          >
            Hero progression, building upgrades, equipment optimization, and planning tools
            designed for competitive players who demand precision.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={fadeUp}
            custom={4}
          >
            <Link href="/register">
              <Button variant="primary" size="lg">
                Get Started
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
            <Link href="/tools/calculators">
              <Button variant="ghost" size="lg">
                Explore Tools
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute left-[15%] top-[20%] h-16 w-16 rounded-xl border border-[#00c8ff]/20 bg-[#00c8ff]/5"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[20%] top-[30%] h-10 w-10 rounded-full border border-[#ff6b35]/20 bg-[#ff6b35]/5"
          animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-[25%] right-[15%] h-12 w-12 rounded-lg border border-[#7c3aed]/20 bg-[#7c3aed]/5"
          animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </section>

      {/* ==================== FEATURED TOOLS ==================== */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="section-title">
              Featured <span className="highlight">Tools</span>
            </h2>
            <p className="mx-auto max-w-xl text-[#a0a0b0]">
              Everything you need to optimize your gameplay
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {CALCULATOR_LIST.slice(0, 6).map((tool, i) => (
              <motion.div key={tool.slug} variants={itemVariants}>
                <Link href={`/tools/calculators/${tool.slug}`} className="block h-full">
                  <GlassCard hover className="flex h-full flex-col">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00c8ff]/10 text-2xl">
                        {tool.icon}
                      </span>
                      <GlassCardTitle>{tool.title}</GlassCardTitle>
                    </div>
                    <GlassCardContent className="flex-1">
                      <p className="text-sm text-[#a0a0b0]">
                        Calculate and optimize your {tool.title.toLowerCase()} with precision.
                      </p>
                    </GlassCardContent>
                    <div className="mt-4 flex items-center gap-2 text-xs text-[#00c8ff]">
                      <span>Explore</span>
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/tools/calculators">
              <Button variant="ghost" size="md">
                View All Tools
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== STATISTICS ==================== */}
      <section className="relative px-4 py-24">
        <div className="hero-glow left-1/3 top-1/2 bg-[#00c8ff]" />
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={itemVariants}>
                <GlassCard className="text-center" glow>
                  <GlassCardContent>
                    <div className="mb-2 text-4xl font-bold text-[#00c8ff]">
                      <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm text-[#a0a0b0]">{stat.label}</p>
                  </GlassCardContent>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== LATEST UPDATES ==================== */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="section-title">
              Latest <span className="highlight">Updates</span>
            </h2>
            <p className="mx-auto max-w-xl text-[#a0a0b0]">
              We&apos;re constantly improving the platform
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {updates.map((update, i) => (
              <motion.div key={update.version} variants={itemVariants}>
                <GlassCard className="flex h-full flex-col">
                  <GlassCardContent className="flex-1">
                    <div className="mb-3 flex items-center justify-between">
                      <Badge variant={update.badge as any}>{update.version}</Badge>
                      <span className="text-xs text-[#a0a0b0]">{update.date}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{update.title}</h3>
                    <p className="mb-4 text-sm text-[#a0a0b0]">{update.desc}</p>
                    <ul className="space-y-2">
                      {update.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#a0a0b0]/80">
                          <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#00c8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlassCardContent>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== COMMUNITY ==================== */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="relative overflow-hidden border-[#5865F2]/20 p-8 sm:p-12">
              <div className="hero-glow -right-20 -top-20 bg-[#5865F2]" />
              <div className="hero-glow -bottom-20 -left-20 bg-[#00c8ff]" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5865F2]/20">
                  <svg className="h-8 w-8 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold">Join Our Community</h3>
                <p className="mb-6 max-w-lg text-[#a0a0b0]">
                  Connect with thousands of players, share strategies, get help with tools, and stay updated on new features.
                </p>
                <a href="https://discord.gg/su8ldevs" target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="lg" className="bg-[#5865F2] from-[#5865F2] to-[#4752C4] hover:shadow-[0_4px_20px_rgba(88,101,242,0.3)]">
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                    </svg>
                    Join Discord
                  </Button>
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ==================== FEATURES GRID ==================== */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="section-title">
              Everything You <span className="highlight">Need</span>
            </h2>
            <p className="mx-auto max-w-xl text-[#a0a0b0]">
              A complete toolkit for strategy game enthusiasts
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, i) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <GlassCard className="h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00c8ff]/20 to-[#7c3aed]/20 text-2xl">
                    {feature.icon}
                  </div>
                  <GlassCardTitle className="mb-2">{feature.title}</GlassCardTitle>
                  <GlassCardContent>
                    <p className="text-sm leading-relaxed text-[#a0a0b0]">{feature.desc}</p>
                  </GlassCardContent>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA BANNER ==================== */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="section-title">
              Ready to <span className="highlight">Dominate</span>?
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-[#a0a0b0]">
              Join thousands of players already using {SITE_NAME} to optimize their strategy.
            </p>
            <Link href="/register">
              <Button variant="secondary" size="lg">
                Create Free Account
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
