FROM node:latest

WORKDIR /usr/src/app

COPY  ../guestbook-backend/package*.json ./

RUN npm install

COPY ../../guestbook-backend .

# Copy  react app to our node server public dir
COPY ../guestbook-frontend/build ./public

EXPOSE 8080
CMD [ "npm", "start" ]