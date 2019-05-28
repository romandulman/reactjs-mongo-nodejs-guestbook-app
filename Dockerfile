FROM node:latest

WORKDIR /usr/src/app

COPY  ./guestbook-backend/package*.json ./

RUN npm install

COPY ./guestbook-backend .

EXPOSE 8080
CMD [ "npm", "start" ]