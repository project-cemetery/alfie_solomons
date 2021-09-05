FROM node:14.17.0-alpine

COPY package.json package.json
COPY yarn.lock yarn.lock

ENV NODE_ENV=production

RUN yarn --production

COPY . .

EXPOSE 3001

CMD ["node", "./app/index.js"]
