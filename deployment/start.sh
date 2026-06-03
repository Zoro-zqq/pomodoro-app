#!/bin/sh
# 启动后端
node /app/backend/index.js &

# 启动 Nginx
nginx -g "daemon off;"
