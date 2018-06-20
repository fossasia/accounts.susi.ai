#!/usr/bin/env bash
if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    echo "Not a PR. Skipping surge deployment"
    exit 0
fi

npm i -g surge
# Actual building and setup of current push or PR.
npm install
npm run build
rm -rf node_modules/
cp build/index.html build/404.html

export SURGE_LOGIN=fossasiasusiaccounts@example.com
# Token of a dummy account.
export SURGE_TOKEN=08eb55bcd3fa5ab726365bbee2b3a5c6

export DEPLOY_DOMAIN=https://pr-${TRAVIS_PULL_REQUEST}-fossasia-susi-accounts.surge.sh
surge --project ./build --domain $DEPLOY_DOMAIN;
