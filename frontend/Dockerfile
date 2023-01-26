FROM node:18
EXPOSE 1801

WORKDIR /frontend

COPY ["./package.json", "./package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]

