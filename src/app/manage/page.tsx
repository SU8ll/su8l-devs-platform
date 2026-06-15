"use client"
export const dynamic = 'force-dynamic'
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useLocale } from "@/components/language-provider"

const statCards = [
  { key: "totalServers", value: "3", color: "#00c8ff" },
  { key: "activeUsers", value: "1.2k", color: "#34d399" },
  { key: "commandsRun", value: "8.5k", color: "#7c3aed" },
  { key: "uptime", value: "99.9%", color: "#fbbf24" },
]

const fakeServers = [
  { name: "SU8L Community", members: "450", status: "online", version: "v3.2.0" },
  { name: "Kingshot Alliances", members: "230", status: "online", version: "v3.2.0" },
  { name: "Beta Testing", members: "45", status: "online", version: "v3.3.0-beta" },
]

export default function ManagePage() {
  const { t } = useLocale()
  const { data: session, status } = useSession()
  const [codes, setCodes] = useState<any[]>([])
  const [showGenerate, setShowGenerate] = useState(false)
  const [genDesc, setGenDesc] = useState("")
  const [genMaxUses, setGenMaxUses] = useState("1")
  const [genExpiry, setGenExpiry] = useState("")
  const [genLoading, setGenLoading] = useState(false)
  const [genResult, setGenResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (status !== "authenticated") return
    const role = session?.user?.role
    if (role !== "OWNER" && role !== "ADMIN") return
    fetch("/api/manage/codes").then(r => r.json()).then(d => setCodes(d.codes || [])).catch(() => {})
  }, [status, session])

  if (status === "loading") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00c8ff] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (status === "unauthenticated") {
    redirect("/login")
  }

  const isOwner = session?.user?.role === "OWNER" || session?.user?.role === "ADMIN"

  if (!isOwner) {
    return (
      <div className="min-h-screen bg-[#06060e] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <GlassCard className="p-8">
            <GlassCardContent>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center text-3xl">
                ⚠️
              </div>
              <h1 className="text-2xl font-bold mb-3">{t("manage.noAccess")}</h1>
              <p className="text-[#a0a0b0] text-sm mb-8">{t("manage.noAccessDesc")}</p>
              <Link href="/redeem">
                <Button variant="primary">{t("manage.redeemBtn")}</Button>
              </Link>
            </GlassCardContent>
          </GlassCard>
        </motion.div>
      </div>
    )
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setGenLoading(true)
    setGenResult(null)
    setCopied(false)
    try {
      const res = await fetch("/api/manage/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: genDesc,
          maxUses: genMaxUses,
          expiresInDays: genExpiry,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setGenResult(data.code)
        setGenDesc("")
        setGenMaxUses("1")
        setGenExpiry("")
        fetch("/api/manage/codes").then(r => r.json()).then(d => setCodes(d.codes || [])).catch(() => {})
      }
    } catch {}
    setGenLoading(false)
  }

  const handleCopy = async (code: string) => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#06060e]">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                <span className="gradient-text">{t("manage.title")}</span>
              </h1>
              <p className="text-[#a0a0b0] mt-1">{t("manage.subtitle")}</p>
            </div>
            <Badge variant="info">OWNER</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat) => (
              <GlassCard key={stat.key}>
                <GlassCardContent>
                  <p className="text-sm text-[#a0a0b0] mb-1">{t(`manage.${stat.key}`)}</p>
                  <p className="text-3xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                </GlassCardContent>
              </GlassCard>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <GlassCard className="lg:col-span-2">
              <GlassCardHeader>
                <GlassCardTitle>{t("manage.serverList")}</GlassCardTitle>
                <p className="text-sm text-[#a0a0b0]">{t("manage.serverListDesc")}</p>
              </GlassCardHeader>
              <GlassCardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("manage.serverName")}</th>
                        <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("manage.members")}</th>
                        <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("manage.status")}</th>
                        <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("manage.botVersion")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fakeServers.map((server) => (
                        <tr key={server.name} className="border-b border-white/5 hover:bg-white/[0.02]">
                          <td className="py-3 px-4 font-medium">{server.name}</td>
                          <td className="py-3 px-4 text-[#a0a0b0]">{server.members}</td>
                          <td className="py-3 px-4">
                            <Badge variant="success">{server.status}</Badge>
                          </td>
                          <td className="py-3 px-4 text-[#a0a0b0]">{server.version}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCardContent>
            </GlassCard>

            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle>{t("manage.config")}</GlassCardTitle>
                <p className="text-sm text-[#a0a0b0]">{t("manage.configDesc")}</p>
              </GlassCardHeader>
              <GlassCardContent className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm text-white/60">{t("manage.language")}</label>
                  <select className="input-glass w-full">
                    <option>English</option>
                    <option>العربية</option>
                    <option>Deutsch</option>
                    <option>Türkçe</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm text-white/60">{t("manage.prefix")}</label>
                  <input type="text" className="input-glass w-full" defaultValue="!" />
                </div>
                <Button className="w-full">{t("manage.saveConfig")}</Button>
              </GlassCardContent>
            </GlassCard>
          </div>

          <GlassCard className="mb-8">
            <GlassCardHeader>
              <GlassCardTitle>{t("manage.codes")}</GlassCardTitle>
              <p className="text-sm text-[#a0a0b0]">{t("manage.codesDesc")}</p>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="flex justify-end mb-4">
                <Button onClick={() => { setShowGenerate(!showGenerate); setGenResult(null) }}>
                  {t("manage.generateCode")}
                </Button>
              </div>

              {showGenerate && (
                <form onSubmit={handleGenerate} className="mb-6 p-4 rounded-lg bg-white/5 space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-sm text-white/60">{t("manage.codeDescription")}</label>
                    <input
                      type="text"
                      className="input-glass w-full"
                      value={genDesc}
                      onChange={(e) => setGenDesc(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm text-white/60">{t("manage.codeMaxUses")}</label>
                      <input
                        type="number"
                        className="input-glass w-full"
                        value={genMaxUses}
                        onChange={(e) => setGenMaxUses(e.target.value)}
                        min={1}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm text-white/60">{t("manage.codeExpiry")}</label>
                      <input
                        type="number"
                        className="input-glass w-full"
                        value={genExpiry}
                        onChange={(e) => setGenExpiry(e.target.value)}
                        min={1}
                      />
                    </div>
                  </div>
                  {genResult && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-emerald-400 text-sm flex-1 font-mono tracking-wider">{genResult}</span>
                      <Button size="sm" variant="ghost" onClick={() => handleCopy(genResult)}>
                        {copied ? t("manage.codeCopied") : "Copy"}
                      </Button>
                    </div>
                  )}
                  <Button type="submit" className="w-full" disabled={genLoading}>
                    {genLoading ? "..." : t("manage.generateCode")}
                  </Button>
                </form>
              )}

              {codes.length === 0 ? (
                <p className="text-center text-[#a0a0b0] py-8">{t("manage.noCodes")}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("manage.code")}</th>
                        <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("manage.codeDescription")}</th>
                        <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("manage.uses")}</th>
                        <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("manage.created")}</th>
                        <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("manage.expires")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {codes.map((c: any) => (
                        <tr key={c.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                          <td className="py-3 px-4 font-mono text-[#00c8ff]">{c.code}</td>
                          <td className="py-3 px-4 text-[#a0a0b0]">{c.description || "—"}</td>
                          <td className="py-3 px-4 text-[#a0a0b0]">{c.usedCount}/{c.maxUses}</td>
                          <td className="py-3 px-4 text-[#a0a0b0]">{new Date(c.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 px-4 text-[#a0a0b0]">
                            {c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : "∞"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </GlassCardContent>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
