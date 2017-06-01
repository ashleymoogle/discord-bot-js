import {activityChannel} from '../../client'

export default function guildMemberAdd (member) {
    console.log(`New User '${member.user.username}' has joined '${member.guild.name}'` );
    member.guild.defaultChannel.send(`Hello, ${member.user.username}!`);
    if (!activityChannel) return;
    activityChannel.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${member.user.username} has joined in on the server`);
}