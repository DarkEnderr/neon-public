const { MessageAttachment, MessageCollector } = require('discord.js');
const createHangman = require("hangmancreate");
module.exports = {
    name: "hangman2",
    description: "Play the hangman game",
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'letter',
            description: 'Nội dung muốn bot nói',
            type: 'STRING',
            required: false,
        }
    ],
    run: async (client, interaction) => {
        const words = interaction.options.getString('letter');
        const user = interaction.user;
        await interaction.deferReply({ content: 'Loading...', ephemeral: false });

        let wrongs = 0, at = new MessageAttachment(await createHangman(wrongs), "game.png"), word = words || 'discord', used = [];

        await interaction.followUp({
            files: [at],
            embeds: [{
                title: "Hangman Game!",
                image: {
                    url: "attachment://game.png"
                },
                color: "BLUE",
                description: `Type a character to guess the word\n\n\`\`\`${word.split("").map(v => used.includes(v) ? v.toUpperCase() : "_").join(" ")}\`\`\``
            }],
            ephemeral: false
        });

        const col = new MessageCollector(interaction.channel, {
            filter: m => m.author.id !== interaction.user.id,
            time: 600000
        });

        col.on('collect', async (msg) => {
            const char = msg.content[0]?.toLowerCase();

            if (!/[a-z]/i.test(char)) return msg.reply("You have to **provide** a **letter**, **not** a **number/symbol**").then((m) => setTimeout(() => m.delete().catch(e => { }), 5000))
            if (used.includes(char)) return msg.reply("You aleady used this letter").then((m) => setTimeout(() => m.delete().catch(e => { }), 5000));

            used.push(char);

            if (!word.includes(char)) wrongs++;

            let done = word.split("").every(v => used.includes(v));
            let description = wrongs === 6 || done ? `You ${done ? "won" : "lost"} the game, The word was **${word}**` : `Type a character to guess the word\n\n\`\`\`${word.split("").map(v => used.includes(v) ? v.toUpperCase() : "_").join(" ")}\`\`\``

            await interaction.editReply({
                attachments: [],
                files: [new MessageAttachment(await createHangman(wrongs), "game.png")],
                embeds: [{
                    title: "Hangman Game!",
                    image: {
                        url: "attachment://game.png"
                    },
                    color: wrongs === 6 ? "#ff0000" : done ? "GREEN" : "RANDOM",
                    description
                }],
                ephemeral: false
            });

            if (wrongs === 6 || done) col.stop();
        })

        col.on('end', (s, r) => {
            if (r === "time") {
                interaction.editReply({
                    attachments: [],
                    embeds: [{
                        title: "⛔ Game Ended",
                        description: "You took too much time to respond"
                    }],
                    ephemeral: false
                });
            }
        })
    }
}