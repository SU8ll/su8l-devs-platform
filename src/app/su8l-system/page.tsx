"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { useRef } from "react"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/components/language-provider"
import { ArrowRight, Shield, Music, Ticket, Bot, Brush, Mic, MessageSquare, Users, Zap, Star, Command, Bell, Hash, Gamepad2, ExternalLink, Heart, Globe } from "lucide-react"

const fadeUp: any = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" } }) }
const stagger: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const cardHover = { rest: { scale: 1, y: 0 }, hover: { scale: 1.03, y: -6, transition: { type: "spring" as const, stiffness: 300, damping: 15 } } }

const DISCORD_INVITE = "https://discord.gg/VYQjs6wWnN"
const WHATSAPP = "https://wa.me/966561261377"
const INSTAGRAM = "https://www.instagram.com/3erdo?igsh=d2RhdWZlZHpkZmFl&utm_source=qr"
const TIKTOK = "https://www.tiktok.com/@b8n?_r=1&_t=ZS-97BFIcjmVGf"
const PAYPAL = "https://paypal.me/su8ldevs"

const features = [
  { key: "ticketing", icon: Ticket, gradient: "from-violet-500 to-purple-600", color: "#8B5CF6" },
  { key: "music", icon: Music, gradient: "from-emerald-500 to-teal-600", color: "#10B981" },
  { key: "moderation", icon: Shield, gradient: "from-red-500 to-rose-600", color: "#EF4444" },
  { key: "automod", icon: Bot, gradient: "from-amber-500 to-orange-600", color: "#F59E0B" },
  { key: "customCommands", icon: Command, gradient: "from-cyan-500 to-blue-600", color: "#06B6D4" },
  { key: "announcements", icon: Bell, gradient: "from-pink-500 to-fuchsia-600", color: "#EC4899" },
  { key: "autorole", icon: Hash, gradient: "from-indigo-500 to-violet-600", color: "#6366F1" },
  { key: "logging", icon: MessageSquare, gradient: "from-slate-500 to-gray-600", color: "#64748B" },
  { key: "fun", icon: Gamepad2, gradient: "from-yellow-500 to-amber-600", color: "#EAB308" },
]

const whyItems = [
  { key: "whyAllInOne", icon: Zap, color: "#8B5CF6" },
  { key: "whyReliable", icon: Shield, color: "#10B981" },
  { key: "whyModern", icon: Star, color: "#F59E0B" },
  { key: "whySupport", icon: Users, color: "#3B82F6" },
]

