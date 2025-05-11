FROM node:20-alpine

WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

# 复制项目文件
COPY . .

# 安装依赖
RUN pnpm install

# 构建前端
WORKDIR /app/apps/frontend
RUN pnpm build

# 设置环境变量
ENV PORT=8080
ENV NODE_ENV=production

# 暴露端口
EXPOSE 8080

# 启动命令
CMD ["node", ".next/standalone/server.js"] 