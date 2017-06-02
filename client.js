import Discord from "discord.js"
import config from "./config"
import moment from 'moment'
import 'moment/min/locales'
import fs from 'fs'

moment.locale(config.locale);

const pathConfig = config.path;
let stats;

//CREATE OR USE CONF FILE
try {
    stats = fs.statSync(pathConfig);
    console.log("Config file found.");
}
catch (e) {
    console.log("File does not exist.");
}

const client = new Discord.Client();

let guild = {};
let activityChannel = {};

client.login(config.botToken).then(() => {
    guild = client.guilds.get(config.guildId);
    activityChannel = guild.channels.get(config.channelActivityId)
});

export default client
export {guild, activityChannel}