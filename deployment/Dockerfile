# ===== 后端 Dockerfile =====
FROM node:20-alpine AS backend

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --production
COPY backend/ .
EXPOSE 3001
CMD ["node", "index.js"]

# ===== 前端构建 =====
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# ===== Nginx 生产环境 =====
FROM nginx:alpine AS production

# 后端
COPY --from=backend /app/backend /app/backend

# 前端静态文件
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Nginx 配置（反向代理后端API）
RUN rm /etc/nginx/conf.d/default.conf
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf

# 启动后端 + Nginx
COPY deployment/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80
CMD ["/start.sh"]
