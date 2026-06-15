export interface BotModuleDef {
  key: string
  category: "general" | "kingshot"
  icon: string
  color: string
}

export const BOT_MODULES: BotModuleDef[] = [
  { key: "moderation", category: "general", icon: "shield", color: "#ef4444" },
  { key: "automod", category: "general", icon: "bot", color: "#f97316" },
  { key: "ticketing", category: "general", icon: "ticket", color: "#3b82f6" },
  { key: "music", category: "general", icon: "music", color: "#8b5cf6" },
  { key: "customCommands", category: "general", icon: "terminal", color: "#14b8a6" },
  { key: "autorole", category: "general", icon: "userPlus", color: "#06b6d4" },
  { key: "announcements", category: "general", icon: "megaphone", color: "#eab308" },
  { key: "logging", category: "general", icon: "clipboardList", color: "#6366f1" },
  { key: "fun", category: "general", icon: "smile", color: "#ec4899" },
  { key: "alliance", category: "kingshot", icon: "users", color: "#22c55e" },
  { key: "giftCodes", category: "kingshot", icon: "gift", color: "#f59e0b" },
  { key: "attendance", category: "kingshot", icon: "calendarCheck", color: "#a855f7" },
  { key: "bear", category: "kingshot", icon: "pawPrint", color: "#92400e" },
  { key: "minister", category: "kingshot", icon: "crown", color: "#facc15" },
  { key: "captcha", category: "kingshot", icon: "shieldCheck", color: "#10b981" },
  { key: "notifications", category: "kingshot", icon: "bell", color: "#3b82f6" },
  { key: "backup", category: "kingshot", icon: "hardDrive", color: "#6b7280" },
]
