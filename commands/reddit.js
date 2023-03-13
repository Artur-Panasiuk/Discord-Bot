const { EmbedBuilder, Guild } = require('discord.js');
const axios = require("axios");

const randNo = (limit) => {
    const thatNo = Math.floor(Math.random() * limit);
    return thatNo;
};

module.exports = {
    name: 'r',
    description: 'steals post from given subreddit once or optionally in set interval',
    usage: '%r [subreddit] [timeInterval]',
    execute: async(mess, args) => {
        axios
            .get(`https://www.reddit.com/r/${args[0]}/.json?random`)
            .then((response) => {
                let raw = response.data.data.children;
                let dt = raw[randNo(raw.length)].data;
                const example = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`${dt.title} - ${args[0]}`)
                .setURL(`https://reddit.com${dt.permalink}`)
                .setImage(dt.url)

                mess.channel.send({ embeds: [example] });
            })
            .catch((err) => {
                mess.channel.send(`Something went wrong. - ${err}`);
            });
    }
}