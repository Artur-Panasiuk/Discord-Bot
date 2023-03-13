module.exports = {
    name: 'ping',
    description: 'You alive?',
    usage: '%ping',
    execute: async(mess, args) => {
        mess.channel.send("pong");
    }
}