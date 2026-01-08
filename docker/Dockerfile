# =====================
# Base
# =====================
FROM node:20-bookworm-slim AS base
WORKDIR /app

# =====================
# Dependencies
# =====================
FROM base AS deps
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install --legacy-peer-deps

# =====================
# Build
# =====================
FROM base AS builder

ENV NODE_ENV=production

# ⬇️ TERIMA BUILD ARG
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_API_URL

# ⬇️ INJECT KE ENV (PENTING)
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# =====================
# Runtime
# =====================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./

EXPOSE 3000
CMD ["npm", "run", "start"]
