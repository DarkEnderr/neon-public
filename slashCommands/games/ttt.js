const TicTacToe = require('discord-tictactoe')
const game = new TicTacToe({ language: "en" })

module.exports = {
    name: 'tictactoe',
    description: 'a game of ttt',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    type: 'CHAT_INPUT',
    option: [
        {
            name: 'opponent',
            description: 'who want to play with',
            type: "USER",
            required: false
        }
    ],
    run: async (client, interaction) => {
        game.handleInteraction(interaction);
    }
}