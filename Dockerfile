FROM node:18-alpine

RUN apk add --no-cache bash

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node ["package*.json", "yarn.lock", "./"]

RUN yarn install

COPY --chown=node . /home/node/app

EXPOSE 3000

CMD ["npm", "run", "dev"]
