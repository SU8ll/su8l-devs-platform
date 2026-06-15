import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session || (session.user?.role !== "OWNER" && session.user?.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const servers = await prisma.botServer.findMany({
    orderBy: { name: "asc" },
    include: { modules: true },
  })

  return NextResponse.json({ servers })
}
