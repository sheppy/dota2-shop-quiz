FROM alpine
MAINTAINER Chris Sheppard

RUN apk add --update nodejs
RUN apk add --update python build-base

ENV PORT 8080
ENV NODE_ENV production

RUN mkdir -p /var/www/quiz

ADD package.json /var/www/quiz/package.json
RUN cd /var/www/quiz && npm install

WORKDIR /var/www/quiz
ADD . /var/www/quiz
RUN npm run fetch
RUN npm run build

EXPOSE 8080
CMD npm start
