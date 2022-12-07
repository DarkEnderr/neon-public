const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'chinese_dice',
    description: 'chinese dice game',
    type: 'CHAT_INPUT',
    UserPerms: ['SEND_MESSAGE'],
    BotPerms: ['SEND_MESSAGE'],
    run: async (client, interaction) => {
        const dices = [];
        const dicefaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        var sum = 0;
        for (i= 0; i < 3; i++) {
            const rng = Math.trunc(Math.random() * 6) + 1;
            sum += rng;
            dices.push(dicefaces[rng - 1]);
        };

        const msg = await interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor('GREEN')
                .setTitle('CHinese Dice')
                .setDescription('If Sumary 3 Dice than 10 score is `Finance` else is `Faint`')
            ],
            components: [
                new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('tai')
                    .setLabel('Finance')
                    .setEmoji('🔼')
                    .setStyle('PRIMARY')
                )
                .addComponents(
                    new MessageButton()
                    .setCustomId('xiu')
                    .setLabel('Faint')
                    .setEmoji('🔻')
                    .setStyle('SECONDARY')
                )
            ],
            fetchReply: true
        });

        //    const msg = await interaction.reply({ embeds: [replyEmbed], components: [buttons], fetchReply: true })
            const collector = msg.createMessageComponentCollector({
                filter: interaction => interaction.user.id === interaction.user.id,
                componentType: 'BUTTON',
                time: 120000
            });
            
            collector.on('collect', interaction => {
                if (
                    (interaction.customId === 'tai' && sum >= 11)
                    || (interaction.customId == 'xiu' && sum < 11)
                ) {
                     var endEmbed = new MessageEmbed()
                    .setColor('YELLOW')
                    .setTitle('You Won!')
                    .setDescription(`\`${dices[0]} ${dices[1]} ${dices[2]}\` Score:\`${sum}\` ` + 'Weo, it cool!');
                }
                else {
                     var endEmbed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle('You Lost!')
                    .setDescription(`\`${dices[0]} ${dices[1]} ${dices[2]}\` Score:\`${sum}\` ` + 'Loser!');
                }
    
                interaction.update({ embeds: [endEmbed], components: [] });

    });
    }
}