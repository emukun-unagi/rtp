const config = require('../config.json');

module.exports = {
    name: 'miq',
    description: 'miq command',
    async execute(message) {
        if (message.reference) {
            const repliedMessage = message.channel.messages.cache.get(message.reference.messageId);
            const user = repliedMessage.author;
            const avatarURL = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`;

            const displayName = user.displayName;
            const name = user.username;
            const text = repliedMessage.content;
            const icon = user.displayAvatarURL();
            const brand = "Make it a Quote#6666";
            fetch("https://api.voids.top/fakequote", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text,
                    avatar: icon,
                    username: name,
                    display_name: displayName,
                    color: "true",
                    watermark: brand,
                })
            })
            .then(response => response.json())
            .then(data => {
                const imageUrl = data.url;
                const miq = message.reply({
                    content: imageUrl,
                });
                miq.then(msg => msg.react('🗑️'))
            })
        }
    },
};
