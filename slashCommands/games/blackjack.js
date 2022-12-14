const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const blackjack = require("discord-blackjack")
const { Users } = require('../../schemas/schema')
const db = require('../../database')

module.exports = {
    name: 'blackjack',
    description: 'black jack game - gambling game',
    type: 'CHAT_INPUT',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    options: [
        {
            name: 'amount',
            description: 'Your money',
            type: 'NUMBER',
            required: false
        }
    ],
    run: async (client, interaction) => {
        const amount = interaction.options.getNumber('amount') || 0;
        const userData = await Users.findOne({ userid: interaction.user.id }) || new Users({ userid: interaction.user.id })

        if(amount > userData.cash) {
            //return interaction.reply('You dont have money to bet')
            amount = userData.cash;
        }
        let game = await blackjack(interaction, {resultEmbed: false})
        
        switch (game.result) {
            
            case "WIN":
                userData.cash += amount
                userData.save()
                interaction.followUp({
                    embeds: [
                    new MessageEmbed()
                    .setTitle("You won!")
                    .setDescription(`You have a total of ${game.yvalue} points!`)
        ]})
                break;
            case "LOSE":
                userData.cash -= amount
                userData.save()
                interaction.followUp({ content: "Loser!" })
            
        }
    }
}