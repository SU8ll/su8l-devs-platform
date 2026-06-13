import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B"
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M"
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K"
  return num.toLocaleString()
}

export function formatTime(seconds: number): string {
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const parts: string[] = []
  if (d > 0) parts.push(`${d}d`)
  if (h > 0) parts.push(`${h}h`)
  if (m > 0) parts.push(`${m}m`)
  if (s > 0 || parts.length === 0) parts.push(`${s}s`)
  return parts.join(" ")
}

export function calculateShards(from: number, to: number): number {
  const cumulative = [0, 10, 40, 115, 300, 600]
  return cumulative[to - 1] - cumulative[from - 1]
}

export function calculateMasterCost(level: number) {
  return {
    tomes: Math.floor(1 + Math.pow(level / 3, 1.5)),
    gold: Math.floor(100 * Math.pow(1.08, level)),
  }
}

export function calculatePetCost(level: number) {
  return {
    food: Math.floor(500 * Math.pow(1.15, level)),
    time: Math.floor(120 * Math.pow(1.1, level)),
  }
}

export function calculateWarAcademyCost(level: number) {
  return {
    books: Math.floor(5 * Math.pow(1.25, level)),
    gold: Math.floor(500 * Math.pow(1.2, level)),
  }
}

export const trainingBaseTimes = [
  3.85, 5.45, 7.70, 10.26, 14.12, 19.25, 26.63, 36.26, 42.04, 48.78,
]

export function calculateTrainingTime(
  tier: number,
  quantity: number,
  speedBonus: number,
  kingdomSkill: number,
  kvk: number,
  ministry: number
): number {
  const base = trainingBaseTimes[tier - 1] * quantity * 60
  const totalBonus = 1 + (speedBonus + kingdomSkill + kvk + ministry) / 100
  return base / totalBonus
}

export function calculateBuildingCost(
  level: number,
  costArray: number[]
): number {
  if (level < 1 || level > costArray.length) return 0
  return costArray[level - 1]
}
