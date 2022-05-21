#!/usr/bin/env sh

echo -e "$(cat src/header.js)\n\n$(yarn build)" > out.js    
