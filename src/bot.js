require('dotenv').config();
const { TOKEN } = process.env;
const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent']});

client.commands = new Collection();

const prefix = '%';

const files = fs.readdirSync('./commands');

for(const file of files){
    const command = require(`../commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`${file} is set`);
}

client.once('ready', () => {
    client.user.setActivity('');
    console.log("bot is online");
});

client.on('messageCreate', async message => {
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)){
        message.channel.send("I don't have that command");
        return;
    }

    const com = client.commands.get(commandName);

    try{
        com.execute(message, args);
    }catch(err){
        message.channel.send("*Falls on banana peel*");
    }
});

client.login(TOKEN);