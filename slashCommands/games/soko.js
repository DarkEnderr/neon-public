const disgames = require("disgames-js")

module.exports = {
    name: 'soko',
    description: 'soko game',
    type: 'CHAT_INPUT',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    run: async (client, interaction) => {
        new disgames.Sokoban(interaction).start()
    }
}