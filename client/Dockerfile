FROM node:current-slim

COPY package*.json .

RUN npm install

COPY . .

# Build the React app
RUN npm run build

EXPOSE 3000

# Command to serve the React app
CMD ["npm", "start"]