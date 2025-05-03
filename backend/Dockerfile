FROM node:23-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:23-slim

WORKDIR /app

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

ENV NODE_ENV=production

EXPOSE 3001

CMD ["sh", "-c", "\
  npx prisma migrate deploy && \
  node dist/prisma/seed.ts && \
  curl -X POST http://localhost:3001/embedding/generate-all || true && \
  node dist/main.js \
"]