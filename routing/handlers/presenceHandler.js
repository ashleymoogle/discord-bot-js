import moment from 'moment'
import {activityChannel} from '../../client'

export default function presenceHandler (oldMember, newMember) {
    switch(newMember.presence.status) {
        case 'online':
            if(oldMember.presence.status !== 'idle') {
                newMember.guild.defaultChannel.send(`Hello, ${newMember}!`);
                if (!activityChannel) return;
                activityChannel.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${newMember.user.username} is online`);
            }
            break;
        case 'offline':
            if (!activityChannel) return;
            activityChannel.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${newMember.user.username} is offline`);
            break;
        case 'idle':
            if (!activityChannel) return;
            activityChannel.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${newMember.user.username} is idle`);
            break;
        case 'dnd':
            if (!activityChannel) return;
            activityChannel.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${newMember.user.username} is dnd`);
            break;
    }

    if((oldMember.presence.game === null && newMember.presence.game !== null) || (oldMember.presence.game !== null && newMember.presence.game !== null)) {
        if (!activityChannel) return;
        activityChannel.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${newMember.user.username} started playing \`\`\`${newMember.presence.game.name}\`\`\``);
    } else if ((oldMember.presence.game !== null && newMember.presence.game === null)) {
        if (!activityChannel) return;
        activityChannel.send(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${newMember.user.username} has stopped playing \`\`\`${oldMember.presence.game.name}\`\`\``);
    }
}