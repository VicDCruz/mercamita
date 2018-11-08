# NAME of BUILD = mercamita_dev

# Distribution
FROM ubuntu:18.04

# File Author / Maintainer
MAINTAINER Victor Cruz y Alberto Acosta

# Workin directory
WORKDIR /

# Copy data to working directory
COPY ./ /

# Expose port
EXPOSE 1337
EXPOSE 27017

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get install -y vim \
    && apt-get install -y systemd \
    && apt-get -y autoclean

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 4.4.7

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# Install Node.js
RUN apt-get update && apt-get -y autoclean
RUN apt-get install -y curl
RUN curl --silent --location https://deb.nodesource.com/setup_4.x
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install -y build-essential

# install sails
RUN npm -g install sails

# create user node
# RUN useradd -c 'Node.js user' -m -d /home/node -s /bin/bash node
# USER node

# Install MongoDB #
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
RUN touch /etc/apt/sources.list.d/mongodb-org-4.0.list
RUN echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.0.list
RUN apt-get update
RUN apt-get install -y mongodb
RUN mkdir -p /data/db
RUN cp mongodb.conf /etc/mongodb.conf
RUN systemctl enable mongodb