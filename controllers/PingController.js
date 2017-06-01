export default class PingController {
    static ping (channel) {
        channel.send('pong!');
    }
}