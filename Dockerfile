FROM node:latest

RUN apt-get update \
    && rm -rf /var/lib/apt/lists/*
RUN apt-get clean
RUN npm install -g bower
# TODO: remove force here?
RUN npm install -g yarn -f
RUN npm cache clean -f

WORKDIR /app

COPY . .

RUN bower install ./public --config.directory=./public/bower_components
RUN  ls ./public/
RUN yarn --cwd ./public

RUN yarn

EXPOSE 9999

CMD ["node" , "server.js"]