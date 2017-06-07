import fs from 'fs-extra'
import config from '../config'

export default function logsLogic(client) {
    const guild = client.guilds.get(config.guildId);
    const activityChannel = guild.channels.get(config.channelActivityId);
    
    const textChannels = guild.channels.reduce((acc, chan) => {
        chan.type === 'text' ? acc.push(chan) : null;
        return acc
    }, []);
    
    const dir = config.logsPath;
    fs.ensureDirSync(`${dir}/${guild.name}`);
    
    textChannels.forEach((chan) => {
        fs.ensureFileSync(`${dir}/${guild.name}/${chan.name}.md`);
    });
    
    return {guild,  activityChannel, textChannels}
}
