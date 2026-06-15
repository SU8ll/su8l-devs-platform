import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPool() {
  const connString = process.env.DATABASE_URL
  if (!connString) throw new Error("DATABASE_URL is not set")
  const sslConnString = connString.replace("sslmode=require", "sslmode=no-verify")
  return new pg.Pool({ connectionString: sslConnString })
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(createPool()),
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
