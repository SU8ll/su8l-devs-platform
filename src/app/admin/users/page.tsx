"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/components/language-provider"

export default function AdminUsersPage() {
  const { t } = useLocale()
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2"><span className="gradient-text">{t("admin.users.title")}</span></h1>
        <p className="text-[#a0a0b0] mb-8">{t("admin.users.desc")}</p>

        <GlassCard>
          <GlassCardContent>
            <div className="flex items-center justify-between mb-6">
              <input className="input-glass max-w-xs" placeholder={t("admin.users.search")} />
              <Badge variant="primary">{t("admin.users.total", { count: "0" })}</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("admin.users.tableUser")}</th>
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("admin.users.tableEmail")}</th>
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("admin.users.tableRole")}</th>
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">{t("admin.users.tableJoined")}</th>
                    <th className="text-right py-3 px-4 text-[#a0a0b0]">{t("admin.users.tableActions")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[#a0a0b0]">
                      {t("admin.users.noUsers")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  )
}
