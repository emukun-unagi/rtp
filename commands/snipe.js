const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const config = require('../config.json');

module.exports = {
  name: 'snipe',
  description: 'snipe command',
  async execute(message, args) {
    const userID = message.author.id;

    const whitelistPath = path.join(__dirname, '../whitelist.json');
    const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));

    if (!whitelist.allowedUsers.includes(userID) && userID !== config.owner) {
      return;
    }

    if (message.author.bot) return;

    const targetUserID = args.length > 0 ? args[0] : '';
    const count = args.length > 1 ? parseInt(args[1]) : 1;
    
    if (isNaN(count) || count < 1) {
      return message.reply('有効な正の整数を入力してください');
    }

    const historyFilePath = `./history/${message.channel.id}.txt`;

    fs.readFile(historyFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading history file: ${err}`);
        return message.reply('削除されたメッセージの取得中にエラーが発生しました');
      }

      const messages = data.trim().split('\n');

      if (targetUserID) {
        const filteredMessages = messages.filter((message) => message.startsWith(`deleted by ${targetUserID}`) || message.startsWith(`edited by ${targetUserID}`));

        if (filteredMessages.length < count) {
          return message.reply(`履歴には${filteredMessages.length}メッセージしかありません`);
        }
        
        const snipedMessage = filteredMessages[filteredMessages.length - count];
        
        message.reply(snipedMessage);
      } else {
        if (messages.length < count) {
          return message.reply(`履歴には${messages.length}メッセージしかありません`);
        }
        
        const snipedMessage = messages[messages.length - count];

        message.reply(snipedMessage);
      }
    });
  },
};
