import moment from 'moment'
import fs from 'fs-extra'
import config from '../../config'

export default function LogToMd (message) {
    let toLog = `\r\r[${moment().format('YYYY-MM-DD - HH:mm:ss')}] ${message.author.username} : ${message.content}`;
    fs.appendFile(`${config.logsPath}/${message.channel.guild.name}/${message.channel.name}.md`, toLog, (err) => {
        if(err)
            throw err;
        //console.log('file saved ;)')
    })
}