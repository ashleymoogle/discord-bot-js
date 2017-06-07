import Discord from "discord.js"
import moment from 'moment'
import 'moment/min/locales'
import fs from 'fs-extra'

import logsLogic from './controllers/logsLogic'

const client = new Discord.Client();

let guild, activityChannel, textChannels;

let stats;


//CREATE OR USE CONF FILE
try {
    stats = fs.statSync('./config.js');
    console.log("Config file found.");
    const config = require('./config')
    moment.locale(config.default.locale)
    client.login(config.default.botToken).then(() => {
        ({guild, activityChannel, textChannels} = logsLogic(client));
    });
}
catch (e) {
    console.log("File does not exist. Creating config from example");
    try {
        fs.copySync('./config.example.js', './config.js')
        console.log('Config created!')
    } catch(error) {
        console.log('Massive fail')
        console.log(error)
    }
    const config = require('./config.js')
    moment.locale(config.default.locale)
    client.login(config.default.botToken).then(() => {
        ({guild, activityChannel, textChannels} = logsLogic(client))
    })
}

export default client
export {guild, activityChannel, textChannels}