FROM node:16-alpine AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install -g npm@9.6.7

RUN npm install --legacy-peer-deps

RUN npm i -g @angular/cli

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start"]

# CMD ng serve --host 0.0.0.0


