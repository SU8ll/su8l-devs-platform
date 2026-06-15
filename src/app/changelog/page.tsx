"use client"
import { motion } from "framer-motion"
import { useLocale } from "@/components/language-provider"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"

export default function ChangelogPage() {
  const { t } = useLocale()
  const changes = [
    { version: "1.0.0", title: t("data.changelog1Title"), date: "2024-12-01", items: [t("data.changelog1Item1"), t("data.changelog1Item2"), t("data.changelog1Item3"), t("data.changelog1Item4"), t("data.changelog1Item5"), t("data.changelog1Item6"), t("data.changelog1Item7"), t("data.changelog1Item8")], type: "major" as const },
    { version: "0.9.0", title: t("data.changelog2Title"), date: "2024-11-15", items: [t("data.changelog2Item1"), t("data.changelog2Item2"), t("data.changelog2Item3")], type: "beta" as const },
  ]
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">{t("changelog.title")}</span></h1>
          <p className="text-[#a0a0b0]">{t("changelog.desc")}</p>
        </div>
        <div className="space-y-6">
          {changes.map((change) => (
            <GlassCard key={change.version} className="relative">
              <div className="absolute -left-3 top-8 w-6 h-6 rounded-full bg-[#00c8ff] border-4 border-[#06060e]" />
              <GlassCardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-[#00c8ff]">v{change.version}</span>
                  <Badge variant={change.type === "major" ? "primary" : "warning"}>
                    {change.type === "major" ? t("changelog.majorUpdate") : t("changelog.beta")}
                  </Badge>
                </div>
                <span className="text-sm text-[#a0a0b0]">{change.date}</span>
              </GlassCardHeader>
              <GlassCardContent>
                <h3 className="font-semibold mb-3">{change.title}</h3>
                <ul className="space-y-2">
                  {change.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#a0a0b0]">
                      <span className="text-[#00c8ff] mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
