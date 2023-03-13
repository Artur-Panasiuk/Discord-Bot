const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'List of all commands',
    usage: '%help',
    execute: async(mess, args) => {
        const files = fs.readdirSync('./commands');

        const example =  new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Help")

        for(const file of files){
            const command = require(`../commands/${file}`);
            example.addFields({
                name: command.usage,
                value: command.description,
            });
        }
        mess.channel.send({ embeds: [example] });
    }
}