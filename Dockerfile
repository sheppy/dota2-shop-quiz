FROM alpine
MAINTAINER Chris Sheppard

RUN apk add --update nodejs
RUN apk add --update python build-base

ENV PORT 8080
ENV NODE_ENV production

RUN mkdir -p /var/www/quiz

ADD . /var/www/quiz
WORKDIR /var/www/quiz

RUN npm install
RUN npm run fetch
RUN npm run build

EXPOSE 8080
CMD npm start
