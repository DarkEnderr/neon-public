module.exports = {
	name: 'ping',
	description: 'ping bot',
	type: 'CHAT_INPUT',
	UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    run: async (client, message) => {
    	message.channel.send({ content: `🏓Pong! \`${client.ws.ping}\`ms` })
    }
}