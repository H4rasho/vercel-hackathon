FROM node:20-bookworm

COPY package*.json ./

RUN npm install

RUN npx playwright install-deps

EXPOSE 8080

CMD [ "node", "index.js" ]
