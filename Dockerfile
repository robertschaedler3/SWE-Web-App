### BUILD ###

# base image
FROM node:12.13.0 as build

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@latest

# add app
COPY . .

# generate build
RUN ng build --output-path=/var/www
