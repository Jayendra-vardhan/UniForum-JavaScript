FROM node:current-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node","index.js" ]

EXPOSE 5000