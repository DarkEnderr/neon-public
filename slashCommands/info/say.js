module.exports = {
    name: 'say',
    description: 'Bot say',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'query',
            description: 'Nội dung muốn bot nói',
            type: 'STRING',
            required: true,
        }
    ],
    run: async (client, interaction) => {
        const query = interaction.options.getString('query');
        interaction.reply({ content: 'Thao tác thành công!', ephemeral: true });
        interaction.channel.send(query);
    },
};