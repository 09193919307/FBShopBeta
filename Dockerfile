FROM node:22-alpine

RUN corepack enable

WORKDIR /usr/src/app

COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install --immutable

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]