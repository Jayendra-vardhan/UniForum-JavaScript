# Useing the official Node.js image as the base image
FROM node:current-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Useing nginx to serve the React app
FROM nginx:alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

# No CMD needed as nginx will start by default
