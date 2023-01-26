# syntax=docker/dockerfile:1
FROM node:18
EXPOSE 2208

WORKDIR /backend

COPY ["./package.json", "./package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]