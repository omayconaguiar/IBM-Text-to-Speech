#!/bin/bash

cd migrations && bash migrate.sh $1 ${2:-v01-db-version} && cd ..
