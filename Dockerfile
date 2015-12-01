FROM alpine
MAINTAINER Chris Sheppard

RUN apk add --update nodejs
RUN apk add --update python make gcc

ENV PORT 8080
ENV NODE_ENV production

RUN mkdir -p /var/www/quiz

ADD . /var/www/quiz
WORKDIR /var/www/quiz

EXPOSE 8080
RUN npm install
RUN npm install -g gulp
CMD npm run build; npm start
