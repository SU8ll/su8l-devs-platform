import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { t } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

export async function POST(req: Request) {
  let locale: Locale = "en"
  try {
    const { name, email, password } = await req.json()
    locale = (req.headers.get("x-locale") as Locale) || "en"

    if (!email || !password) {
      return NextResponse.json(
        { error: t(locale, "api.emailRequired") },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: t(locale, "api.passwordMin") },
        { status: 400 }
      )
    }

    const { prisma } = await import("@/lib/prisma")

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: t(locale, "api.emailRegistered") },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.user.create({
      data: {
        name: name || email.split("@")[0],
        email,
        password: hashedPassword,
        emailVerified: new Date(),
      },
    })

    return NextResponse.json(
      { message: t(locale, "api.accountCreated") },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: t(locale, "api.serverError") },
      { status: 500 }
    )
  }
}
