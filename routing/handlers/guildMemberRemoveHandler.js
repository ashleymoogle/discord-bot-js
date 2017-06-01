import {activityChannel} from '../../client'

export default function guildMemberRemove (member) {
    console.log('disconnect')
    if (!activityChannel) return;
    activityChannel.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${member.user.username} has left the server`);
}