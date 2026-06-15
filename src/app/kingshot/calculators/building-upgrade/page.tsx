"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GlassCard, GlassCardContent, GlassCardTitle, GlassCardHeader } from "@/components/glass-card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { formatNumber, formatTime } from "@/lib/utils";
import { BUILDING_TYPES } from "@/lib/constants";
import { useLocale } from "@/components/language-provider";

const MAX_LEVEL = 35;

function gen(base: number, growth: number, n: number): number[] {
  return Array.from({ length: n }, (_, i) => Math.floor(base * Math.pow(growth, i)));
}

function genTruegold(base: number, growth: number, start: number, n: number): number[] {
  return Array.from({ length: n }, (_, i) => {
    const level = i + 1;
    if (level < start) return 0;
    return Math.floor(base * Math.pow(growth, level - start));
  });
}

interface BuildingConfig {
  type: "Military" | "Economy";
  wood: number[];
  stone: number[];
  iron: number[];
  bread: number[];
  time: number[];
  truegold: number[];
}

const buildings: Record<string, BuildingConfig> = {
  Barracks: {
    type: "Military",
    wood: gen(2500, 1.18, MAX_LEVEL),
    stone: gen(1800, 1.17, MAX_LEVEL),
    iron: gen(1200, 1.20, MAX_LEVEL),
    bread: gen(1600, 1.16, MAX_LEVEL),
    time: gen(180, 1.12, MAX_LEVEL),
    truegold: genTruegold(1, 1.45, 20, MAX_LEVEL),
  },
  Stable: {
    type: "Military",
    wood: gen(3000, 1.20, MAX_LEVEL),
    stone: gen(2200, 1.18, MAX_LEVEL),
    iron: gen(1500, 1.18, MAX_LEVEL),
    bread: gen(1800, 1.15, MAX_LEVEL),
    time: gen(240, 1.11, MAX_LEVEL),
    truegold: genTruegold(2, 1.40, 20, MAX_LEVEL),
  },
  Range: {
    type: "Military",
    wood: gen(2000, 1.19, MAX_LEVEL),
    stone: gen(1500, 1.20, MAX_LEVEL),
    iron: gen(1800, 1.19, MAX_LEVEL),
    bread: gen(1400, 1.17, MAX_LEVEL),
    time: gen(150, 1.13, MAX_LEVEL),
    truegold: genTruegold(1, 1.50, 20, MAX_LEVEL),
  },
  "Town Center": {
    type: "Economy",
    wood: gen(4500, 1.22, MAX_LEVEL),
    stone: gen(3800, 1.21, MAX_LEVEL),
    iron: gen(2800, 1.20, MAX_LEVEL),
    bread: gen(3200, 1.18, MAX_LEVEL),
    time: gen(400, 1.10, MAX_LEVEL),
    truegold: genTruegold(3, 1.50, 18, MAX_LEVEL),
  },
  Embassy: {
    type: "Economy",
    wood: gen(1500, 1.16, MAX_LEVEL),
    stone: gen(1200, 1.15, MAX_LEVEL),
    iron: gen(800, 1.17, MAX_LEVEL),
    bread: gen(1000, 1.14, MAX_LEVEL),
    time: gen(90, 1.15, MAX_LEVEL),
    truegold: genTruegold(1, 1.35, 22, MAX_LEVEL),
  },
  "Command Center": {
    type: "Military",
    wood: gen(3500, 1.21, MAX_LEVEL),
    stone: gen(4200, 1.22, MAX_LEVEL),
    iron: gen(3200, 1.21, MAX_LEVEL),
    bread: gen(2500, 1.19, MAX_LEVEL),
    time: gen(300, 1.12, MAX_LEVEL),
    truegold: genTruegold(2, 1.50, 19, MAX_LEVEL),
  },
  Academy: {
    type: "Economy",
    wood: gen(2200, 1.17, MAX_LEVEL),
    stone: gen(1800, 1.16, MAX_LEVEL),
    iron: gen(1500, 1.18, MAX_LEVEL),
    bread: gen(2500, 1.20, MAX_LEVEL),
    time: gen(280, 1.14, MAX_LEVEL),
    truegold: genTruegold(1, 1.40, 21, MAX_LEVEL),
  },
  Infirmary: {
    type: "Economy",
    wood: gen(1800, 1.15, MAX_LEVEL),
    stone: gen(1500, 1.14, MAX_LEVEL),
    iron: gen(1000, 1.16, MAX_LEVEL),
    bread: gen(1200, 1.13, MAX_LEVEL),
    time: gen(120, 1.12, MAX_LEVEL),
    truegold: genTruegold(1, 1.30, 22, MAX_LEVEL),
  },
  Storehouse: {
    type: "Economy",
    wood: gen(1000, 1.14, MAX_LEVEL),
    stone: gen(800, 1.13, MAX_LEVEL),
    iron: gen(600, 1.15, MAX_LEVEL),
    bread: gen(800, 1.12, MAX_LEVEL),
    time: gen(60, 1.10, MAX_LEVEL),
    truegold: genTruegold(1, 1.25, 23, MAX_LEVEL),
  },
  "War Academy": {
    type: "Military",
    wood: gen(2800, 1.20, MAX_LEVEL),
    stone: gen(2200, 1.19, MAX_LEVEL),
    iron: gen(2000, 1.22, MAX_LEVEL),
    bread: gen(1800, 1.18, MAX_LEVEL),
    time: gen(260, 1.15, MAX_LEVEL),
    truegold: genTruegold(2, 1.45, 18, MAX_LEVEL),
  },
};

