module.exports = (client) => {
    console.log('Bot is ready!');
    client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size} Servers, ${client.users.cache.size} Members`}], type: 'PLAYING'} );
}