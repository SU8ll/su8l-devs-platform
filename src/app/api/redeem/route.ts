import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { t } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

export async function POST(req: Request) {
  let locale: Locale = "en"
  try {
    const session = await auth()
    if (!session?.user?.id) {
      locale = (req.headers.get("x-locale") as Locale) || "en"
      return NextResponse.json({ error: t(locale, "redeem.needAccount") }, { status: 401 })
    }

    const { code } = await req.json()
    locale = (req.headers.get("x-locale") as Locale) || "en"

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: t(locale, "redeem.invalidCode") }, { status: 400 })
    }

    const trimmedCode = code.trim().toUpperCase()

    // Check master owner code from env
    const ownerCode = process.env.OWNER_ACCESS_CODE?.toUpperCase()
    if (ownerCode && trimmedCode === ownerCode) {
      if (session.user.role === "OWNER" || session.user.role === "ADMIN") {
        return NextResponse.json({ success: true, message: t(locale, "redeem.ownerCode") })
      }
      return NextResponse.json({ error: t(locale, "redeem.ownerCodeInvalid") }, { status: 403 })
    }

    const redeemCode = await prisma.redeemCode.findUnique({
      where: { code: trimmedCode },
    })

    if (!redeemCode) {
      return NextResponse.json({ error: t(locale, "redeem.invalidCode") }, { status: 404 })
    }

    if (redeemCode.expiresAt && redeemCode.expiresAt < new Date()) {
      return NextResponse.json({ error: t(locale, "redeem.invalidCode") }, { status: 410 })
    }

    if (redeemCode.usedCount >= redeemCode.maxUses) {
      return NextResponse.json({ error: t(locale, "redeem.maxUses") }, { status: 409 })
    }

    const existingRedeem = await prisma.userRedeem.findUnique({
      where: {
        userId_redeemCodeId: {
          userId: session.user.id,
          redeemCodeId: redeemCode.id,
        },
      },
    })

    if (existingRedeem) {
      return NextResponse.json({ error: t(locale, "redeem.alreadyRedeemed") }, { status: 409 })
    }

    await prisma.$transaction([
      prisma.userRedeem.create({
        data: {
          userId: session.user.id,
          redeemCodeId: redeemCode.id,
        },
      }),
      prisma.redeemCode.update({
        where: { id: redeemCode.id },
        data: { usedCount: { increment: 1 } },
      }),
    ])

    return NextResponse.json({ success: true, message: t(locale, "redeem.success") })
  } catch (error) {
    console.error("Redeem error:", error)
    return NextResponse.json({ error: t(locale, "redeem.serverError") }, { status: 500 })
  }
}
