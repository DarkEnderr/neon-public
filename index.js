const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config();

const { prefix } = require('./config.json')


const client = new Client({
    intents: 32767
})

client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();
client.interactions = new Collection();
client.cooldowns = new Collection();

['command', 'event', 'slashCommand'].forEach(handler => require(`./handlers/${handler}`)(client));

client.login(process.env.TOKEN);

const TicTacToe = require('discord-tictactoe');

new TicTacToe({
    token: process.env.TOKEN,
    language: 'en',
    command: 'tictactoe',
    commandOptionName: 'opponent',
    textCommand: `${prefix}ttt`
})