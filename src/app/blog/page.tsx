"use client"
import { motion } from "framer-motion"
import { useLocale } from "@/components/language-provider"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function BlogPage() {
  const { t } = useLocale()
  const posts = [
    { title: t("data.blogPost1Title"), excerpt: t("data.blogPost1Excerpt"), date: "2024-12-01", category: t("data.blogPost1Category"), author: t("data.blogPost1Author") },
    { title: t("data.blogPost2Title"), excerpt: t("data.blogPost2Excerpt"), date: "2024-11-28", category: t("data.blogPost2Category"), author: t("data.blogPost2Author") },
    { title: t("data.blogPost3Title"), excerpt: t("data.blogPost3Excerpt"), date: "2024-11-25", category: t("data.blogPost3Category"), author: t("data.blogPost3Author") },
  ]
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">{t("blog.title")}</span></h1>
          <p className="text-[#a0a0b0]">{t("blog.desc")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <GlassCard key={post.title} hover>
              <GlassCardHeader>
                <Badge variant="primary">{post.category}</Badge>
                <span className="text-xs text-[#a0a0b0]">{post.date}</span>
              </GlassCardHeader>
              <GlassCardTitle className="mb-2">{post.title}</GlassCardTitle>
              <GlassCardContent>
                <p className="text-sm text-[#a0a0b0]">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <span className="text-xs text-[#a0a0b0]">{t("blog.by", { author: post.author })}</span>
                  <Button variant="ghost" size="sm">{t("blog.readMore")}</Button>
                </div>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
