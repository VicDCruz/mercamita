#!/bin/bash

# Remove last running docker container
docker rm -f mercamita_dev

docker run -it --name mercamita_dev -p 1337:1337 -p 27017:27017 \
    -w /mercamita -v `pwd`/:/mercamita/ -d skynetdevelop/mercamita_dev

docker exec -d skynetdevelop/mercamita_dev service mongodb start
docker exec -d skynetdevelop/mercamita_dev npm i