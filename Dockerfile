FROM busybox:stable-uclibc

WORKDIR /app

COPY dist .

CMD ["httpd", "-f", "-p", "80", "-h", "/app"]
