#!/bin/bash

# Remove last running docker container
docker rm -f skynetdevelop/mercamita_dev

docker run -it --name mercamita_dev -p 1337:1337 -p 27017:27017 \
    -v 'pwd'/.:/mercamita/. -d skynetdevelop/mercamita_dev

docker exec -d mercamita_dev service mongodb starts