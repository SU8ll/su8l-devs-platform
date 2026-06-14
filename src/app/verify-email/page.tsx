"use client"

import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { GlassCard, GlassCardContent } from "@/components/glass-card"
import { Button } from "@/components/ui/button"

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const token = searchParams.get("token")
    const email = searchParams.get("email")

    if (!token || !email) {
      setStatus("error")
      setMessage("Missing verification parameters.")
      return
    }

    fetch(`/api/verify-email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`)
      .then((res) => {
        if (res.redirected) {
          window.location.href = res.url
          return
        }
        setStatus("error")
        setMessage("Verification failed. Please try again.")
      })
      .catch(() => {
        setStatus("error")
        setMessage("Something went wrong.")
      })
  }, [searchParams])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <GlassCard className="p-8">
          <GlassCardContent>
            {status === "loading" && (
              <>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#00c8ff]/10 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[#00c8ff] border-t-transparent rounded-full animate-spin" />
                </div>
                <h1 className="text-2xl font-bold mb-3">Verifying...</h1>
                <p className="text-[#a0a0b0] text-sm">Please wait while we verify your email.</p>
              </>
            )}
            {status === "error" && (
              <>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center text-3xl">
                  ⚠️
                </div>
                <h1 className="text-2xl font-bold mb-3">Verification Failed</h1>
                <p className="text-[#a0a0b0] text-sm mb-8">{message}</p>
                <Link href="/login">
                  <Button variant="primary">Go to Sign In</Button>
                </Link>
              </>
            )}
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#00c8ff] border-t-transparent rounded-full animate-spin" /></div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
