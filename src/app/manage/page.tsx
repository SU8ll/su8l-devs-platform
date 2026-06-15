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
import { BOT_MODULES } from "@/lib/bot-modules"

interface BotServer {
  id: string
  discordId: string
  name: string
  icon: string | null
  memberCount: number
  prefix: string
  language: string
  isPremium: boolean
  modules: BotModule[]
}

interface BotModule {
  id: string
  serverId: string
  key: string
  enabled: boolean
  settings: any
}

const categoryIcons: Record<string, string> = {
  shield: "🛡️",
  bot: "🤖",
  ticket: "🎫",
  music: "🎵",
  terminal: "💻",
  userPlus: "👤",
  megaphone: "📢",
  clipboardList: "📋",
  smile: "😊",
  users: "👥",
  gift: "🎁",
  calendarCheck: "📅",
  pawPrint: "🐾",
  crown: "👑",
  shieldCheck: "✅",
  bell: "🔔",
  hardDrive: "💾",
}

function getModuleDesc(key: string): string {
  const map: Record<string, string> = {
    moderation: "su8lSystem.moderationDesc",
    automod: "su8lSystem.automodDesc",
    ticketing: "su8lSystem.ticketingDesc",
    music: "su8lSystem.musicDesc",
    customCommands: "su8lSystem.customCommandsDesc",
    autorole: "su8lSystem.autoroleDesc",
    announcements: "su8lSystem.announcementsDesc",
    logging: "su8lSystem.loggingDesc",
    fun: "su8lSystem.funDesc",
    alliance: "bot.featuresList.allianceDesc",
    giftCodes: "bot.featuresList.giftsDesc",
    attendance: "bot.featuresList.attendanceDesc",
    bear: "bot.featuresList.bearDesc",
    minister: "bot.featuresList.ministerDesc",
    captcha: "bot.featuresList.captchaDesc",
    notifications: "bot.featuresList.notificationsDesc",
    backup: "bot.featuresList.backupDesc",
  }
  return map[key] || ""
}

function getModuleName(key: string): string {
  const map: Record<string, string> = {
    moderation: "su8lSystem.moderation",
    automod: "su8lSystem.automod",
    ticketing: "su8lSystem.ticketing",
    music: "su8lSystem.music",
    customCommands: "su8lSystem.customCommands",
    autorole: "su8lSystem.autorole",
    announcements: "su8lSystem.announcements",
    logging: "su8lSystem.logging",
    fun: "su8lSystem.fun",
    alliance: "bot.featuresList.alliance",
    giftCodes: "bot.featuresList.gifts",
    attendance: "bot.featuresList.attendance",
    bear: "bot.featuresList.bear",
    minister: "bot.featuresList.minister",
    captcha: "bot.featuresList.captcha",
    notifications: "bot.featuresList.notifications",
    backup: "bot.featuresList.backup",
  }
  return map[key] || key
}

