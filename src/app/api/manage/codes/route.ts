import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

function generateCode(length = 12): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let code = ""
  const bytes = crypto.randomBytes(length)
  for (let i = 0; i < length; i++) {
    code += chars[bytes[i] % chars.length]
  }
  return code.match(/.{4}/g)?.join("-") || code
}

export async function GET() {
  const session = await auth()
  if (!session || (session.user?.role !== "OWNER" && session.user?.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const codes = await prisma.redeemCode.findMany({
    orderBy: { createdAt: "desc" },
    include: { redeems: true },
  })

  return NextResponse.json({ codes })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== "OWNER" && session.user?.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const { description, maxUses, expiresInDays } = await req.json()

    const code = generateCode()

    const expiresAt = expiresInDays
      ? new Date(Date.now() + parseInt(expiresInDays) * 86400000)
      : null

    const redeemCode = await prisma.redeemCode.create({
      data: {
        code,
        description: description || null,
        maxUses: Math.max(1, parseInt(maxUses) || 1),
        expiresAt,
        createdById: session.user.id,
      },
    })

    return NextResponse.json({ code: redeemCode.code })
  } catch (error) {
    console.error("Generate code error:", error)
    return NextResponse.json({ error: "Failed to generate code" }, { status: 500 })
  }
}
