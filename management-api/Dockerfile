FROM node:22-alpine

WORKDIR /app
COPY package.json server.mjs ./

ENV NODE_ENV=production
ENV PORT=8080

USER node
EXPOSE 8080
CMD ["node", "server.mjs"]
