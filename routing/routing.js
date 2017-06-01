import {messageHandler, presenceHandler, guildMemberAdd, guildMemberRemove} from './handlers'

export default class Routing {
    static message (message) {
        messageHandler(message)
    }

    static presenceUpdate (oldMember, newMember) {
        presenceHandler(oldMember, newMember)
    }

    static guildMemberAdd (member) {
        guildMemberAdd(member)
    }

    static guildMemberRemove (member) {
        guildMemberRemove(member)
    }
}
