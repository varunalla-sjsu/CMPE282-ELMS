FROM node:latest

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["yarn", "start"]

EXPOSE 3000