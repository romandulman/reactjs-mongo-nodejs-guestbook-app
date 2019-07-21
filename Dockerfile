FROM node:latest

WORKDIR /usr/src/app

COPY  ./guestbook-backend/package*.json ./

RUN npm install

COPY ./guestbook-backend .

# Copy  react app to our node server public dir

EXPOSE 8080 9229
CMD [ "npm", "run", "start:dev"  ]