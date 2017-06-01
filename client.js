import Discord from "discord.js"
import config from "./config"

const client = new Discord.Client();

let guild = {};
let activityChannel = {};

client.login(config.botToken).then(() => {
    guild = client.guilds.get(config.guildId)
    activityChannel = guild.channels.get(config.channelActivityId)
})

export default client
export {guild, activityChannel}