FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/out
RUN mkdir -p /usr/src/app/node_modules
WORKDIR /usr/src/app

# Bundle app source
COPY ./out/ /usr/src/app/out
COPY ./node_modules/ /usr/src/app/node_modules

EXPOSE 3000
CMD [ "node", "out/controller/http.js" ]
