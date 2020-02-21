module.exports = {
  apps: [
    {
      name: 'mr-solomons',
      script: 'app/index.js',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '128M',
    },
  ],
};
