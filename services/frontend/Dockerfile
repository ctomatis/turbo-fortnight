FROM node:lts-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install @vue/cli@5.0.8 -g
RUN npm install --save-dev sass-loader sass webpack node-sass

COPY package.json .
COPY package-lock.json .
RUN npm install

CMD ["npm", "run", "serve"]
