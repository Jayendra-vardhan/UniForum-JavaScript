FROM node:current-slim

WORKDIR /Uniforum-client/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node","index.js" ]

EXPOSE 3000