export default function SU8LSystemPage() {
  const { t, locale, dir } = useLocale()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  const ts = (key: string) => t(`su8lSystem.${key}`)

  return (
    <div className="relative min-h-screen" dir={dir}>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#16213e] to-[#0f3460]" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />
          </div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        </motion.div>

        <motion.div className="relative z-10 max-w-6xl mx-auto px-4 text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mb-4">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm bg-violet-500/20 text-violet-300 border-violet-500/30">
              <Bot className="w-3.5 h-3.5 mr-1.5 inline" /> {ts("badge")}
            </Badge>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
            {ts("title")}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl md:text-2xl text-slate-300 mb-2 font-light">
            {ts("subtitle")}
          </motion.p>
          <motion.p variants={fadeUp} className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            {ts("desc")}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-violet-500/25 group">
              {ts("addToDiscord")} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg rounded-xl cursor-pointer">
                {ts("supportServer")} <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
            {[
              { value: ts("serversValue"), label: ts("servers") },
              { value: ts("membersValue"), label: ts("members") },
              { value: ts("ticketsHandledValue"), label: ts("ticketsHandled") },
              { value: ts("uptimeValue"), label: ts("uptime") },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-3 bg-slate-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-4">{ts("features")}</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400">{ts("featuresDesc")}</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div key={feature.key} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <motion.div variants={cardHover} initial="rest" whileHover="hover" className="relative group">
                    <GlassCard glow className="h-full">
                      <GlassCardContent className="p-6">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 mb-4 shadow-lg`}>
                          <Icon className="w-full h-full text-white" />
                        </div>
                        <GlassCardTitle className="text-lg mb-2">{ts(feature.key)}</GlassCardTitle>
                        <p className="text-sm text-slate-400 leading-relaxed">{ts(`${feature.key}Desc`)}</p>
                      </GlassCardContent>
                    </GlassCard>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why SU8L System */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-900/10 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-4">{ts("whyTitle")}</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto">{ts("whyDesc")}</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div key={item.key} className="relative" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                  <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all h-full">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: item.color + "20" }}>
                      <Icon className="w-8 h-8" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{ts(item.key)}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{ts(`${item.key}Desc`)}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">{ts("statsTitle")}</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 mb-12">{ts("statsDesc")}</motion.p>
          </motion.div>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              { value: ts("serversValue"), label: ts("servers"), icon: Users },
              { value: ts("membersValue"), label: ts("members"), icon: MessageSquare },
              { value: ts("ticketsHandledValue"), label: ts("ticketsHandled"), icon: Ticket },
              { value: ts("uptimeValue"), label: ts("uptime"), icon: Zap },
            ].map((stat, i) => {
              const StatIcon = stat.icon
              return (
                <motion.div key={i} variants={fadeUp} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <StatIcon className="w-8 h-8 text-violet-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-4">{ts("pricing")}</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400">{ts("pricingDesc")}</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {["free", "premium", "enterprise"].map((tier, i) => {
              const isPopular = tier === "premium"
              return (
                <motion.div key={tier} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className={`relative rounded-2xl p-8 border ${isPopular ? "border-violet-500 bg-violet-500/10" : "border-white/10 bg-white/5"} backdrop-blur-sm`}>
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-violet-600 text-white text-xs font-semibold rounded-full">
                      <Star className="w-3 h-3 inline mr-1" /> {ts("commingSoon")}
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{ts(tier)}</h3>
                  <div className="text-4xl font-bold mb-4">{ts(`${tier}Price`)} <span className="text-base font-normal text-slate-400">/mo</span></div>
                  <p className="text-sm text-slate-400 mb-6">{ts(`${tier}Desc`)}</p>
                  <ul className="space-y-3 mb-8">
                    {[1, 2, 3, 4, 5].map(j => (
                      <li key={j} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">✦</span> {ts(`${tier}Features${j}`)}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${isPopular ? "bg-violet-600 hover:bg-violet-700" : "bg-white/10 hover:bg-white/20"}`} variant={isPopular ? "primary" : "secondary"}>
                    {ts("getStarted")}
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-transparent to-emerald-900/20" />
        <motion.div className="relative max-w-4xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6">{ts("cta")}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">{ts("ctaDesc")}</motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-700 hover:to-emerald-700 text-white px-10 py-6 text-lg rounded-xl shadow-xl group">
              <Bot className="mr-2 w-5 h-5" /> {ts("ctaButton")} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg rounded-xl cursor-pointer">
                {ts("ctaSecondary")} <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Social */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">{ts("social")}</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400">{ts("socialDesc")}</motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
            {[
              { href: DISCORD_INVITE, icon: MessageSquare, label: ts("discord"), desc: ts("discordDesc"), color: "hover:bg-indigo-600/20 hover:border-indigo-500/50" },
              { href: WHATSAPP, icon: Globe, label: ts("whatsapp"), desc: ts("whatsappDesc"), color: "hover:bg-emerald-600/20 hover:border-emerald-500/50" },
              { href: INSTAGRAM, icon: Heart, label: ts("instagram"), desc: ts("instagramDesc"), color: "hover:bg-pink-600/20 hover:border-pink-500/50" },
              { href: TIKTOK, icon: Music, label: ts("tiktok"), desc: ts("tiktokDesc"), color: "hover:bg-cyan-600/20 hover:border-cyan-500/50" },
            ].map((social, i) => {
              const Icon = social.icon
              return (
                <motion.a key={i} href={social.href} target="_blank" rel="noopener noreferrer" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className={`p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center group transition-all ${social.color}`}>
                  <Icon className="w-10 h-10 text-slate-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold text-sm mb-1">{social.label}</div>
                  <div className="text-xs text-slate-500">{social.desc}</div>
                </motion.a>
              )
            })}
          </div>

          {/* Donate */}
          <motion.div className="max-w-md mx-auto text-center p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 backdrop-blur-sm"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <Heart className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">{ts("donate")}</h3>
              <p className="text-sm text-slate-400 mb-6">{ts("donateDesc")}</p>
              <a href={PAYPAL} target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-5 rounded-xl text-lg shadow-lg">
                  <Heart className="mr-2 w-5 h-5" /> {ts("donateButton")}
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer Extra */}
      <footer className="relative py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center text-sm text-slate-500">
          <p className="mb-2">© 2026 <Link href="/" className="text-violet-400 hover:text-violet-300">SU8L DEvs</Link>. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <Link href="/legal/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/legal/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href={DISCORD_INVITE} target="_blank" className="hover:text-slate-300 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
