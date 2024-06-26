const fs = require('fs');
const path = require('path');
const config = require('../config.json');

module.exports = {
  name: 'list',
  description: 'list command',
  execute(message, args, client) {
    const userID = message.author.id;
    if (userID !== config.owner && userID !== config.subOwner) {
      return
    }

    const whitelistPath = path.join(__dirname, '../whitelist.json');
    if (!fs.existsSync(whitelistPath)) {
      return message.reply('ホワイトリストファイルが存在しません');
    }

    const whitelist = require(whitelistPath);
    if (!whitelist.allowedUsers || whitelist.allowedUsers.length === 0) {
      return message.reply('ホワイトリストが空です');
    }

    let userList = '';
    whitelist.allowedUsers.forEach((id, index) => {
      const userListData = client.users.cache.get(id)
      userList += `${userListData.tag}(${id})\n`;
    });

    message.reply(userList, { split: true });
  },
};
