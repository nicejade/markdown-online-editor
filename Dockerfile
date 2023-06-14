# 指定基础镜像
FROM nginx:latest

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 复制代码文件到镜像中
COPY dist .

# 暴露容器端口号
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]