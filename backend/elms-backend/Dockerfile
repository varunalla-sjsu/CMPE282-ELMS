FROM node:latest

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}


WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN yarn install

CMD ["yarn", "start"]

EXPOSE 80