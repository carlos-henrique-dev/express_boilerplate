FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build
# COPY ormconfig.json ./build/
# COPY .env ./build/
WORKDIR ./build

EXPOSE 3000

CMD node src/index.js