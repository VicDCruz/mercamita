# NAME of BUILD = mercamita_dev

# Distribution
FROM ubuntu:18.04

# File Author / Maintainer
MAINTAINER Victor Cruz y Alberto Acosta

# Workin directory
WORKDIR ~/

# Copy data to working directory
COPY ./ ~/

# Expose port
EXPOSE 1337
EXPOSE 27017

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get -y autoclean

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 4.4.7

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# Install Node.js
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_4.x
RUN apt-get install --yes nodejs
RUN apt-get install --yes npm
RUN apt-get install --yes build-essential

# install sails
RUN npm -g install sails

# create user node
# RUN useradd -c 'Node.js user' -m -d /home/node -s /bin/bash node
# USER node

# Install MongoDB #
RUN apt-get update \
    && apt-get install --yes mongodb
# RUN mongo --eval 'db.runCommand({ connectionStatus: 1 })'
RUN mongod &

# # Add the package verification key
# RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

# # Add MongoDB to the repository sources list
# RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list

# # Update the repository sources list once more
# RUN apt-get update

# # Install MongoDB package (.deb)
# RUN apt-get install -y mongodb-10gen

# # Create the default data directory
# RUN mkdir -p /data/db

# # Set default container command
# ENTRYPOINT usr/bin/mongod