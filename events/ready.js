const config = require('../config.json');


module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const status = {
            activities: [{
                name: client.guilds.cache.size,
                type: config.status.type
            }],
            status: config.status.presence
        };

        client.user.setPresence(status);

        console.log(`${client.user.tag} is online!`)
    },
};
