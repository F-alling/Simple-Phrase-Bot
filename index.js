const fs = require('fs');
const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

const token = require('./.env');
const phrases = require('./phrases.json');
const allowedPhrases = phrases.allowedPhrases;

const channelsFile = './channels.json';
let allowedChannels = new Set();
if (fs.existsSync(channelsFile)) {
    const savedChannels = JSON.parse(fs.readFileSync(channelsFile, 'utf8'));
    allowedChannels = new Set(savedChannels);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

const saveChannelsToFile = () => {
    fs.writeFileSync(channelsFile, JSON.stringify([...allowedChannels], null, 2));
};

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const args = message.content.split(' ');
    const command = args.shift().toLowerCase();

    if (command === '!gex') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("You don't have permission to use this command.");
        }

        if (allowedChannels.has(message.channel.id)) {
            allowedChannels.delete(message.channel.id);
            message.channel.send(`${message.channel} is now disabled for message deletion.`);
        } else {
            allowedChannels.add(message.channel.id);
            message.channel.send(`${message.channel} is now enabled for message deletion.`);
        }

        saveChannelsToFile();
    }
});

const isMessageAllowed = (content) => {
    return allowedPhrases.some((phrase) => content.trim().toLowerCase() === phrase.toLowerCase());
};

client.on('messageCreate', (message) => {
    if (message.author.bot || !allowedChannels.has(message.channel.id)) return;

    if (!isMessageAllowed(message.content)) {
        message.delete().catch((err) => console.error('Failed to delete message:', err));
    }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (newMessage.author.bot || !allowedChannels.has(newMessage.channel.id)) return;

    if (!isMessageAllowed(newMessage.content)) {
        newMessage.delete().catch((err) => console.error('Failed to delete edited message:', err));
    }
});

client.login(token);
