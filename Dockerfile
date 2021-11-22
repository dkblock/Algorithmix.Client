FROM node:14-alpine3.14 as build

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]