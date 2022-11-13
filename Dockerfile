FROM node:16

WORKDIR /dos-attacker

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y hping3

COPY . .

EXPOSE 3000

CMD [ "node", "./src/server.js" ]