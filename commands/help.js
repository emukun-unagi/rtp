const { prefix } = require('../config.json');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

module.exports = {
    name: 'help',
    description: 'help command',
    execute(message, args, commands) {
        const userID = message.author.id;

        const whitelistPath = path.join(__dirname, '../whitelist.json');

        const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));

        if (!whitelist.allowedUsers.includes(userID) && userID !== config.owner) {
            return;
        }

        const helpMessage = `**コマンド一覧:**\n\`\`\`\n` +
            `BOT: help, ping\n` +
            `r#help\n` +
            `ヘルプを表示します\n` +
            `r#ping\n` +
            `PINGを計測します\n` +
            `遊び:\n` +
            `r#gpt テキスト\n` +
            `AIと話します\n` +
            `r#miq\n` +
            `メッセージに返信して使うとそのメッセージのMake it a Quoteを生成します\n` +
            `r#fiq\n` +
            `偽物のMake it a Quoteを生成します\n` +
            `オーナー:\n` +
            `r#add ユーザーID\n` +
            `ユーザーをホワイトリストに追加します\n` +
            `r#remove ユーザーID\n` +
            `ユーザーをホワイトリストから削除します\n` +
            `\`\`\``;
        message.reply(helpMessage);
    },
};
