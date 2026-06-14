"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { GlassCard, GlassCardContent } from "@/components/glass-card"
import { useLocale } from "@/components/language-provider"

const faqs = [
  {
    q: "What is SU8L DEVs?",
    a: "SU8L DEVs is a fan-made companion platform providing advanced calculators, databases, planning tools, and Discord bots for strategy games, primarily Kingshot. Our tools help players optimize hero progression, building upgrades, resource management, and more.",
  },
  {
    q: "Are the calculators accurate?",
    a: "Yes, our calculators are built on verified formulas from Kingshot.net and are regularly updated to match the latest game versions. However, game mechanics may change with updates, so always double-check critical values in-game.",
  },
  {
    q: "How do I get the SU8L Discord bot?",
    a: "The SU8L Bot is available through our Discord server. Join our community at discord.gg/VYQjs6wWnN and open a ticket to request access. A staff member will help you set it up for your server.",
  },
  {
    q: "Is there a mobile app?",
    a: "Currently, SU8L DEVs is a web-based platform optimized for both desktop and mobile browsers. We may consider a native app in the future based on community demand.",
  },
  {
    q: "Is SU8L DEVs free to use?",
    a: "Yes, all our tools and calculators are completely free. We may offer optional donations to support development, but all core features will always remain free.",
  },
  {
    q: "How do I report a bug or suggest a feature?",
    a: "You can submit feedback directly on our website through the Community > Feedback page, or join our Discord server and post in the suggestions or bug-report channels.",
  },
  {
    q: "Why do I need to verify my email?",
    a: "Email verification helps us prevent spam accounts and ensures that you can recover your account if you forget your password. Your email is never shared with third parties.",
  },
  {
    q: "I didn't receive the verification email. What should I do?",
    a: "Check your spam or junk folder first. If it's not there, try registering again with the same email — the system will resend the verification link. Make sure you entered the correct email address.",
  },
  {
    q: "How do I delete my account?",
    a: "You can request account deletion by contacting us through our Discord server or WhatsApp. We will process your request within 7 days.",
  },
  {
    q: "Do you store my personal data?",
    a: "We only store the minimum data necessary to operate our services (email, username). We do not share, sell, or transfer your data to third parties. See our Privacy Policy for details.",
  },
  {
    q: "What games do you support?",
    a: "Our primary focus is Kingshot. We may expand to other strategy games based on community interest and developer capacity.",
  },
  {
    q: "How can I support the project?",
    a: "You can support us by joining our Discord community, submitting feedback, reporting bugs, sharing the platform with others, or making a donation through our support channels.",
  },
]

export default function FAQPage() {
  const { t } = useLocale()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="relative overflow-hidden pt-24">
      <div className="hero-glow left-1/4 top-1/4 bg-[#00c8ff]/30" />
      <div className="hero-glow right-1/4 bottom-1/4 bg-[#7c3aed]/30" />

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl mb-4">
              {t("faq.title")}
            </h1>
            <p className="text-[#a0a0b0] max-w-lg mx-auto">
              {t("faq.desc")}
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <GlassCard
                  className="cursor-pointer transition-all duration-300 hover:border-[#00c8ff]/20"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <GlassCardContent className="py-4 px-6">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold text-white text-sm sm:text-base">{faq.q}</h3>
                      <svg
                        className={`w-5 h-5 shrink-0 text-[#a0a0b0] transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-white/5"
                      >
                        <p className="text-sm text-[#a0a0b0] leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </GlassCardContent>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
