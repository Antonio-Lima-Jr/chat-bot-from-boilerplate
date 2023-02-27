FROM node:latest

RUN mkdir -p /chat-bot
COPY . /chat-bot
WORKDIR /chat-bot
RUN npm install
RUN npm run build

EXPOSE 5000
CMD ["npm", "run", "start"]