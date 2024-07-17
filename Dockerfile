FROM busybox:1.36.1-uclibc

WORKDIR /app

COPY dist .

CMD ["httpd", "-f", "-p", "80", "-h", "/app"]