const config = require('../config.json');

module.exports = {
    name: 'messageReactionAdd',
    once: true,
    execute(client, reaction, user) {
        if (reaction.emoji.identifier === '🗑️') {
            if (reaction.message.author !== client.user) {
                return;
            }
            reaction.message.reactions.cache.get('🗑️').users.fetch().then(users => {
                if (users.size === 2) {
                    reaction.message.edit({
                        content: '🗑️削除しました',
                    });
                }
            });
        }
    }
};
