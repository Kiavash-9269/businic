module.exports = {
  apps: [
    {
      name: 'businic-api',
      cwd: './server',
      script: 'dist/main.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
      error_file: './logs/businic-api-error.log',
      out_file: './logs/businic-api-out.log',
      merge_logs: true,
      time: true,
    },
  ],
};
