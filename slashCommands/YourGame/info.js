const { MessageAttachment, MessageEmbed } = require('discord.js')
const db = require('../../database');
const { Users, Card } = require('../../schemas/schema')

module.exports = {
    name: 'info',
    description: 'check info user',
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
        const userData = await Users.findOne({ userid: user.id }) || new Users({ userid: user.id, timejoin: new Date() })

        let levelemoji;
        if (userData.level < 10) {
            levelemoji = "♠"
        }
        if (userData.level < 50 && userData.level >= 10) {
            levelemoji = "♟"
        }
        if (userData.level >= 50 && userData.level < 100) {
            levelemoji = "👑"
        } else {
            levelemoji = "💎"
        }

        const info = new MessageEmbed()
        .setTitle(`${user.username}'s cash`)
        .setDescription("Cash details of requested user")
        .setColor('YELLOW')
        .setThumbnail(user.displayAvatarURL())
        .addField("Cash:", ` **\`${userData.cash}\`** 🪙`, true)
        .addField("Weapon:", ` **\`${userData.weapon}\`** ⚔`, true)
        .addField("Level:", ` **\`${userData.level}\`** ${levelemoji}`, true)

        return interaction.reply({
            embeds: [info]
        })
    }
}