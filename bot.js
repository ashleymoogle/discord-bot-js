import moment from 'moment'
import Discord from "discord.js"
import config from "./config"

import {Eddie} from "./data"

const client = new Discord.Client();

client.login(config.botToken);

client.on('ready', () => {
    console.log('I am ready!');
});

let prefix = ':';

client.on('message', (message) => {
    let input = message.content.toLowerCase();
    if (input.startsWith('ping')) {
        message.channel.send('pong!');
    }

    if (input.includes('classic eddie')) {
        //find user
        let eddie = client.users.find('username', 'Saburou');
        let factIndex = Math.floor(Math.random() * Eddie.classic.length);

        message.channel.send
        (`Oh, looks like ${message.author.username} requested a Classic fact about ${eddie}\`\`\`Fact number ${factIndex} :
${Eddie.classic[factIndex]}\`\`\``);
    }


});

client.on('presenceUpdate', (oldMember, newMember) => {
    const activity = newMember.guild.channels.find('name', 'activity');
    switch(newMember.presence.status) {
        case 'online':
            if(oldMember.presence.status !== 'idle') {
                newMember.guild.defaultChannel.send(`Hello, ${newMember.user.username}!`);
                if (!activity) return;
                activity.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${newMember.user.username} is online`);
            }
            break;
        case 'offline':
            if (!activity) return;
            activity.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${newMember.user.username} is offline`);
            break;
        case 'idle':
            if (!activity) return;
            activity.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${newMember.user.username} is idle`);
            break;
        case 'dnd':
            if (!activity) return;
            activity.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${newMember.user.username} is dnd`);
            break;
    }

    if((oldMember.presence.game === null && newMember.presence.game !== null) || (oldMember.presence.game !== null && newMember.presence.game !== null)) {
        activity.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${newMember.user.username} started playing ${newMember.presence.game}`);
    }

});

client.on('guildMemberAdd', (member) => {
    console.log(`New User '${member.user.username}' has joined '${member.guild.name}'` );
    member.guild.defaultChannel.send(`Hello, ${member.user.username}!`);
    const channel = member.guild.channels.find('name', 'activity');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${member.user.username} has logged in on the server`);
});

client.on('guildMemberRemove', (member) => {
    console.log(member)
    console.log('disconnect')
    const channel = member.guild.channels.find('name', 'activity');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${member.user.username} has left the server`);
});