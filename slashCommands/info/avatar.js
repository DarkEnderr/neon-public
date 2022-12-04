const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Avatar của người dùng',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES', 'SEND_TTS_MESSAGES'],
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'user',
            description: 'Người bạn mention',
            type: 'USER',
            required: false
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;
        const avatarURL = user.displayAvatarURL({ format: 'png', size: 4096, dynamics: true })
        const embed = new MessageEmbed()
            .setImage(avatarURL)
            .setTitle(`Avatar ${user.tag}`)
        interaction.reply({ embeds: [embed] })
    }
}