const { MessageEmbed } = require('discord.js')
const SnakeGame = require('snakecord');
const snakeGame = new SnakeGame({
    title: 'Snake Game',
    color: 'GREEN',
    timestamp: false,
    gameOverTitle: 'Game Over'
});

module.exports = {
    name: 'snake',
    description: 'snake game',
    type: 'CHAT_INPUT',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    run: async (client, interaction) => {
        await snakeGame.newGame(interaction);
        
    }
}