FROM node:16.17-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# ADD index.js ./
EXPOSE 3000
CMD [ "npm", "start"]