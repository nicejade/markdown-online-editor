FROM busybox:stable-uclibc

WORKDIR /app

# Copy the built SPA files
COPY dist .

# Create a .htaccess-like configuration
RUN mkdir -p /etc/httpd/conf && \
    echo 'H:.*:/app/index.html' > /etc/httpd/conf/httpd.conf

# Expose port 80
EXPOSE 80

# Start httpd server with the configuration
CMD ["httpd", "-f", "-p", "80", "-h", "/app", "-c", "/etc/httpd/conf/httpd.conf"]