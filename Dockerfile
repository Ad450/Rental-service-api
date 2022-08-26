# syntax=docker/dockerfile:1

FROM node:12.18.1

WORKDIR /app

ENV NODE_ENV=production

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "dist/index.js" ]

EXPOSE 3000