#!/bin/bash

docker exec mercamita_dev mongodump --host 3.16.164.172:2717 \
    -d mercamita -u 'sky' -p 'Mercamita1' \
    --authenticationDatabase 'admin' --out data/backup/
docker exec mercamita_dev mongorestore -d mercamita data/backup/mercamita
rm -rf data/backup/