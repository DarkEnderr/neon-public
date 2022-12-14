const { MessageEmbed } = require('discord.js')
const db = require('../../database')
const { Users } = require('../../schemas/schema')
const prettyMilliseconds = require('pretty-ms')


module.exports = {
    name: 'daily',
    description: 'daily',
    type: 'CHAT_INPUT',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    run: async (client , interaction) => {
        const user = interaction.user;
        const userData = await Users.findOne({ userid: user.id }) || new Users({ userid: user.id })

        if (userData.cooldowns.daily > Date.now())
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor('YELLOW')
                    .setDescription(`⏳ Please try again after ${prettyMilliseconds(userData.cooldowns.daily - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}`)
                ],
                ephemeral: false
            })

        const random = Math.floor(Math.random() * 99) + 20
        userData.cash += random
        userData.cooldowns.daily = Date.now() + (1000 * 60 * 60 * 24)
        userData.save()

        const dailyembed = new MessageEmbed()
        .setDescription(`You earned **\`${random}\`** 🪙`)
        .setColor('YELLOW')

        return interaction.reply({ embeds: [ dailyembed ] })
    }
}