const db = require('../database');
const { Collection } = require('discord.js');
const config = require('../config.json')
module.exports = async (client, message) => {
    if (message.author.bot) return;
    const serverData = await db.get(message.guildId) || { prefix: '$' };
    const prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Collection());
        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Vui lòng chờ ${timeLeft.toFixed(1)} giây để sử dụng lệnh này!`);
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        command.run(client, message, args, serverData);
    }
    if (command) {
        if (!message.member.permissions.has(command.UserPerms || [])) return message.channel.send({ content: `You need \`${command.userPerms || []}\` Permissions` })

        if (!message.guild.me.permissions.has(command.BotPerms || [])) return message.channel.send({ content: `I need \`${command.BotPerms || []}\` Permissions` })
    }

}