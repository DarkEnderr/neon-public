const disgames = require("disgames-js")

module.exports = {
    name: 'minesweeper',
    description: 'Minesweeper game',
    type: 'CHAT_INPUT',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    run: async (client, interaction) => {
        new disgames.Minesweeper(interaction,.10).start()
    }
}