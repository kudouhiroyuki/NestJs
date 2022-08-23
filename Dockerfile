FROM node:14.17

RUN npm i -g @nestjs/cli

WORKDIR /app
COPY package*.json /app/ 

RUN npm i
CMD [ "npm", "run", "start:dev"]