const { MessageEmbed } = require('discord.js')
const db = require('../../database')
const { Users } = require('../../schemas/schema')

module.exports = {
    name: 'leaderboard',
    description: 'Show top member of the server who owns most coins',
    type: 'CHAT_INPUT',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    run: async (client, interaction) => {
        await interaction.deferReply()
        const users = await Users.find().then(users => {
            return users.filter(async user => await interaction.guild.fetch(user.userid))
        })

        const sortUsers = users.sort((a, b) => {
            return (b.cash) - (a.cash)
        }).slice(0, 10)

        return interaction.followUp({ embeds: [
            new MessageEmbed()
            .setAuthor({ name: `🏆 ${interaction.guild.name}'s Leaderboard` })
            .setColor("GREEN")
            .setDescription(sortUsers.map((user, index) => {
                return `🥇**\`[ ${index + 1} ]\`** : **<@${user.userid}>** : \`${user.cash}\`🪙`
            }).join("\n"))
        ]})
    }
}