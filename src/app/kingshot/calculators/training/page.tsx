"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { GlassCard, GlassCardContent, GlassCardTitle } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { formatNumber, formatTime, trainingBaseTimes } from "@/lib/utils"
import { TROOP_TYPES } from "@/lib/constants"
import { useLocale } from "@/components/language-provider"

type Mode = "training" | "promoting"

const SPEED_BONUS_MIN = 0
const SPEED_BONUS_MAX = 50

const KINGDOM_SKILL_OPTIONS = [0, 10, 20, 30] as const
const KVK_OPTIONS = [0, 25] as const
const MINISTRY_OPTIONS = [0, 10, 20] as const

const TIER_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const childVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export default function TrainingCalculatorPage() {
  const { t } = useLocale()
  const [mode, setMode] = useState<Mode>("training")
  const [troopType, setTroopType] = useState("infantry")
  const [fromTier, setFromTier] = useState(1)
  const [toTier, setToTier] = useState(10)
  const [quantity, setQuantity] = useState(1)
  const [speedBonus, setSpeedBonus] = useState(0)
  const [kingdomSkill, setKingdomSkill] = useState<number>(0)
  const [kvk, setKvk] = useState<number>(0)
  const [ministry, setMinistry] = useState<number>(0)
  const [speedups, setSpeedups] = useState("")
  const [result, setResult] = useState<{
    totalSeconds: number
    perUnitSeconds: number
    totalFormatted: string
    perUnitFormatted: string
    speedupsNeeded: number | null
  } | null>(null)

  const handleCalculate = () => {
    const baseTime = trainingBaseTimes[fromTier - 1] ?? 3.85
    const totalBonus = speedBonus + kingdomSkill + kvk + ministry
    const perUnitSeconds = (baseTime * 60) / (1 + totalBonus / 100)
    const totalSeconds = perUnitSeconds * quantity

    let speedupsNeeded: number | null = null
    const speedupVal = Number.parseFloat(speedups)
    if (!Number.isNaN(speedupVal) && speedupVal > 0) {
      const speedupSeconds = speedupVal * 60 * 60
      speedupsNeeded = Math.max(0, Math.ceil(totalSeconds - speedupSeconds))
    }

    setResult({
      totalSeconds,
      perUnitSeconds,
      totalFormatted: formatTime(totalSeconds),
      perUnitFormatted: formatTime(perUnitSeconds),
      speedupsNeeded,
    })
  }

  const isPromoting = mode === "promoting"

  return (
    <div className="min-h-screen bg-[#06060e] text-white p-4 md:p-8">
      <motion.div
        className="mx-auto max-w-2xl space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl font-bold text-center"
          style={{ color: "#00c8ff" }}
          variants={childVariants}
        >
          {t("calculator.training")}
        </motion.h1>

        {/* Mode Toggle */}
        <motion.div
          className="flex justify-center gap-2"
          variants={childVariants}
        >
          {(["training", "promoting"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m)
                if (m === "training") setToTier(fromTier)
              }}
              className={
                "rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide transition-all " +
                (mode === m
                  ? "text-white shadow-lg"
                  : "text-white/50 hover:text-white/80")
              }
              style={{
                backgroundColor: mode === m ? "#ff6b35" : "rgba(255,255,255,0.06)",
              }}
            >
              {t(m === "training" ? "calculator.trainingMode" : "calculator.promotingMode")}
            </button>
          ))}
        </motion.div>

        {/* Troop Type */}
        <motion.div variants={childVariants}>
          <label className="mb-1 block text-sm text-white/60">{t("calculator.troopType")}</label>
          <Select value={troopType} onChange={(e) => setTroopType(e.target.value)}>
            {TROOP_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </motion.div>

        {/* Tier Row */}
        <motion.div className="grid grid-cols-2 gap-4" variants={childVariants}>
          <div>
            <label className="mb-1 block text-sm text-white/60">{t("calculator.fromTier")}</label>
            <Select value={fromTier} onChange={(e) => setFromTier(Number(e.target.value))}>
              {TIER_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  Tier {t}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/60">{t("calculator.toTier")}</label>
            <Select
              value={toTier}
              onChange={(e) => setToTier(Number(e.target.value))}
              disabled={!isPromoting}
              className={!isPromoting ? "opacity-40" : ""}
            >
              {TIER_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  Tier {t}
                </option>
              ))}
            </Select>
          </div>
        </motion.div>

        {/* Quantity */}
        <motion.div variants={childVariants}>
          <label className="mb-1 block text-sm text-white/60">{t("calculator.quantity")}</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="input-glass w-full"
          />
        </motion.div>

        {/* Speed Bonus Slider */}
        <motion.div variants={childVariants}>
          <label className="mb-1 block text-sm text-white/60">
            {t("calculator.speedBonus")}: <span style={{ color: "#00c8ff" }}>{speedBonus}%</span>
          </label>
          <input
            type="range"
            min={SPEED_BONUS_MIN}
            max={SPEED_BONUS_MAX}
            value={speedBonus}
            onChange={(e) => setSpeedBonus(Number(e.target.value))}
            className="w-full accent-[#00c8ff]"
          />
          <div className="flex justify-between text-xs text-white/40">
            <span>{SPEED_BONUS_MIN}%</span>
            <span>{SPEED_BONUS_MAX}%</span>
          </div>
        </motion.div>

        {/* Kingdom Skill */}
        <motion.div variants={childVariants}>
          <label className="mb-1 block text-sm text-white/60">{t("calculator.kingdomSkill")}</label>
          <Select
            value={kingdomSkill}
            onChange={(e) => setKingdomSkill(Number(e.target.value))}
          >
            {KINGDOM_SKILL_OPTIONS.map((v) => (
              <option key={v} value={v}>
                {v}%
              </option>
            ))}
          </Select>
        </motion.div>

        {/* KvK Bonus */}
        <motion.div variants={childVariants}>
          <label className="mb-1 block text-sm text-white/60">{t("calculator.kvkBonus")}</label>
          <Select value={kvk} onChange={(e) => setKvk(Number(e.target.value))}>
            {KVK_OPTIONS.map((v) => (
              <option key={v} value={v}>
                {v}%
              </option>
            ))}
          </Select>
        </motion.div>

        {/* Ministry Bonus */}
        <motion.div variants={childVariants}>
          <label className="mb-1 block text-sm text-white/60">{t("calculator.ministryBonus")}</label>
          <Select
            value={ministry}
            onChange={(e) => setMinistry(Number(e.target.value))}
          >
            {MINISTRY_OPTIONS.map((v) => (
              <option key={v} value={v}>
                {v}%
              </option>
            ))}
          </Select>
        </motion.div>

        {/* Available Speedups */}
        <motion.div variants={childVariants}>
          <label className="mb-1 block text-sm text-white/60">
            {t("calculator.availableSpeedups")} <span className="text-white/30">{t("calculator.hoursOptional")}</span>
          </label>
          <input
            type="number"
            min={0}
            value={speedups}
            onChange={(e) => setSpeedups(e.target.value)}
            placeholder={t("calculator.eg24")}
            className="input-glass w-full"
          />
        </motion.div>

        {/* Calculate Button */}
        <motion.div variants={childVariants}>
          <Button
            onClick={handleCalculate}
            className="w-full py-3 text-base font-bold uppercase tracking-wider"
            style={{ backgroundColor: "#ff6b35", color: "#fff" }}
          >
            {t("calculator.calculate")}
          </Button>
        </motion.div>

        {/* Results */}
        {result && (
          <motion.div
            variants={childVariants}
            initial="hidden"
            animate="visible"
          >
            <GlassCard>
              <GlassCardContent className="space-y-3">
                <GlassCardTitle>{t("calculator.results")}</GlassCardTitle>

                <div className="flex flex-wrap gap-3">
                  <span
                    className="rounded-full px-4 py-1.5 text-sm font-semibold"
                    style={{
                      backgroundColor: "rgba(52, 211, 153, 0.15)",
                      color: "#34d399",
                    }}
                  >
                    {t("calculator.total")}: {result.totalFormatted}
                  </span>

                  <span
                    className="rounded-full px-4 py-1.5 text-sm font-semibold"
                    style={{
                      backgroundColor: "rgba(0, 200, 255, 0.15)",
                      color: "#00c8ff",
                    }}
                  >
                    {t("calculator.perUnit")} {result.perUnitFormatted}
                  </span>

                  {result.speedupsNeeded !== null && (
                    <span
                      className="rounded-full px-4 py-1.5 text-sm font-semibold"
                      style={{
                        backgroundColor: "rgba(255, 107, 53, 0.15)",
                        color: "#ff6b35",
                      }}
                    >
                      {t("calculator.additionalSpeedups")}{" "}
                      {formatTime(result.speedupsNeeded)}
                    </span>
                  )}
                </div>
              </GlassCardContent>
            </GlassCard>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
