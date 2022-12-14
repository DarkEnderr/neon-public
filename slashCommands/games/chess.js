const disgames = require("disgames-js")

module.exports = {
    name: 'chess',
    description: 'chess game',
    type: 'CHAT_INPUT',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    options: [{
        name: "opponent",
        description: "Mention a user",
        required: false,
        type: 6,
    }],
    run: async (client, interaction) => {
        const usermen = interaction.options.get("opponent") || 0;
        if (usermen == 0) {
            interaction.reply({
                content: 'Please mention people'
            })
        } else {
        new disgames.Chess(interaction,await client.users.fetch(usermen.value)).start()
        }
    }
}