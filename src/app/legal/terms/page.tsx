"use client"

import { motion } from "framer-motion"
import { GlassCard, GlassCardContent } from "@/components/glass-card"

export default function TermsPage() {
  return (
    <div className="relative overflow-hidden pt-24">
      <div className="hero-glow left-1/4 top-1/4 bg-[#00c8ff]/30" />
      <div className="hero-glow right-1/4 bottom-1/4 bg-[#ff6b35]/30" />

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl mb-4">Terms of <span className="text-[#00c8ff]">Service</span></h1>
            <p className="text-[#a0a0b0]">Last updated: June 12, 2026</p>
          </motion.div>

          <GlassCard>
            <GlassCardContent>
              <div className="prose prose-invert max-w-none space-y-6 text-[#a0a0b0]">

                <h2 className="text-xl font-semibold text-white mt-8">1. Acceptance of Terms</h2>
                <p>By accessing or using any SU8L DEVs product, service, bot, or website (&ldquo;Services&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, do not use our Services.</p>

                <h2 className="text-xl font-semibold text-white mt-8">2. Description of Services</h2>
                <p>SU8L DEVs provides strategy game companion tools including calculators, databases, planning tools, and Discord bots for the Kingshot game. These tools are provided as-is for the purpose of enhancing gameplay experience.</p>

                <h2 className="text-xl font-semibold text-white mt-8">3. Permitted Use</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal, non-commercial use of all Services</li>
                  <li>Compliance with all applicable laws and platform Terms of Service (Discord, etc.)</li>
                  <li>Modification of our tools for personal use only</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">4. Prohibited Use</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Commercial sale or redistribution of any Service without written permission</li>
                  <li>Reverse engineering, hacking, or attempting to bypass security measures</li>
                  <li>Using Services for illegal activities or violating any laws</li>
                  <li>Attempting to disrupt, overload, or damage our infrastructure</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">5. Disclaimer</h2>
                <p>All Services are provided &ldquo;as is&rdquo; without any warranty, express or implied. We make no guarantees regarding accuracy, availability, or fitness for a particular purpose. Use at your own risk.</p>

                <h2 className="text-xl font-semibold text-white mt-8">6. Limitation of Liability</h2>
                <p>SU8L DEVs shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our Services.</p>

                <h2 className="text-xl font-semibold text-white mt-8">7. Data Collection</h2>
                <p>We do not collect personally identifiable information. Our Services process data in real-time and do not permanently store user data. No data is shared with third parties.</p>

                <h2 className="text-xl font-semibold text-white mt-8">8. Modifications</h2>
                <p>We reserve the right to modify, suspend, or discontinue any Service at any time without notice. We also reserve the right to update these terms at any time. Continued use after changes constitutes acceptance.</p>

                <h2 className="text-xl font-semibold text-white mt-8">9. Contact</h2>
                <p>For questions about these terms, contact us:</p>
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