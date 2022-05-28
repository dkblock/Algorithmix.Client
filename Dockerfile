FROM node:14-alpine3.14 as build

WORKDIR /app
COPY package*.json ./

RUN npm install

ARG SERVER_URL
ENV SERVER_URL $SERVER_URL

COPY . .

RUN npm run build

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]