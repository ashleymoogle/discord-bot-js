import client from './client'
import Routing from './routing/routing'

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', Routing.message);

client.on('error', (err) => {
    console.log(err)
});

client.on('presenceUpdate', Routing.presenceUpdate);
client.on('guildMemberAdd', Routing.guildMemberAdd);
client.on('guildMemberRemove', Routing.guildMemberRemove);

/*
import('./client').then((Client) => {
    const client = Client.default
    import('./routing/routing').then((routing) => {
        const Routing = routing.default
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
    })
})
/*
Promise.all(
    ['./client', './routing/routing'].map(x => System.import(x)))
    .then(([client, Routing]) => {
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
    })
*/