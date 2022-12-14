const game = require('dis-fight');

module.exports = {
    name: 'fight',
    description: 'fight game',
    type: 'CHAT_INPUT',
    UserPerms: ['SEND_MESSAGES'],
    BotPerms: ['SEND_MESSAGES'],
    options: [{
        name: "player2",
        description: "player2",
        required: false,
        type: 6,
    }],
    run: async (client, interaction) => {
        const fight = new game(client, {
                // Settings
    moveTime: 30000,

    // Custom Buttons
    oneName: "Sword",
    oneEmoji: "🤺",
    twoName: "Bow",
    twoEmoji: "🏹",
    threeName: "Shield",
    threeEmoji: "🛡",
    endName: "End Game",
    endEmoji: "🛑",

    // Custom Messages
    startMessage: "The war has begun, get ready warriors",
    midMessage: "The fighters chose their move, Current battle condition :",
    endMessage: "{winner} gloriously defeated {looser}",
    forceEndMessage: "{user} was scared so they ended the war",
    timeEndMessage: "{user} ran away from the war",
        });
        const player2 = interaction.options.getUser("player2");

        if (player2 && player2.bot) return;
        fight.duo(interaction, player2) 
    }
} 