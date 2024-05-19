const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const whitelistPath = path.join(__dirname, '../whitelist.json');

module.exports = {
    name: 'help',
    description: 'help command',
    execute(message, args, commands) {
        const userID = message.author.id;

        const whitelistPath = path.join(__dirname, '../whitelist.json');

        const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));

        if (!whitelist.allowedUsers.includes(userID) && userID !== config.owner && userID !== config.subOwner) {
            return;
        }

        const helpMessage = `**コマンド一覧:**\n\`\`\`\n` +
            `BOT:\n` +
            `r#help/ヘルプを表示します\n` +
            `r#ping/PINGを計測します\n` +
            `遊び:\n` +
            `r#gpt テキスト/AIと話します\n` +
            `r#miq/メッセージに返信して使うとそのメッセージのMake it a Quoteを生成します\n` +
            `r#fiq ユーザー テキスト/偽物のMake it a Quoteを生成します\n` +
            `r#snipe カウント/削除または編集されたメッセージを送信します\n` +
            `オーナー:\n` +
            `r#add ユーザーID/ユーザーをホワイトリストに追加します\n` +
            `r#remove ユーザーID/ユーザーをホワイトリストから削除します\n` +
            `r#list/ホワイトリストのユーザー一覧を表示します\n` +
            `\`\`\``;
        message.reply(helpMessage);
    },
};
