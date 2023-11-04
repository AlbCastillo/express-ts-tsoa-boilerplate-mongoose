FROM node:hydrogen-slim as dependencies

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /opt/app

COPY package.json tsoa.json pnpm-lock.yaml ./

RUN pnpm install

FROM dependencies as builder

WORKDIR /opt/app

COPY ./ ./

RUN pnpm build

FROM builder as runner

WORKDIR /opt/app

ENV PORT=8089
EXPOSE 8089

CMD ["node", "build/src/main.js"]
