const config = require('../config.json');
const axios = require('axios');

module.exports = {
    name: 'invite',
    description: 'invite command',
    execute(message, args) {
        const userID = message.author.id;
        if (userID !== config.owner && userID !== config.subOwner) {
            return
        }
        if (!args[0]) {
            return message.reply('参加するサーバーの招待コードを入力してください');
        }
        const axiosConffig = {
            method: 'post',
            url: `https://discordapp.com/api/v9/invites/${Args[0]}`,
            headers: {
              'Authorization': process.env.token,
              'Cookie': '__dcfduid=eb512138ff894201bb227ad3b570e4e1'
            }
        };

        await axios(axiosConffig)
          .then(async (Response) => {
            await Interaction.channel.send(`I joined the **${ Response.data.guild.name } (${ Response.data.guild.id })** server.`)
          })
          .catch((Error) => {
             console.error(Error);
          });
    },
};