const buildingNames = Object.keys(buildings);

interface LevelCost {
  level: number;
  wood: number;
  stone: number;
  iron: number;
  bread: number;
  time: number;
  truegold: number;
}

export default function BuildingUpgradeCalculator() {
  const { t } = useLocale()
  const [selectedBuilding, setSelectedBuilding] = useState(buildingNames[0]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [targetLevel, setTargetLevel] = useState(MAX_LEVEL);
  const [constructionSpeed, setConstructionSpeed] = useState(0);
  const [costDown, setCostDown] = useState(0);
  const [wolfPet, setWolfPet] = useState(false);
  const [chiefMinister, setChiefMinister] = useState(false);
  const [groundWorks, setGroundWorks] = useState(false);
  const [doubleTime, setDoubleTime] = useState(false);
  const [results, setResults] = useState<LevelCost[] | null>(null);

  const building = buildings[selectedBuilding];

  const handleBuildingChange = (value: string) => {
    setSelectedBuilding(value);
    setCurrentLevel(1);
    setTargetLevel(MAX_LEVEL);
    setResults(null);
  };

  const handleCurrentLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Math.max(1, Number(e.target.value)), MAX_LEVEL - 1);
    setCurrentLevel(val);
    if (val >= targetLevel) {
      setTargetLevel(val + 1);
    }
    setResults(null);
  };

  const handleTargetLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Math.max(currentLevel + 1, Number(e.target.value)), MAX_LEVEL);
    setTargetLevel(val);
    setResults(null);
  };

  const handleCalculate = () => {
    const rows: LevelCost[] = [];
    const speedReduction = (constructionSpeed + (wolfPet ? 5 : 0) + (chiefMinister ? 10 : 0) + (groundWorks ? 15 : 0)) / 100;
    const costMultiplier = 1 - costDown / 100;

    for (let level = currentLevel + 1; level <= targetLevel; level++) {
      const idx = level - 1;
      let time = building.time[idx] * (1 - speedReduction);
      if (doubleTime) time = time / 2;

      rows.push({
        level,
        wood: Math.floor(building.wood[idx] * costMultiplier),
        stone: Math.floor(building.stone[idx] * costMultiplier),
        iron: Math.floor(building.iron[idx] * costMultiplier),
        bread: Math.floor(building.bread[idx] * costMultiplier),
        time: Math.round(time),
        truegold: Math.floor(building.truegold[idx] * costMultiplier),
      });
    }

    setResults(rows);
  };

  const totals = results
    ? {
        wood: results.reduce((s, r) => s + r.wood, 0),
        stone: results.reduce((s, r) => s + r.stone, 0),
        iron: results.reduce((s, r) => s + r.iron, 0),
        bread: results.reduce((s, r) => s + r.bread, 0),
        time: results.reduce((s, r) => s + r.time, 0),
        truegold: results.reduce((s, r) => s + r.truegold, 0),
      }
    : null;

  return (
    <div className="min-h-screen bg-[#06060e] p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-6xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-[#00c8ff]">{t("calculator.buildingUpgrade")}</h1>

        <GlassCard>
          <GlassCardHeader>
            <GlassCardTitle>{t("calculator.configuration")}</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-sm text-white/60">{t("calculator.building")}</label>
                <Select value={selectedBuilding} onChange={(e: any) => handleBuildingChange(e.target?.value ?? e)}>
                  {buildingNames.map((name) => {
                    const key = "calculator.building" + name.replace(/ /g, "")
                    return (
                      <option key={name} value={name}>
                        {t(key)}
                      </option>
                    )
                  })}
                </Select>
                <p className="text-xs text-white/40">
                  {t("calculator.description")}: {t(building.type === "Economy" ? "calculator.researchEconomy" : "calculator.researchMilitary")} &middot; {t("calculator.maxLevel", { level: String(MAX_LEVEL) })}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-white/60">{t("calculator.currentLevel")}</label>
                <input
                  type="number"
                  className="input-glass w-full"
                  value={currentLevel}
                  onChange={handleCurrentLevelChange}
                  min={1}
                  max={MAX_LEVEL - 1}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-white/60">{t("calculator.targetLevel")}</label>
                <input
                  type="number"
                  className="input-glass w-full"
                  value={targetLevel}
                  onChange={handleTargetLevelChange}
                  min={currentLevel + 1}
                  max={MAX_LEVEL}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm text-white/60">{t("calculator.constructionSpeed")} (%)</label>
                <input
                  type="number"
                  className="input-glass w-full"
                  value={constructionSpeed}
                  onChange={(e) => { setConstructionSpeed(Math.max(0, Number(e.target.value))); setResults(null); }}
                  min={0}
                  max={100}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-white/60">{t("calculator.costDown")} (%)</label>
                <input
                  type="number"
                  className="input-glass w-full"
                  value={costDown}
                  onChange={(e) => { setCostDown(Math.max(0, Number(e.target.value))); setResults(null); }}
                  min={0}
                  max={100}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-[#00c8ff]"
                  checked={wolfPet}
                  onChange={(e) => { setWolfPet(e.target.checked); setResults(null); }}
                />
                {t("calculator.wolfPet")}
              </label>
              <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-[#00c8ff]"
                  checked={chiefMinister}
                  onChange={(e) => { setChiefMinister(e.target.checked); setResults(null); }}
                />
                {t("calculator.chiefMinister")}
              </label>
              <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-[#00c8ff]"
                  checked={groundWorks}
                  onChange={(e) => { setGroundWorks(e.target.checked); setResults(null); }}
                />
                {t("calculator.groundWorks")}
              </label>
              <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-[#00c8ff]"
                  checked={doubleTime}
                  onChange={(e) => { setDoubleTime(e.target.checked); setResults(null); }}
                />
                {t("calculator.doubleTime")}
              </label>
            </div>

            <Button onClick={handleCalculate} className="w-full md:w-auto">
              {t("calculator.calculate")}
            </Button>
          </GlassCardContent>
        </GlassCard>

        {results && totals && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard>
              <GlassCardHeader>
                <GlassCardTitle>{t("calculator.upgradeCosts")}: {t("calculator.level")} {currentLevel} &rarr; {targetLevel}</GlassCardTitle>
              </GlassCardHeader>
              <GlassCardContent className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
                      <th className="p-3 text-left font-medium">{t("calculator.level")}</th>
                      <th className="p-3 text-right font-medium">{t("calculator.resourceWood")}</th>
                      <th className="p-3 text-right font-medium">{t("calculator.resourceStone")}</th>
                      <th className="p-3 text-right font-medium">{t("calculator.resourceIron")}</th>
                      <th className="p-3 text-right font-medium">{t("calculator.resourceBread")}</th>
                      <th className="p-3 text-right font-medium">{t("calculator.time")}</th>
                      <th className="p-3 text-right font-medium">{t("calculator.resourceTruegold")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => (
                      <tr
                        key={row.level}
                        className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.06]"}`}
                      >
                        <td className="p-3 text-white font-medium">{row.level}</td>
                        <td className="p-3 text-right text-[#ff6b35]">{formatNumber(row.wood)}</td>
                        <td className="p-3 text-right text-white/80">{formatNumber(row.stone)}</td>
                        <td className="p-3 text-right text-white/80">{formatNumber(row.iron)}</td>
                        <td className="p-3 text-right text-[#ff6b35]">{formatNumber(row.bread)}</td>
                        <td className="p-3 text-right text-white/60">{formatTime(row.time)}</td>
                        <td className="p-3 text-right text-[#00c8ff]">{formatNumber(row.truegold)}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-[#00c8ff]/30 bg-[#00c8ff]/5 font-semibold">
                      <td className="p-3 text-[#00c8ff]">{t("calculator.total")}</td>
                      <td className="p-3 text-right text-[#ff6b35]">{formatNumber(totals.wood)}</td>
                      <td className="p-3 text-right text-white/90">{formatNumber(totals.stone)}</td>
                      <td className="p-3 text-right text-white/90">{formatNumber(totals.iron)}</td>
                      <td className="p-3 text-right text-[#ff6b35]">{formatNumber(totals.bread)}</td>
                      <td className="p-3 text-right text-[#00c8ff]">{formatTime(totals.time)}</td>
                      <td className="p-3 text-right text-[#00c8ff]">{formatNumber(totals.truegold)}</td>
                    </tr>
                  </tbody>
                </table>
              </GlassCardContent>
            </GlassCard>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
