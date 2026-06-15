import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { BOT_MODULES } from "@/lib/bot-modules"

interface IncomingServer {
  discordId: string
  name: string
  icon?: string
  memberCount: number
  prefix?: string
  language?: string
  isPremium?: boolean
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.BOT_API_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const servers: IncomingServer[] = body.servers || []

    if (!Array.isArray(servers) || servers.length === 0) {
      return NextResponse.json({ error: "No servers provided" }, { status: 400 })
    }

    const existingDiscordIds = await prisma.botServer.findMany({
      select: { discordId: true },
    })
    const existingSet = new Set(existingDiscordIds.map(s => s.discordId))
    const incomingSet = new Set(servers.map(s => s.discordId))

    const toRemove = [...existingSet].filter(id => !incomingSet.has(id))
    if (toRemove.length > 0) {
      await prisma.botServer.deleteMany({
        where: { discordId: { in: toRemove } },
      })
    }

    const results = []
    for (const s of servers) {
      const server = await prisma.botServer.upsert({
        where: { discordId: s.discordId },
        create: {
          discordId: s.discordId,
          name: s.name,
          icon: s.icon || null,
          memberCount: s.memberCount,
          prefix: s.prefix || "!",
          language: s.language || "en",
          isPremium: s.isPremium || false,
        },
        update: {
          name: s.name,
          icon: s.icon || null,
          memberCount: s.memberCount,
          prefix: s.prefix ?? undefined,
          language: s.language ?? undefined,
          isPremium: s.isPremium ?? undefined,
        },
      })

      for (const mod of BOT_MODULES) {
        await prisma.botModule.upsert({
          where: { serverId_key: { serverId: server.id, key: mod.key } },
          create: { serverId: server.id, key: mod.key, enabled: true },
          update: {},
        })
      }

      results.push({ id: server.id, discordId: server.discordId, name: server.name })
    }

    return NextResponse.json({ synced: results.length, removed: toRemove.length })
  } catch (error) {
    console.error("Sync error:", error)
    return NextResponse.json({ error: "Sync failed" }, { status: 500 })
  }
}
