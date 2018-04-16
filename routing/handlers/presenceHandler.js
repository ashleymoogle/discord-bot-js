import moment from 'moment'
import {defaultChannel, activityChannel} from '../../client'
import config from '../../config'
import {isBot} from '../../utils/utils'

let lastGame = '';

export default function presenceHandler (oldMember, newMember) {
    if(((config.logBot && isBot(newMember)) || !isBot(newMember)) && activityChannel) { //(Bot is allow to talk || user is not a bot) && there is an activitychannel set
        switch (newMember.presence.status) {
            case 'online':
                if (oldMember.presence.status === 'offline') {
                    if(!config.debug) defaultChannel.send(`Hello, ${newMember}!`);
                    activityChannel.send(`[${moment().format('YYYY-MM-DD - HH:mm:ss')}] ${newMember.user.username} is **online**`);
                }
                break;
            case 'offline':
                activityChannel.send(`[${moment().format('YYYY-MM-DD - HH:mm:ss')}] ${newMember.user.username} is **offline**`);
                break;
            case 'idle':
                activityChannel.send(`[${moment().format('YYYY-MM-DD - HH:mm:ss')}] ${newMember.user.username} is **idle**`);
                break;
            case 'dnd':
                activityChannel.send(`[${moment().format('YYYY-MM-DD - HH:mm:ss')}] ${newMember.user.username} is **dnd**`);
                break;
        }

        if ((oldMember.presence.game === null && newMember.presence.game !== null) || (oldMember.presence.game !== null && newMember.presence.game !== null)) {
            let msg = `${newMember.user.username} started playing \`\`\`${newMember.presence.game.name}\`\`\``;
            if (lastGame !== msg) {
                lastGame = msg;
                activityChannel.send(`[${moment().format('YYYY-MM-DD - HH:mm:ss')}] ${msg}`);
            }
        } else if ((oldMember.presence.game !== null && newMember.presence.game === null)) {
            activityChannel.send(`[${moment().format('YYYY-MM-DD - HH:mm:ss')}] ${newMember.user.username} has stopped playing \`\`\`${oldMember.presence.game.name}\`\`\``);
        }
    }
}