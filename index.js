const Discord = require('discord.js-selfbot-v13');
const fetch = require('node-fetch');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
require('dotenv').config();

const client = new Discord.Client({
    checkUpdate: false,
});

const http = require('http');
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Bot is online!');
}).listen(3000);

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(chalk.green(`Loaded Command: ${file}`));
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

const prefix = config.prefix;

client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('コマンドの実行中にエラーが発生しました。');
    }
});

client.on('messageCreate', async message => {
  const userID = message.author.id;
    
  const whitelistPath = path.join(__dirname, '../whitelist.json');
    
  const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));
    
  if (!whitelist.allowedUsers.includes(userID) && userID !== config.owner && userID !== config.subOwner) {
    return;
  }
  if (message.author.bot) return;
  if (message.mentions.users.has(client.user.id)) {
    const url = /https?:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/g;
    const matches = url.exec(message.content);
    if (matches) {
      const [_, guildId, channelId, messageId] = matches;
      const guild = await client.guilds.fetch(guildId);
      const channel = await client.channels.fetch(channelId);
      const fetchedMessage = await channel.messages.fetch(messageId);
      const displayName = fetchedMessage.author.displayName;
      const name = fetchedMessage.author.username;
      const content = fetchedMessage.content;
      const icon = fetchedMessage.author.displayAvatarURL();
      const color = "true";
      const brand = client.user.tag;

      fetch("https://api.voids.top/fakequote", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: content,
          avatar: icon,
          username: name,
          display_name: displayName,
          color: color,
          watermark: brand,
        })
      })
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.url;
        const miq = message.channel.send({
            content: imageUrl,
        });
        miq.then(msg => msg.react('🗑️'))
      })
    }
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.emoji.name === '🗑️') {
    reaction.message.reactions.cache.get('🗑️').users.fetch().then(users => {
      if (users.size === 2) {
        reaction.message.edit({
          content: '🗑️削除しました',
        });
      }
    });
  }
});

client.login(process.env.token);
