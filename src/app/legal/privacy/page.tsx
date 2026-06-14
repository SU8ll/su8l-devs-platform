"use client"

import { motion } from "framer-motion"
import { GlassCard, GlassCardContent } from "@/components/glass-card"

export default function PrivacyPage() {
  return (
    <div className="relative overflow-hidden pt-24">
      <div className="hero-glow left-1/4 top-1/4 bg-[#00c8ff]/30" />
      <div className="hero-glow right-1/4 bottom-1/4 bg-[#ff6b35]/30" />

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl mb-4">Privacy <span className="text-[#00c8ff]">Policy</span></h1>
            <p className="text-[#a0a0b0]">Last updated: June 12, 2026</p>
          </motion.div>

          <GlassCard>
            <GlassCardContent>
              <div className="prose prose-invert max-w-none space-y-6 text-[#a0a0b0]">

                <h2 className="text-xl font-semibold text-white mt-8">1. Data We Collect</h2>
                <p>We collect only the minimum data necessary to operate our Services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Player IDs (FID):</strong> For alliance member registration and management</li>
                  <li><strong>Discord User IDs:</strong> For permission management and command execution</li>
                  <li><strong>Channel and Server IDs:</strong> To determine where to send notifications and responses</li>
                  <li><strong>Gift Codes:</strong> For tracking and automated redemption</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">2. How We Use Data</h2>
                <p>Data is used exclusively to provide and improve our Services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Alliance member management</li>
                  <li>Attendance tracking and reporting</li>
                  <li>Automated gift code redemption</li>
                  <li>Event notifications and reminders</li>
                  <li>Minister scheduling</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">3. Data Storage</h2>
                <p>All data is stored locally in secure databases within our servers. We do not send your data to any external servers or third-party services. We implement reasonable security measures to protect your data.</p>

                <h2 className="text-xl font-semibold text-white mt-8">4. Data Sharing</h2>
                <p>We do not share, sell, or transfer your personal data to any third party. Your data remains private and is used only for the operation of our Services.</p>

                <h2 className="text-xl font-semibold text-white mt-8">5. Data Deletion</h2>
                <p>You can request deletion of all your data at any time. For Discord bot users, removing the bot from your server will automatically delete all associated data within 30 days. For other requests, contact us directly.</p>

                <h2 className="text-xl font-semibold text-white mt-8">6. Data Security</h2>
                <p>We take reasonable precautions to protect your data from unauthorized access, alteration, or destruction. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

                <h2 className="text-xl font-semibold text-white mt-8">7. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify users of significant changes through our Discord server or website. Continued use after changes constitutes acceptance of the new policy.</p>

                <h2 className="text-xl font-semibold text-white mt-8">8. Contact</h2>
                <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Discord: <a href="https://discord.gg/VYQjs6wWnN" className="text-[#00c8ff] hover:underline">Join our Discord</a></li>
                  <li>Instagram: <a href="https://www.instagram.com/3erdo?igsh=d2RhdWZlZHpkZmFl&utm_source=qr" className="text-[#00c8ff] hover:underline">@3erdo</a></li>
                  <li>TikTok: <a href="https://www.tiktok.com/@b8n?_r=1&_t=ZS-97BFIcjmVGf" className="text-[#00c8ff] hover:underline">@b8n</a></li>
                  <li>WhatsApp: <a href="https://wa.me/966561261377" className="text-[#00c8ff] hover:underline">+966561261377</a></li>
                </ul>

                <p className="mt-8 text-center text-sm text-[#a0a0b0]/60">SU8L DEvs — All rights reserved</p>
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}