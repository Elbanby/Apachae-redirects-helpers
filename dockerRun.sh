#! /bin/bash

cd /Users/elbaom/dev/workspace/httpd

docker stop gwl-httpd-latest && ./scripts/build-image.sh && ./scripts/run-container.sh
