import Discord from "discord.js"
import config from "./config"

const client = new Discord.Client();

client.login(config.botToken);

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', (message) => {
    let input = message.content.toLowerCase();
    if (input.startsWith('ping')) {
        message.channel.send('pong!');
    }

    if (input.includes('eddie')) {
        //find user
        let eddie = client.users.find('username', 'Saburou');

        message.channel.send(`Vous avez mentionné ${eddie}, je ne vous conseille plus de le faire`);
    }
});