import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPool() {
  const url = new URL(process.env.DATABASE_URL ?? "postgres://localhost:5432/postgres")
  url.searchParams.delete("sslmode")
  return new pg.Pool({
    connectionString: url.toString(),
    ssl: { rejectUnauthorized: false },
  })
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(createPool()),
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
