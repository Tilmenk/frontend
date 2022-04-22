FROM node:alpine

RUN apk add --no-cache curl \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node

RUN mkdir -p /usr/src/app
ENV PORT 3000

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY pnpm-lock.yaml /usr/src/app

# Production use node instead of root
# USER node

RUN pnpm install

COPY . /usr/src/app

EXPOSE 3000
CMD [ "pnpm", "dev" ]
