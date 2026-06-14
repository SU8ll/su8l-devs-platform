"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/components/language-provider"

const fadeUp: any = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" } }) }
const stagger: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const itemVariants: any = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }

export default function HomePage() {
  const { t } = useLocale()

  const capabilities = [
    { icon: "🤖", title: t("capabilities.discordBots"), desc: t("capabilities.discordBotsDesc") },
    { icon: "⚡", title: t("capabilities.software"), desc: t("capabilities.softwareDesc") },
    { icon: "🌐", title: t("capabilities.web"), desc: t("capabilities.webDesc") },
    { icon: "🔧", title: t("capabilities.custom"), desc: t("capabilities.customDesc") },
    { icon: "📊", title: t("capabilities.data"), desc: t("capabilities.dataDesc") },
    { icon: "🎮", title: t("capabilities.gaming"), desc: t("capabilities.gamingDesc") },
  ]

  const featuredSections = [
    { icon: "🔥", title: t("featured.kingshot"), desc: t("featured.kingshotDesc"), href: "/kingshot", accent: "#ff6b35", badge: t("featured.popular") },
    { icon: "🤖", title: t("featured.bot"), desc: t("featured.botDesc"), href: "/kingshot/bot", accent: "#5865F2", badge: t("featured.active") },
    { icon: "🌐", title: t("featured.web"), desc: t("featured.webDesc"), href: "/projects", accent: "#7c3aed", badge: t("featured.dev") },
  ]

  const updates = [
    { version: "v3.0.0", badge: "primary" as const, date: t("updates.v300Date"), title: t("updates.v300Title"), desc: t("updates.v300Desc"), items: [t("updates.v300Item1"), t("updates.v300Item2"), t("updates.v300Item3"), t("updates.v300Item4")] },
    { version: "v2.4.0", badge: "success" as const, date: t("updates.v240Date"), title: t("updates.v240Title"), desc: t("updates.v240Desc"), items: [t("updates.v240Item1"), t("updates.v240Item2"), t("updates.v240Item3")] },
    { version: "v2.3.0", badge: "secondary" as const, date: t("updates.v230Date"), title: t("updates.v230Title"), desc: t("updates.v230Desc"), items: [t("updates.v230Item1"), t("updates.v230Item2"), t("updates.v230Item3")] },
  ]

  return (
    <div className="relative overflow-hidden">
      <div className="hero-glow left-1/4 top-1/4 bg-[#00c8ff]" />
      <div className="hero-glow right-1/4 top-1/3 bg-[#7c3aed]" />
      <div className="hero-glow bottom-1/4 left-1/3 bg-[#ff6b35]" />

      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-24 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 max-w-4xl">
          <motion.div variants={fadeUp} custom={0} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00c8ff]/20 bg-[#00c8ff]/5 px-4 py-1.5 text-sm text-[#00c8ff]">
            <span className="h-2 w-2 rounded-full bg-[#00c8ff] animate-pulse-glow" />
            {t("hero.badge")}
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="mb-6 text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl">
            <span className="gradient-text">{t("hero.title")}</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mx-auto mb-4 max-w-2xl text-lg text-[#a0a0b0] sm:text-xl">
            {t("site.tagline")}
          </motion.p>
          <motion.p variants={fadeUp} custom={3} className="mx-auto mb-10 max-w-2xl text-sm text-[#a0a0b0]/70 sm:text-base">
            {t("site.desc")}
          </motion.p>
          <motion.div variants={fadeUp} custom={4} className="flex flex-wrap justify-center gap-4">
            <Link href="/kingshot">
              <Button variant="primary" size="lg">
                {t("hero.cta")}
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="ghost" size="lg">{t("hero.cta2")}</Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="section-title">{t("sections.whatWeDo").split(" ")[0]} <span className="highlight">{t("sections.whatWeDo").split(" ").slice(1).join(" ")}</span></h2>
            <p className="mx-auto max-w-xl text-[#a0a0b0]">From bots to platforms — we build it all</p>
          </motion.div>
          <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {capabilities.map((c, i) => (
              <motion.div key={c.title} variants={itemVariants}>
                <GlassCard className="h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00c8ff]/20 to-[#7c3aed]/20 text-2xl">{c.icon}</div>
                  <GlassCardTitle className="mb-2">{c.title}</GlassCardTitle>
                  <GlassCardContent><p className="text-sm leading-relaxed text-[#a0a0b0]">{c.desc}</p></GlassCardContent>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-24">
        <div className="hero-glow left-1/3 top-1/2 bg-[#ff6b35]/20" />
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="section-title">{t("sections.featured").split(" ")[0]} <span className="highlight">{t("sections.featured").split(" ").slice(1).join(" ")}</span></h2>
            <p className="mx-auto max-w-xl text-[#a0a0b0]">Our main projects and tools</p>
          </motion.div>
          <motion.div className="grid gap-8 md:grid-cols-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {featuredSections.map((s, i) => (
              <motion.div key={s.title} variants={itemVariants}>
                <Link href={s.href} className="block h-full">
                  <GlassCard hover className="relative h-full overflow-hidden">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10" style={{ background: s.accent }} />
                    <div className="mb-4 flex items-start justify-between">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl" style={{ background: `${s.accent}15` }}>{s.icon}</span>
                      <Badge variant="primary">{s.badge}</Badge>
                    </div>
                    <GlassCardTitle className="mb-3 text-xl">{s.title}</GlassCardTitle>
                    <GlassCardContent>
                      <p className="text-sm leading-relaxed text-[#a0a0b0]">{s.desc}</p>
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
            <h2 className="section-title">{t("sections.latestUpdates").split(" ")[0]} <span className="highlight">{t("sections.latestUpdates").split(" ").slice(1).join(" ")}</span></h2>
            <p className="mx-auto max-w-xl text-[#a0a0b0]">We&apos;re constantly improving</p>
          </motion.div>
          <motion.div className="grid gap-6 md:grid-cols-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {updates.map((update) => (
              <motion.div key={update.version} variants={itemVariants}>
                <GlassCard className="flex h-full flex-col">
                  <GlassCardContent className="flex-1">
                    <div className="mb-3 flex items-center justify-between">
                      <Badge variant={update.badge}>{update.version}</Badge>
                      <span className="text-xs text-[#a0a0b0]">{update.date}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{update.title}</h3>
                    <p className="mb-4 text-sm text-[#a0a0b0]">{update.desc}</p>
                    <ul className="space-y-2">
                      {update.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#a0a0b0]/80">
                          <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#00c8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
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

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <GlassCard className="relative overflow-hidden border-[#5865F2]/20 p-8 sm:p-12">
              <div className="hero-glow -right-20 -top-20 bg-[#5865F2]" />
              <div className="hero-glow -bottom-20 -left-20 bg-[#00c8ff]" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5865F2]/20">
                  <svg className="h-8 w-8 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" /></svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold">{t("community.stayConnected")}</h3>
                <p className="mb-6 max-w-lg text-[#a0a0b0]">
                  Connect with thousands of players, share strategies, get help with tools, and stay updated on new features.
                </p>
                <a href="https://discord.gg/VYQjs6wWnN" target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="lg" className="bg-[#5865F2] from-[#5865F2] to-[#4752C4] hover:shadow-[0_4px_20px_rgba(88,101,242,0.3)]">
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" /></svg>
                    Join Discord
                  </Button>
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="section-title">{t("sections.getStarted").split(" ")[0]} <span className="highlight">{t("sections.getStarted").split(" ").slice(1).join(" ")}</span></h2>
            <p className="mx-auto mb-8 max-w-lg text-[#a0a0b0]">
              Explore our KINGSHOT tools or check out all our projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/kingshot">
                <Button variant="secondary" size="lg">
                  {t("sections.explore")}
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="ghost" size="lg">{t("sections.allProjects")}</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}