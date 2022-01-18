FROM node:latest AS build
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
# RUN pnpm add --global turbo

WORKDIR /opt/build

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm fetch

COPY package.json ./
COPY packages/server ./packages/server
RUN pnpm install --offline --filter=store-assistant --filter=server

COPY .git ./.git
RUN pnpm build -- --scope=server

FROM node:lts-alpine
RUN apk add dumb-init

ENV NODE_ENV production
WORKDIR /usr/src/app

COPY --chown=node:node --from=build /opt/build/packages/server/package.json ./
RUN npm install --only prod

COPY --chown=node:node --from=build /opt/build/packages/server/dist ./

USER node
EXPOSE 8080
CMD [ "dumb-init", "node", "--experimental-specifier-resolution", "node", "./index.js" ]
