import PingController from '../../controllers/PingController'
import client, {activityChannel} from '../../client'
import {Eddie} from "../../data/index"
import config from "../../config"
import {isBot} from '../../utils/utils'
import Logger from '../../logger/Logger'

const prefix = config.prefix;

export default function messageHandler (message) {
    //logs logic
    if(config.physicalLogs) {
        if((config.logBot && isBot(message.author)) || !isBot(message.author)) {
            Logger.logMessageToMd(message)
        }
    }

    //Bot logic
    let input = message.content.toLowerCase();
    if(!isBot(message.author)) {

        //COMMANDS
        if (message.content.startsWith(prefix)) {
            switch (input) {
                case ':help':
                    message.channel.send(`\`\`\`Welcome to the Help command.
Type 'ping' to get ponged
Type 'NOICE' to being NOICED
Type 'classic eddie' to get a classic fact about eddie
Activity is logged in #${activityChannel.name}
\`\`\``);
                    break;
            }
            return
        }

        if (input.startsWith('ping')) {
            PingController.ping(message.channel)
        }

        if (message.content.includes('NOICE')) {
            message.channel.send(`NOICE ${message.author.username}! I'm Noicing your Noice!`);
        }

        if (input.startsWith('mug')) {
            console.log(activityChannel)
        }

        if (input.includes('classic eddie')) {
            //find user
            let eddie = client.users.find('id', '185313995069194240');
            let factIndex = Math.floor(Math.random() * Eddie.classic.length);

            message.channel.send
            (`Oh, looks like ${message.author.username} requested a Classic fact about ${eddie}\`\`\`Fact number ${factIndex + 1} :
${Eddie.classic[factIndex]}\`\`\``);
        }
    }
}