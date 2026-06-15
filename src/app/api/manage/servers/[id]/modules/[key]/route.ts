import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string; key: string }> }) {
  const { id, key } = await params
  const session = await auth()
  if (!session || (session.user?.role !== "OWNER" && session.user?.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const body = await req.json()

  const module = await prisma.botModule.upsert({
    where: {
      serverId_key: {
        serverId: id,
        key,
      },
    },
    update: {
      enabled: body.enabled ?? undefined,
      settings: body.settings ?? undefined,
    },
    create: {
      serverId: id,
      key,
      enabled: body.enabled ?? true,
      settings: body.settings ?? undefined,
    },
  })

  return NextResponse.json({ module })
}
