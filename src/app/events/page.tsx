"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"

const events = [
  { name: "KvK Season 8", desc: "Kingdom vs Kingdom Season 8 — prepare your troops!", date: "2024-12-15", type: "PvP", status: "upcoming" },
  { name: "Hero Trial Event", desc: "Limited-time hero trial with bonus rewards.", date: "2024-12-10", type: "PvE", status: "upcoming" },
  { name: "Gathering Boost", desc: "50% increased gathering speed for all resources.", date: "2024-12-05", type: "Boost", status: "active" },
]

export default function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3"><span className="gradient-text">Events</span></h1>
          <p className="text-[#a0a0b0]">Current and upcoming in-game events</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <GlassCard key={event.name} hover className={event.status === "active" ? "glow" : ""}>
              <GlassCardHeader>
                <Badge variant={event.status === "active" ? "success" : "warning"}>
                  {event.status === "active" ? "Active" : "Upcoming"}
                </Badge>
                <Badge variant="info">{event.type}</Badge>
              </GlassCardHeader>
              <GlassCardTitle className="mb-2">{event.name}</GlassCardTitle>
              <GlassCardContent>
                <p className="text-sm text-[#a0a0b0]">{event.desc}</p>
                <p className="text-xs text-[#a0a0b0] mt-4">Starts: {event.date}</p>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
