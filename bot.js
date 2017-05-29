import Discord from "discord.js"
import config from "config"

const client = new Discord.Client();

client.login(config.botToken);

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', (message) => {
    if (message.content.startsWith('ping')) {
        message.channel.send('pong!');
    }
});