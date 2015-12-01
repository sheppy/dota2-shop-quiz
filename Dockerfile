FROM alpine
MAINTAINER Chris Sheppard

RUN apk add --update nodejs
RUN apk add --update python build-base

ENV PORT 8080
ENV NODE_ENV production

RUN mkdir -p /var/www/quiz

ADD . /var/www/quiz
WORKDIR /var/www/quiz

EXPOSE 8080
RUN npm install
CMD npm run build; npm start
