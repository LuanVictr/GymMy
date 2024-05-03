FROM node:18-alpine as builder
WORKDIR /ui

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /ui
COPY --from=builder /ui/package.json .
COPY --from=builder /ui/package-lock.json .
COPY --from=builder /ui/next.config.js ./
COPY --from=builder /ui/public ./public
COPY --from=builder /ui/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["npm", "start"]