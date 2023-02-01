const { GatewayIntentBits } = require("discord.js");
const Discord = require("discord.js");
require('dotenv').config();

const client = new Discord.Client({
    intents: [GatewayIntentBits.Guilds]
});
const TOKEN = process.env.archnero_token;

// Log in to discord with the bot token from the .env file
client.login(TOKEN);

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
});
