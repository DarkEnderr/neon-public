const { MessageEmbed } = require('discord.js')
const db = require('../../database')
const { Users } = require('../../schemas/schema')

module.exports = {
    name: 'buy',
    description: 'buy unit',
    type: 'CHAT_INPUT',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
        options: [
            {
                name: 'unit',
                description: 'name unit you need buy. Info to check',
                type: 'STRING',
                required: false
            },
            {
                name: 'amount',
                description: 'amount',
                type: 'NUMBER',
                required: false
            }
    ],
    run: async (client, interaction) => {
        const unit = interaction.options.getString('unit') || 0;
        const amount = interaction.options.getNumber('amount') || 0;
        const userData = await Users.findOne({ userid: interaction.user.id }) || new Users({ userid: interaction.user.id })

        if (unit==0 && unit!='cannon' && unit!='musket' && unit!='continental' && unit!='archer' && unit!='swordman') {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle("Wrong name")
                    .setThumbnail(interaction.user.displayAvatarURL())
                    .setDescription('`Menu:`')
                    .addField("`Musketeer: `", `\`400\` 🪙`, true)
                    .addField("`Archer: `", `\`300\` 🪙`, true)
                    .addField("`Continental: `", `\`700\` 🪙`, true)
                    .addField("`Cannon: `", `\`2000\` 🪙`, true)
                ]
            })
        }
        if (unit=='musketeer') {
            let money = amount * 400;
            if(money > userData.cash) {
                return interaction.reply({ content: 'You dont have more money' })
            } else {
                userData.cash -= money
                userData.popul += amount
                userData.musketeer += amount
                userData.save()
                const embed = new MessageEmbed()
                .setTitle('Success')
                .setColor('GREEN')
                .setThumbnail('https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/british-royal-americans-officer-randy-steele.jpg')
                .addField("**Now:**", `**\`${userData.musketeer}\` Musketeer**`)
    
                interaction.reply({
                    embeds: [embed]
                })
            }
        }
        if (unit=='archer') {
            let money = amount * 300;
            if(money > userData.cash) {
                return interaction.reply({ content: 'You dont have more money' })
            } else {
                userData.cash -= money
                userData.popul += amount
                userData.archer += amount
                userData.save()
                const embed = new MessageEmbed()
                .setTitle('Success')
                .setColor('GREEN')
                .setThumbnail('https://i.pinimg.com/originals/90/fd/f2/90fdf263be308b30f8412421de82564d.jpg')
                .addField("**Now:**", `**\`${userData.archer}\` Archer**`)
    
                interaction.reply({
                    embeds: [embed]
                })
            }
        }
        if (unit=='continental') {
            let money = amount * 700;
            if(money > userData.cash) {
                return interaction.reply({ content: 'You dont have more money' })
            } else {
                userData.cash -= money
                userData.popul += amount
                userData.continental += amount
                userData.save()
                const embed = new MessageEmbed()
                .setTitle('Success')
                .setColor('GREEN')
                .setThumbnail('https://www.britishbattles.com/wp-content/uploads/2017/01/16th-LD.jpg')
                .addField("**Now:**", `**\`${userData.continental}\` Continental**`)
    
                interaction.reply({
                    embeds: [embed]
                })
            }
        }
        if (unit=='cannon') {
            let money = amount * 2000;
            if(money > userData.cash) {
                return interaction.reply({ content: 'You dont have more money' })
            } else {
                userData.cash -= money
                userData.popul += amount * 2
                userData.cannon += amount
                userData.save()
                const embed = new MessageEmbed()
                .setTitle('Success')
                .setColor('GREEN')
                .setThumbnail('https://www.kronoskaf.com/syw/images/6/64/Royal_Artillerie_in_1757.jpg')
                .addField("**Now:**", `**\`${userData.cannon}\` Cannon**`)
    
                interaction.reply({
                    embeds: [embed]
                })
            }
        }
        if (unit=='swordman') {
            let money = amount * 250;
            if(money > userData.cash) {
                return interaction.reply({ content: 'You dont have more money' })
            } else {
                userData.cash -= money
                userData.popul += amount * 1
                userData.swordman += amount
                userData.save()
                const embed = new MessageEmbed()
                .setTitle('Success')
                .setColor('GREEN')
                .setThumbnail('https://i.pinimg.com/originals/10/f5/d6/10f5d660f888e4ad4fa6135339c9d848.png')
                .addField("**Now:**", `**\`${userData.swordman}\` Swordman**`)
    
                interaction.reply({
                    embeds: [embed]
                })
            }
        }
        userData.power = userData.musketeer * 3 + userData.archer * 2 + userData.continental * 4 + userData.cannon * 10 + userData.swordman * 1
        userData.protect = userData.musketeer * 4 + userData.archer * 3 + userData.continental * 2 + userData.cannon * 7 + userData.swordman * 2
        userData.save()
    }
}