import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    DATABASE_URL: process.env.DATABASE_URL ? "set (starts with: " + process.env.DATABASE_URL.substring(0, 20) + ")" : "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  })
}
