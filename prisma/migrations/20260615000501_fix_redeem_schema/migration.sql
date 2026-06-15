-- Fix user_redeems column name createdAt -> redeemedAt
ALTER TABLE "user_redeems" RENAME COLUMN "createdAt" TO "redeemedAt";

-- Fix redeem_codes createdById to be nullable
ALTER TABLE "redeem_codes" ALTER COLUMN "createdById" DROP NOT NULL;
