module.exports = {
    name: 'miq',
    description: 'miq command',
    async execute(message) {
        const baseMessage = message.reference;
        const user = baseMessage.author;
        console.log(user);
        const avatarURL = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`;

        const displayName = user.displayName;
        const name = user.username;
        const text = baseMessagecontent;
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
          message.channel.send(data.url);
        })
    },
};
