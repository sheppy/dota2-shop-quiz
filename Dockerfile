#FROM alpine
FROM node-app
MAINTAINER Chris Sheppard

# Setup
ENV PORT=8080 NODE_ENV=production
EXPOSE 8080
#RUN apk update && \
#    apk upgrade && \
#    apk add nodejs && \
#    apk add python && \
#    apk add build-base && \
#    rm -rf /var/cache/apk/* && \
#    mkdir -p /app

RUN mkdir -p /app

# Install
ADD package.json /app/
RUN cd /app && \
    npm --cache-min=604800 install

WORKDIR /app
ADD . /app

# Build
RUN npm run fetch && \
    npm run build

# Run
#CMD ["start"]
#ENTRYPOINT "npm"
CMD npm start
