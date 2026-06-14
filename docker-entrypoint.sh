#!/bin/sh
set -e

echo "Waiting for PostgreSQL..."
for i in $(seq 1 30); do
  if pg_isready -h postgres -U su8l -d su8ldevs > /dev/null 2>&1; then
    break
  fi
  echo "  attempt $i..."
  sleep 1
done

echo "Running Prisma migrations..."
npx prisma generate
npx prisma migrate deploy || npx prisma db push

echo "Starting Next.js..."
exec node server.js
