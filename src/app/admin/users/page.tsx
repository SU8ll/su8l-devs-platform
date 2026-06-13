"use client"
import { motion } from "framer-motion"
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card"
import { Badge } from "@/components/ui/badge"

export default function AdminUsersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2"><span className="gradient-text">User Management</span></h1>
        <p className="text-[#a0a0b0] mb-8">Manage registered users and roles</p>

        <GlassCard>
          <GlassCardContent>
            <div className="flex items-center justify-between mb-6">
              <input className="input-glass max-w-xs" placeholder="Search users..." />
              <Badge variant="primary">0 total users</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">User</th>
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">Email</th>
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">Role</th>
                    <th className="text-left py-3 px-4 text-[#a0a0b0]">Joined</th>
                    <th className="text-right py-3 px-4 text-[#a0a0b0]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[#a0a0b0]">
                      No users registered yet
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
