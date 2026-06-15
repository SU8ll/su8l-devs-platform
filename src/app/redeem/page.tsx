"use client"
export const dynamic = 'force-dynamic'
import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { GlassCard, GlassCardContent } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/components/language-provider"

export default function RedeemPage() {
  const { t } = useLocale()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    if (status !== "authenticated" || !session?.user) {
      setMessage({ type: "error", text: t("redeem.needAccount") })
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim().toUpperCase() }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage({ type: "success", text: t("redeem.success") })
        setTimeout(() => router.push("/manage"), 2000)
      } else {
        setMessage({ type: "error", text: data.error || t("redeem.invalidCode") })
      }
    } catch {
      setMessage({ type: "error", text: t("redeem.serverError") })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#06060e] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-8">
          <GlassCardContent>
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00c8ff] to-[#7c3aed] flex items-center justify-center text-2xl">
                🔑
              </div>
              <h1 className="text-2xl font-bold">{t("redeem.title")}</h1>
              <p className="text-[#a0a0b0] text-sm mt-1">{t("redeem.subtitle")}</p>
            </div>

            {status === "unauthenticated" && (
              <div className="text-center py-4">
                <p className="text-[#a0a0b0] text-sm mb-4">{t("redeem.needAccount")}</p>
                <Link href="/login">
                  <Button variant="primary">{t("redeem.signIn")}</Button>
                </Link>
              </div>
            )}

            {status === "authenticated" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  className="input-glass w-full text-center text-lg tracking-[0.2em] uppercase"
                  placeholder={t("redeem.codePlaceholder")}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={20}
                  required
                />

                {message && (
                  <div
                    className={`p-3 rounded-lg text-sm text-center ${
                      message.type === "success"
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={loading || !code.trim()}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("redeem.submit")}
                    </span>
                  ) : (
                    t("redeem.submit")
                  )}
                </Button>
              </form>
            )}
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  )
}
