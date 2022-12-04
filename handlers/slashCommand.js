const { Client } = require('discord.js');
const client = new Client({
    intents: 32767,
})
const { readdirSync } = require('fs');
const slashCommands = [];
const guildID = "954143786114646016";

module.exports = (client) => {
    let count = 0;
    readdirSync('./slashCommands/').forEach(dir => {
        const commands = readdirSync(`./slashCommands/${dir}`).filter(file => file.endsWith('.js'));
        for (const file of commands) {
            const pull = require(`../slashCommands/${dir}/${file}`);
            if (pull.name) {
                client.interactions.set(pull.name, pull);
                slashCommands.push(pull);
                count++;
            } else {
                continue;
            }
        }
    });

    client.on('ready', async () => {
        // await client.guilds.cache.get(guildID).commands.set(slashCommands);
        await client.application.commands.set(slashCommands);
    });

    console.log(`Đã load ${count} slash commands!`);
}