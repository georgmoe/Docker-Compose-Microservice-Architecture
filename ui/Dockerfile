FROM node:18.12.1-alpine3.17
WORKDIR /app
COPY package*.json ./
RUN npm i
RUN chown -R node:node /app/node_modules
CMD npm run dev