FROM node:hydrogen-alpine as dependencies

WORKDIR /opt/app

COPY package.json tsoa.json yarn.lock ./

RUN yarn install

FROM dependencies as builder

WORKDIR /opt/app

COPY ./ ./

RUN yarn build

FROM builder as runner

WORKDIR /opt/app

ENV PORT=8089
EXPOSE 8089

CMD ["node", "build/src/main.js"]
