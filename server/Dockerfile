FROM node:16 

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3700

CMD ["npm", "run" ,"dev"]