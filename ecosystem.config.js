module.exports = {
    apps: [
        {
            name: 'sealand-server',
            script: 'server/server.js',
            env_production: {
                NODE_ENV: 'production',
                PORT: 5000,
            },
        }
    ],
};
