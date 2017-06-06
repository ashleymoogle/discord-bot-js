import Discord from "discord.js"
import moment from 'moment'
import 'moment/min/locales'
import fs from 'fs-extra'


const client = new Discord.Client();

let guild = {};
let activityChannel = {};

let stats;


//CREATE OR USE CONF FILE
try {
    stats = fs.statSync('./config.js');
    console.log("Config file found.");
    import('./config').then((config) => {
        moment.locale(config.default.locale)
        client.login(config.default.botToken).then(() => {
            guild = client.guilds.get(config.default.guildId);
            activityChannel = guild.channels.get(config.default.channelActivityId)
        });
    })
}
catch (e) {
    console.log("File does not exist. Creating config from example");
    fs.copy('./config.example.js', './config.js')
        .then((c) => {
            console.log('Config created!')
            import('./config').then((config) => {
                moment.locale(config.default.locale)
                client.login(config.default.botToken).then(() => {
                    guild = client.guilds.get(config.default.guildId);
                    activityChannel = guild.channels.get(config.default.channelActivityId)
                });
            })
        }).catch((error) => {
        console.log('Massive fail')
            console.log(error)
    })
}

export default client
export {guild, activityChannel}