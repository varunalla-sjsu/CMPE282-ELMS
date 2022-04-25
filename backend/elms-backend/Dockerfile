FROM node:latest

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["yarn", "start"]

EXPOSE 80