export default function ManagePage() {
  const { t, locale } = useLocale()
  const { data: session, status } = useSession()
  const [servers, setServers] = useState<BotServer[]>([])
  const [selectedServer, setSelectedServer] = useState<BotServer | null>(null)
  const [tab, setTab] = useState<"overview" | "modules" | "config" | "codes">("overview")
  const [prefix, setPrefix] = useState("!")
  const [serverLang, setServerLang] = useState("en")
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState<string | null>(null)
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
    fetch("/api/manage/servers").then(r => r.json()).then(d => {
      setServers(d.servers || [])
      if (d.servers?.length > 0) {
        setSelectedServer(d.servers[0])
      }
    }).catch(() => {})
    fetch("/api/manage/codes").then(r => r.json()).then(d => setCodes(d.codes || [])).catch(() => {})
  }, [status, session])

  useEffect(() => {
    if (selectedServer) {
      setPrefix(selectedServer.prefix)
      setServerLang(selectedServer.language)
    }
  }, [selectedServer])

  if (status === "loading") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00c8ff] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (status === "unauthenticated") redirect("/login")

  const isOwner = session?.user?.role === "OWNER" || session?.user?.role === "ADMIN"

  if (!isOwner) {
    return (
      <div className="min-h-screen bg-[#06060e] flex items-center justify-center px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md text-center">
          <GlassCard className="p-8">
            <GlassCardContent>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center text-3xl">⚠️</div>
              <h1 className="text-2xl font-bold mb-3">{t("manage.noAccess")}</h1>
              <p className="text-[#a0a0b0] text-sm mb-8">{t("manage.noAccessDesc")}</p>
              <Link href="/redeem"><Button variant="primary">{t("manage.redeemBtn")}</Button></Link>
            </GlassCardContent>
          </GlassCard>
        </motion.div>
      </div>
    )
  }

  const toggleModule = async (key: string, enabled: boolean) => {
    if (!selectedServer) return
    const res = await fetch(`/api/manage/servers/${selectedServer.id}/modules/${key}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    })
    if (res.ok) {
      setSelectedServer(prev => {
        if (!prev) return prev
        const exists = prev.modules.find(m => m.key === key)
        if (exists) {
          return { ...prev, modules: prev.modules.map(m => m.key === key ? { ...m, enabled } : m) }
        }
        return { ...prev, modules: [...prev.modules, { id: "", serverId: prev.id, key, enabled, settings: null }] }
      })
    }
  }

  const saveConfig = async () => {
    if (!selectedServer) return
    setSaving(true)
    setSaveMsg(null)
    const res = await fetch(`/api/manage/servers/${selectedServer.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prefix, language: serverLang }),
    })
    if (res.ok) {
      setSaveMsg(t("manage.configSaved"))
      setTimeout(() => setSaveMsg(null), 2000)
    }
    setSaving(false)
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
        body: JSON.stringify({ description: genDesc, maxUses: genMaxUses, expiresInDays: genExpiry }),
      })
      const data = await res.json()
      if (res.ok) {
        setGenResult(data.code)
        setGenDesc(""); setGenMaxUses("1"); setGenExpiry("")
        fetch("/api/manage/codes").then(r => r.json()).then(d => setCodes(d.codes || [])).catch(() => {})
      } else {
        setGenResult("error:" + (data.error || "Unknown error"))
      }
    } catch (e: any) {
      setGenResult("error:" + (e.message || "Unknown error"))
    }
    setGenLoading(false)
  }

  const handleCopy = async (code: string) => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const moduleEnabled = (key: string) => {
    return selectedServer?.modules.find(m => m.key === key)?.enabled ?? true
  }

  return (
    <div className="min-h-screen bg-[#06060e]">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold"><span className="gradient-text">{t("manage.title")}</span></h1>
              <p className="text-[#a0a0b0] mt-1">{t("manage.subtitle")}</p>
            </div>
            <Badge variant="info">OWNER</Badge>
          </div>

          {/* Server selector */}
          <div className="mb-8">
            <div className="flex gap-2 flex-wrap">
              {servers.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedServer(s); setTab("overview") }}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedServer?.id === s.id
                      ? "bg-[#00c8ff]/20 text-[#00c8ff] border border-[#00c8ff]/30"
                      : "bg-white/5 text-[#a0a0b0] hover:bg-white/10 border border-transparent"
                  }`}
                >
                  {s.icon ? (
                    <img src={s.icon} alt="" className="w-4 h-4 rounded-full inline mr-2" />
                  ) : null}
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          {selectedServer && (
            <div className="flex gap-1 mb-6 border-b border-white/10">
              {(["overview", "modules", "config", "codes"] as const).map(tabKey => (
                <button
                  key={tabKey}
                  onClick={() => setTab(tabKey)}
                  className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
                    tab === tabKey
                      ? "text-[#00c8ff] border-[#00c8ff]"
                      : "text-[#a0a0b0] border-transparent hover:text-white"
                  }`}
                >
                  {tabKey === "modules" ? "Modules" : t(`manage.${tabKey}`)}
                </button>
              ))}
            </div>
          )}

          {selectedServer && tab === "overview" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { key: "totalServers", value: servers.length.toString(), color: "#00c8ff" },
                { key: "activeUsers", value: selectedServer.memberCount.toLocaleString(), color: "#34d399" },
                { key: "commandsRun", value: "8.5k", color: "#7c3aed" },
                { key: "uptime", value: "99.9%", color: "#fbbf24" },
              ].map(stat => (
                <GlassCard key={stat.key}>
                  <GlassCardContent>
                    <p className="text-sm text-[#a0a0b0] mb-1">{t(`manage.${stat.key}`)}</p>
                    <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                  </GlassCardContent>
                </GlassCard>
              ))}
            </div>
          )}

          {/* Modules Tab */}
          {selectedServer && tab === "modules" && (
            <div>
              {/* General Modules */}
              <h3 className="text-lg font-semibold mb-4 text-white/80">General</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {BOT_MODULES.filter(m => m.category === "general").map(mod => {
                  const enabled = moduleEnabled(mod.key)
                  return (
                    <GlassCard key={mod.key} className={`transition-all ${enabled ? "" : "opacity-60"}`}>
                      <GlassCardContent>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                              style={{ backgroundColor: mod.color + "20" }}
                            >
                              {categoryIcons[mod.icon] || "⚙️"}
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{t(getModuleName(mod.key))}</p>
                              <p className="text-xs text-[#a0a0b0]">{t(getModuleDesc(mod.key))}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs ${enabled ? "text-emerald-400" : "text-red-400"}`}>
                            {enabled ? t("manage.moduleEnabled") || "Enabled" : t("manage.moduleDisabled") || "Disabled"}
                          </span>
                          <button
                            onClick={() => toggleModule(mod.key, !enabled)}
                            className={`relative w-11 h-6 rounded-full transition-colors ${
                              enabled ? "bg-emerald-500" : "bg-white/20"
                            }`}
                          >
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                              enabled ? "translate-x-[22px]" : "translate-x-0.5"
                            }`} />
                          </button>
                        </div>
                      </GlassCardContent>
                    </GlassCard>
                  )
                })}
              </div>

              {/* Kingshot Modules */}
              <h3 className="text-lg font-semibold mb-4 text-white/80">Kingshot</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BOT_MODULES.filter(m => m.category === "kingshot").map(mod => {
                  const enabled = moduleEnabled(mod.key)
                  return (
                    <GlassCard key={mod.key} className={`transition-all ${enabled ? "" : "opacity-60"}`}>
                      <GlassCardContent>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                              style={{ backgroundColor: mod.color + "20" }}
                            >
                              {categoryIcons[mod.icon] || "⚙️"}
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{t(getModuleName(mod.key))}</p>
                              <p className="text-xs text-[#a0a0b0]">{t(getModuleDesc(mod.key))}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs ${enabled ? "text-emerald-400" : "text-red-400"}`}>
                            {enabled ? "Enabled" : "Disabled"}
                          </span>
                          <button
                            onClick={() => toggleModule(mod.key, !enabled)}
                            className={`relative w-11 h-6 rounded-full transition-colors ${
                              enabled ? "bg-emerald-500" : "bg-white/20"
                            }`}
                          >
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                              enabled ? "translate-x-[22px]" : "translate-x-0.5"
                            }`} />
                          </button>
                        </div>
                      </GlassCardContent>
                    </GlassCard>
                  )
                })}
              </div>
            </div>
          )}

          {/* Config Tab */}
          {selectedServer && tab === "config" && (
            <GlassCard className="max-w-lg">
              <GlassCardHeader>
                <GlassCardTitle>{t("manage.config")}</GlassCardTitle>
                <p className="text-sm text-[#a0a0b0]">{t("manage.configDesc")}</p>
              </GlassCardHeader>
              <GlassCardContent className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm text-white/60">{t("manage.language")}</label>
                  <select
                    className="input-glass w-full"
                    value={serverLang}
                    onChange={(e) => setServerLang(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                    <option value="de">Deutsch</option>
                    <option value="tr">Türkçe</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm text-white/60">{t("manage.prefix")}</label>
                  <input type="text" className="input-glass w-full" value={prefix} onChange={(e) => setPrefix(e.target.value)} />
                </div>
                {saveMsg && <p className="text-emerald-400 text-sm">{saveMsg}</p>}
                <Button className="w-full" onClick={saveConfig} disabled={saving}>
                  {saving ? "..." : t("manage.saveConfig")}
                </Button>
              </GlassCardContent>
            </GlassCard>
          )}

          {/* Codes Tab */}
          {tab === "codes" && (
            <GlassCard>
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
                      <input type="text" className="input-glass w-full" value={genDesc} onChange={(e) => setGenDesc(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-sm text-white/60">{t("manage.codeMaxUses")}</label>
                        <input type="number" className="input-glass w-full" value={genMaxUses} onChange={(e) => setGenMaxUses(e.target.value)} min={1} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm text-white/60">{t("manage.codeExpiry")}</label>
                        <input type="number" className="input-glass w-full" value={genExpiry} onChange={(e) => setGenExpiry(e.target.value)} min={1} />
                      </div>
                    </div>
                    {genResult && (
                      <div className={`flex items-center gap-2 p-3 rounded-lg ${
                        genResult.startsWith("error:")
                          ? "bg-red-500/10 border border-red-500/20"
                          : "bg-emerald-500/10 border border-emerald-500/20"
                      }`}>
                        <span className={`text-sm flex-1 font-mono tracking-wider ${
                          genResult.startsWith("error:") ? "text-red-400" : "text-emerald-400"
                        }`}>
                          {genResult.startsWith("error:") ? genResult.slice(6) : genResult}
                        </span>
                        {!genResult.startsWith("error:") && (
                          <Button size="sm" variant="ghost" onClick={() => handleCopy(genResult)}>
                            {copied ? t("manage.codeCopied") : "Copy"}
                          </Button>
                        )}
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
                            <td className="py-3 px-4 text-[#a0a0b0]">{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : "∞"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </GlassCardContent>
            </GlassCard>
          )}
        </motion.div>
      </div>
    </div>
  )
}
