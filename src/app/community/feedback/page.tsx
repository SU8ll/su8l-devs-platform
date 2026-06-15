"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { useLocale } from "@/components/language-provider"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"

export default function CommunityFeedbackPage() {
  const { t } = useLocale()
  const [type, setType] = useState("suggestion")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">{t("feedback.title")}</span></h1>
          <p className="text-[#a0a0b0]">{t("feedback.desc")}</p>
        </div>

        {submitted ? (
          <GlassCard>
            <GlassCardContent className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-xl font-bold mb-2">{t("feedback.thankYou")}</h2>
              <p className="text-[#a0a0b0]">{t("feedback.success")}</p>
              <Button className="mt-6" onClick={() => { setSubmitted(false); setTitle(""); setContent("") }}>{t("feedback.submitAnother")}</Button>
            </GlassCardContent>
          </GlassCard>
        ) : (
          <GlassCard>
            <GlassCardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#a0a0b0] mb-1">{t("feedback.type")}</label>
                  <Select
                    options={[
                      { value: "suggestion", label: t("feedback.suggestion") },
                      { value: "bug", label: t("feedback.bugReport") },
                      { value: "improvement", label: t("feedback.improvement") },
                      { value: "other", label: t("feedback.other") },
                    ]}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0b0] mb-1">{t("feedback.titleField")}</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-glass w-full" placeholder={t("feedback.titleHint")} required />
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0b0] mb-1">{t("feedback.description")}</label>
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} className="input-glass w-full min-h-[150px] resize-y" placeholder={t("feedback.descriptionHint")} required />
                </div>
                <Button type="submit" className="w-full">{t("feedback.submit")}</Button>
              </form>
            </GlassCardContent>
          </GlassCard>
        )}
      </motion.div>
    </div>
  )
}
