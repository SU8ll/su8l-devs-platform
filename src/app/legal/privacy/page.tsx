"use client"

import { motion } from "framer-motion"
import { GlassCard, GlassCardContent } from "@/components/glass-card"
import { useLocale } from "@/components/language-provider"

export default function PrivacyPage() {
  const { t } = useLocale()
  return (
    <div className="relative overflow-hidden pt-24">
      <div className="hero-glow left-1/4 top-1/4 bg-[#00c8ff]/30" />
      <div className="hero-glow right-1/4 bottom-1/4 bg-[#ff6b35]/30" />

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl mb-4">
              {t("legal.privacy").split(" ").length > 1 ? (
                <>{t("legal.privacy").split(" ").slice(0, -1).join(" ")} <span className="text-[#00c8ff]">{t("legal.privacy").split(" ").pop()}</span></>
              ) : (
                <span className="text-[#00c8ff]">{t("legal.privacy")}</span>
              )}
            </h1>
            <p className="text-[#a0a0b0]">{t("legal.privacyDesc")}</p>
          </motion.div>

          <GlassCard>
            <GlassCardContent>
              <div className="prose prose-invert max-w-none space-y-6 text-[#a0a0b0]">

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.privacyS1")}</h2>
                <p>{t("legal.privacyS1Body")}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t("legal.privacyS1L1")}</li>
                  <li>{t("legal.privacyS1L2")}</li>
                  <li>{t("legal.privacyS1L3")}</li>
                  <li>{t("legal.privacyS1L4")}</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.privacyS2")}</h2>
                <p>{t("legal.privacyS2Body")}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t("legal.privacyS2L1")}</li>
                  <li>{t("legal.privacyS2L2")}</li>
                  <li>{t("legal.privacyS2L3")}</li>
                  <li>{t("legal.privacyS2L4")}</li>
                  <li>{t("legal.privacyS2L5")}</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.privacyS3")}</h2>
                <p>{t("legal.privacyS3Body")}</p>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.privacyS4")}</h2>
                <p>{t("legal.privacyS4Body")}</p>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.privacyS5")}</h2>
                <p>{t("legal.privacyS5Body")}</p>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.privacyS6")}</h2>
                <p>{t("legal.privacyS6Body")}</p>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.privacyS7")}</h2>
                <p>{t("legal.privacyS7Body")}</p>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.privacyS8")}</h2>
                <p>{t("legal.privacyS8Body")}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t("legal.privacyS8L1")}</li>
                  <li>{t("legal.privacyS8L2")}</li>
                  <li>{t("legal.privacyS8L3")}</li>
                  <li>{t("legal.privacyS8L4")}</li>
                </ul>

                <p className="mt-8 text-center text-sm text-[#a0a0b0]/60">{t("legal.rights")}</p>
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}