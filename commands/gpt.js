const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const whitelistPath = path.join(__dirname, '../whitelist.json');

module.exports = {
    name: 'gpt',
    description: 'gpt command',
    async execute(message, args) {
        const userID = message.author.id;

        const whitelistPath = path.join(__dirname, '../whitelist.json');

        const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));

        if (!whitelist.allowedUsers.includes(userID) && userID !== config.owner && userID !== config.subOwner) {
            return;
        }
        
        const inputText = args.join(' ');

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + process.env.apikey,
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": [{
                        "role": "user",
                        "content": inputText
                    },
                    {
                        "role": "system",
                        "content": "あなたの名前はぴのです。あなたは相手の質問に簡潔に答える優秀なアシスタントです。あなたはタメ口で話します。あなたは可愛く話します。"
                    }]
                })
            });

            const data = await response.json();

            if (data.choices && data.choices.length > 0) {
                const replyText = data.choices[0].message.content.trim();
                message.reply(replyText);
            } else {
                console.error(data);
                message.reply('エラーが発生しました');
            }
        } catch (error) {
            console.error(error);
            message.reply('エラーが発生しました');
        }
    },
};
