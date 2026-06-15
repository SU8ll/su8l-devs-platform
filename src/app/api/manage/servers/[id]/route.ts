import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session || (session.user?.role !== "OWNER" && session.user?.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const server = await prisma.botServer.findUnique({
    where: { id },
    include: { modules: true },
  })

  if (!server) {
    return NextResponse.json({ error: "Server not found" }, { status: 404 })
  }

  return NextResponse.json({ server })
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session || (session.user?.role !== "OWNER" && session.user?.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const body = await req.json()

  const server = await prisma.botServer.update({
    where: { id },
    data: {
      prefix: body.prefix ?? undefined,
      language: body.language ?? undefined,
    },
  })

  return NextResponse.json({ server })
}
