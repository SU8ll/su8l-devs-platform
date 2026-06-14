import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")
    const email = searchParams.get("email")

    if (!token || !email) {
      return NextResponse.redirect(new URL("/login?error=missing_params", req.url))
    }

    const { prisma } = await import("@/lib/prisma")

    const verification = await prisma.verificationToken.findUnique({
      where: { token },
    })

    if (!verification || verification.identifier !== email) {
      return NextResponse.redirect(new URL("/login?error=invalid_token", req.url))
    }

    if (verification.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { token } })
      return NextResponse.redirect(new URL("/login?error=expired_token", req.url))
    }

    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    })

    await prisma.verificationToken.delete({ where: { token } })

    return NextResponse.redirect(new URL("/login?verified=true", req.url))
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.redirect(new URL("/login?error=verification_failed", req.url))
  }
}
