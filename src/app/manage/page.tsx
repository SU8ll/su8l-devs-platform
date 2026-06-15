"use client"
export const dynamic = 'force-dynamic'
import { motion } from "framer-motion"
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
        </motion.div>
      </div>
    </div>
  )
}
