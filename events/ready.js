const config = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(client.user.tag + "is online!");

        setInterval(() => {
            const status = {
                activities: [{
                    name: client.guilds.cache.size + "サーバー",
                    type: config.status.type
                }],
                status: config.status.presence
            };
            client.user.setPresence(status)
        }, 5000);
    },
};
