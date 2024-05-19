module.exports = {
    name: 'fiq',
    description: 'fiq command',
    async execute(message, args) {

        if (args.length < 2) {
            return
        }

        const userIdentifier = args[0];
        const content = args.slice(1).join(' ');

        let user;

        if (userIdentifier.startsWith('<@') && userIdentifier.endsWith('>')) {
            user = message.mentions.users.first() || await message.client.users.fetch(userIdentifier.slice(2, -1)).catch(() => null);
        } else if (/^\d+$/.test(userIdentifier)) {
            user = await message.client.users.fetch(userIdentifier).catch(() => null);
        } else if (message.guild) {
            const member = message.guild.members.cache.find((m) => m.user.tag === userIdentifier);
            user = member ? member.user : null;
        }

        if (!user) {
            return message.reply('指定されたユーザーが見つかりません');
        }
        
        const avatarURL = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`;

        const displayName = user.displayName;
        const name = user.username;
        const text = content;
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
    },
};
