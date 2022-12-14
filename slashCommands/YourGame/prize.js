const { MessageEmbed } = require('discord.js')
const db = require('../../database')
const { Users } = require('../../schemas/schema')
const prettyMilliseconds = require('pretty-ms')


module.exports = {
    name: 'prize',
    description: 'prize after 3 days',
    type: 'CHAT_INPUT',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    run: async (client , interaction) => {
        const user = interaction.user;
        const userData = await Users.findOne({ userid: user.id }) || new Users({ userid: user.id })

        if (userData.cooldowns.prize > Date.now())
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor('YELLOW')
                    .setDescription(`⏳ Try again after ${prettyMilliseconds(userData.cooldowns.prize - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}`)
                ],
                ephemeral: false
            })

        const random = Math.floor(Math.random() * 99) + 100
        userData.cash += random
        userData.cooldowns.prize = Date.now() + (1000 * 60 * 60 * 24 * 3)
        userData.save()

        const dailyembed = new MessageEmbed()
        .setDescription(`You earned **\`${random}\`** 🪙`)
        .setColor('YELLOW')

        return interaction.reply({ embeds: [ dailyembed ] })
    }
}