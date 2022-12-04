module.exports = {
    name: 'ping',
    description: 'Ping của bot',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        interaction.reply(`🏓Pong! \`${client.ws.ping}\`ms`)
    }
}