"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { GlassCard, GlassCardContent } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { SITE_NAME } from "@/lib/constants"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
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

      router.push("/login?registered=true")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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
              <h1 className="text-2xl font-bold">Create Account</h1>
              <p className="text-[#a0a0b0] text-sm mt-1">Join {SITE_NAME} today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm text-[#a0a0b0] mb-1">Username</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-glass w-full"
                  placeholder="Your username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#a0a0b0] mb-1">Email</label>
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
                <label className="block text-sm text-[#a0a0b0] mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-glass w-full"
                  placeholder="Min. 8 characters"
                  minLength={8}
                  required
                />
              </div>

              <Button type="submit" loading={loading} className="w-full">
                Create Account
              </Button>
            </form>

            <p className="text-center text-sm text-[#a0a0b0] mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-[#00c8ff] hover:underline">
                Sign in
              </Link>
            </p>
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  )
}
