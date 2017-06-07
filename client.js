import Discord from "discord.js"
import moment from 'moment'
import 'moment/min/locales'
import fs from 'fs-extra'

import logsLogic from './logger/logsLogic'

const client = new Discord.Client();

let guild, activityChannel, textChannels;


//CREATE OR USE CONF FILE
(async () => {
    try {
        await fs.stat('./config.js');
        console.log("Config file found.");
    }
    catch (e) {
        console.log(e);
        console.log("File does not exist. Creating config from example");
        try {
            await fs.copy('./config.example.js', './config.js');
            console.log('Config created!')
        } catch(error) {
            console.log('Massive fail');
            console.log(error)
        }
    } finally {
        const config = require('./config');
        moment.locale(config.default.locale);
        await client.login(config.default.botToken);
        ({guild, activityChannel, textChannels} = logsLogic(client));
    }
})();

export default client
export {guild, activityChannel, textChannels}