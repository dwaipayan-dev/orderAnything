FROM node:12

WORKDIR /orderAny-app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]