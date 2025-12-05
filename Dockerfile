FROM node:current-alpine3.20

COPY package-lock.json .
COPY package.json .

RUN npm i

COPY src src

EXPOSE 3000
CMD npm run dev