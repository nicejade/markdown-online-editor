module.exports = {
  apps: [
    {
      name: 'markdown-editor',
      script: 'npx',
      args: 'http-server dist -p 8866 -c-1 --cors',
      interpreter: 'none',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
    },
  ],
}
