"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { GlassCard, GlassCardContent } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/components/language-provider"
import { SITE_NAME } from "@/lib/constants"

export default function RegisterPage() {
  const { t } = useLocale()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [registered, setRegistered] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Registration failed")
      }

      setRegistered(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (registered) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <GlassCard className="p-8 text-center">
            <GlassCardContent>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00c8ff] to-[#7c3aed] flex items-center justify-center text-3xl">
                ✉️
              </div>
              <h1 className="text-2xl font-bold mb-3">{t("register.checkEmail")}</h1>
              <p className="text-[#a0a0b0] text-sm mb-6 leading-relaxed">
                {t("register.checkEmailText").replace("{email}", email)}
              </p>
              <p className="text-[#a0a0b0] text-xs mb-8">
                {t("register.didntGet")}{" "}
                <button onClick={() => setRegistered(false)} className="text-[#00c8ff] hover:underline">
                  {t("register.tryAgain")}
                </button>
              </p>
              <Link href="/login">
                <Button variant="ghost" size="sm">{t("register.goToSignIn")}</Button>
              </Link>
            </GlassCardContent>
          </GlassCard>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-8">
          <GlassCardContent>
            <div className="text-center mb-8">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#00c8ff] to-[#7c3aed] flex items-center justify-center text-xl font-bold">
                S
              </div>
              <h1 className="text-2xl font-bold">{t("register.title")}</h1>
              <p className="text-[#a0a0b0] text-sm mt-1">{t("register.subtitle").replace("{name}", SITE_NAME)}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm text-[#a0a0b0] mb-1">{t("register.username")}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-glass w-full"
                  placeholder={t("register.username")}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#a0a0b0] mb-1">{t("register.email")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-glass w-full"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#a0a0b0] mb-1">{t("register.password")}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-glass w-full"
                  placeholder={t("register.minChars")}
                  minLength={8}
                  required
                />
              </div>

              <Button type="submit" loading={loading} className="w-full">
                {t("register.create")}
              </Button>
            </form>

            <p className="text-center text-sm text-[#a0a0b0] mt-6">
              {t("register.hasAccount")}{" "}
              <Link href="/login" className="text-[#00c8ff] hover:underline">
                {t("register.signIn")}
              </Link>
            </p>
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  )
}
