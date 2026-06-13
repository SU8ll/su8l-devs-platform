"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"

export default function CommunityFeedbackPage() {
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
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">Submit Feedback</span></h1>
          <p className="text-[#a0a0b0]">Help us improve the platform with your ideas and suggestions</p>
        </div>

        {submitted ? (
          <GlassCard>
            <GlassCardContent className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-xl font-bold mb-2">Thank You!</h2>
              <p className="text-[#a0a0b0]">Your feedback has been submitted successfully.</p>
              <Button className="mt-6" onClick={() => { setSubmitted(false); setTitle(""); setContent("") }}>Submit Another</Button>
            </GlassCardContent>
          </GlassCard>
        ) : (
          <GlassCard>
            <GlassCardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#a0a0b0] mb-1">Type</label>
                  <Select
                    options={[
                      { value: "suggestion", label: "Feature Suggestion" },
                      { value: "bug", label: "Bug Report" },
                      { value: "improvement", label: "Improvement" },
                      { value: "other", label: "Other" },
                    ]}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0b0] mb-1">Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-glass w-full" placeholder="Brief title for your feedback" required />
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0b0] mb-1">Description</label>
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} className="input-glass w-full min-h-[150px] resize-y" placeholder="Describe your suggestion or issue in detail..." required />
                </div>
                <Button type="submit" className="w-full">Submit Feedback</Button>
              </form>
            </GlassCardContent>
          </GlassCard>
        )}
      </motion.div>
    </div>
  )
}
