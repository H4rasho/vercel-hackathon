FROM node:20-bookworm

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

RUN npx -y playwright@1.45.1 install --with-deps

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "index.js" ]
