FROM node:12-alpine

COPY package.json package.json
COPY yarn.lock yarn.lock

ENV NODE_ENV=production

RUN yarn --production
RUN npm install pm2 -g

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "./ecosystem.config.js"]
