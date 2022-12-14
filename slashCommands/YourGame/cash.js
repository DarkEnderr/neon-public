const { MessageAttachment, MessageEmbed } = require('discord.js')
const db = require('../../database');
const { Users } = require('../../schemas/schema')

module.exports = {
    name: 'cash',
    description: 'check your cash',
    type: 'CHAT_INPUT',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    options: [{
        name: "user",
        description: "Mention a user",
        required: false,
        type: 6,
    }],
    run: async (client , interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;
        const userData = await Users.findOne({ userid: user.id }) || new Users({ userid: user.id })

        const cash = new MessageEmbed()
        .setTitle(`${user.username}'s cash`)
        .setDescription("Cash details of requested user")
        .setColor('YELLOW')
        .setThumbnail(user.displayAvatarURL())
        .addField("Cash", ` **\`${userData.cash}\`** 🪙`, true);

        return interaction.reply({
            embeds: [cash]
        })
    }
}