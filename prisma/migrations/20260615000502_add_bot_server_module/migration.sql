-- CreateTable
CREATE TABLE "bot_servers" (
    "id" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "memberCount" INTEGER NOT NULL DEFAULT 0,
    "prefix" TEXT NOT NULL DEFAULT '!',
    "language" TEXT NOT NULL DEFAULT 'en',
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bot_servers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bot_modules" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "settings" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bot_modules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bot_servers_discordId_key" ON "bot_servers"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "bot_modules_serverId_key_key" ON "bot_modules"("serverId", "key");

-- AddForeignKey
ALTER TABLE "bot_modules" ADD CONSTRAINT "bot_modules_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "bot_servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
