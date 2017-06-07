import fs from 'fs-extra'
import config from '../config'

export default function logsLogic(client) {
    let guild = client.guilds.get(config.guildId);
    let activityChannel = guild.channels.get(config.channelActivityId);
    let textChannels = guild.channels.reduce((acc, chan) => {
        if(chan.type === 'text') {
            acc.push(chan)
        }
        return acc
    }, []);
    const dir = config.logsPath;
    fs.ensureDirSync(`${dir}/${guild.name}`);
    textChannels.forEach((chan) => {
        fs.ensureFileSync(`${dir}/${guild.name}/${chan.name}.md`);
    });
    return {guild: guild, activityChannel: activityChannel, textChannels: textChannels}
}