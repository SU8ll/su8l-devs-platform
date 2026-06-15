"use client"

import { motion } from "framer-motion"
import { GlassCard, GlassCardContent } from "@/components/glass-card"
import { useLocale } from "@/components/language-provider"

export default function TermsPage() {
  const { t } = useLocale()
  return (
    <div className="relative overflow-hidden pt-24">
      <div className="hero-glow left-1/4 top-1/4 bg-[#00c8ff]/30" />
      <div className="hero-glow right-1/4 bottom-1/4 bg-[#ff6b35]/30" />

      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl mb-4">
              {t("legal.terms").split(" ").length > 1 ? (
                <>{t("legal.terms").split(" ").slice(0, -1).join(" ")} <span className="text-[#00c8ff]">{t("legal.terms").split(" ").pop()}</span></>
              ) : (
                <span className="text-[#00c8ff]">{t("legal.terms")}</span>
              )}
            </h1>
            <p className="text-[#a0a0b0]">{t("legal.termsDesc")}</p>
          </motion.div>

          <GlassCard>
            <GlassCardContent>
              <div className="prose prose-invert max-w-none space-y-6 text-[#a0a0b0]">

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.termsS1")}</h2>
                <p>{t("legal.termsS1Body")}</p>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.termsS2")}</h2>
                <p>{t("legal.termsS2Body")}</p>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.termsS3")}</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t("legal.termsS3L1")}</li>
                  <li>{t("legal.termsS3L2")}</li>
                  <li>{t("legal.termsS3L3")}</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.termsS4")}</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t("legal.termsS4L1")}</li>
                  <li>{t("legal.termsS4L2")}</li>
                  <li>{t("legal.termsS4L3")}</li>
                  <li>{t("legal.termsS4L4")}</li>
                </ul>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.termsS5")}</h2>
                <p>{t("legal.termsS5Body")}</p>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.termsS6")}</h2>
                <p>{t("legal.termsS6Body")}</p>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.termsS7")}</h2>
                <p>{t("legal.termsS7Body")}</p>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.termsS8")}</h2>
                <p>{t("legal.termsS8Body")}</p>

                <h2 className="text-xl font-semibold text-white mt-8">{t("legal.termsS9")}</h2>
                <p>{t("legal.termsS9Body")}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t("legal.termsS9L1")}</li>
                  <li>{t("legal.termsS9L2")}</li>
                  <li>{t("legal.termsS9L3")}</li>
                  <li>{t("legal.termsS9L4")}</li>
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