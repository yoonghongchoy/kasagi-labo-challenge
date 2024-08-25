FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY tsconfig.json ./
COPY src ./src

RUN yarn build

COPY randomObjects.txt ./
RUN mkdir -p /usr/src/app/output

CMD ["node", "dist/challengeB.js"]