const rps = require('discord-rock-paper-scissor');
const game = new rps({
    endTitle: "{winner} won the dang game",
    endDescription: "{winner} is the winner\n{looser} is the looser",
});

module.exports = {
    name: 'rps',
    description: 'rps game',
    type: 'CHAT_INPUT',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    options: [{
        name: "user",
        description: "Mention a user",
        required: false,
        type: 6,
    }],
    run: async (client, interaction) => {
        interaction.reply({ content: `The game is started` });
        const user = interaction.options.getUser("user");

        if (user && user.bot) return;

        if (!user) game.solo(interaction, client)
        else game.duo(interaction, user);
    }
}