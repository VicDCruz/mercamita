#!/bin/bash

# Remove last running docker container
docker rm -f mercamita_dev

docker run -dit --name mercamita_dev -p 1337:1337 -p 27017:27017 -d skynetdevelop/mercamita_dev