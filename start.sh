#!/bin/bash
set -e

cd /app
./import-meta-env --example .env.production

cd /app/dist
nginx -g "daemon off;"
