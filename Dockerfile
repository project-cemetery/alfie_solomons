FROM node:12-alpine

COPY package.json package.json
COPY yarn.lock yarn.lock

ENV NODE_ENV=production

RUN yarn --production

COPY . .

EXPOSE 3000

CMD ["node", "./app/index.js"]
