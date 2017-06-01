import client from './client'
import Routing from './routing/routing'

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', Routing.message)

client.on('error', (err) => {
    console.log(err)
});

client.on('presenceUpdate', Routing.presenceUpdate);
client.on('guildMemberAdd', Routing.guildMemberAdd);
client.on('guildMemberRemove', Routing.guildMemberRemove);