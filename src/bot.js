import { config } from 'dotenv';
import { REST } from '@discordjs/rest';
import {
    Client,
    GatewayIntentBits,
    Routes
} from 'discord.js';
import greetingCommand from './commands/hello.js';

config();
const TOKEN = process.env.daemon_token;
const APP_CLIENT_ID = process.env.APP_CLIENT_ID;
const SERVER_GUILD_ID = process.env.SERVER_GUILD_ID;

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

client.on('ready', () => console.log(`Logged in as ${client.user.username}!`));

const rest = new REST ({ version:'10' }).setToken(TOKEN);

client.on('interactionCreate', (interaction) => {

    if(interaction.isChatInputCommand()){
        const greetings = interaction.options.get('hello').value;
        const goodbyes = interaction.options.get('bye').value;

        console.log(interaction.options.get('hello').value);
        console.log(interaction.options.get('bye').value);

        interaction.reply({ content: `${greetings} and ${goodbyes}` })
    }
})

async function mainCommands() {

    const commands = [greetingCommand];

    try {
        console.log();
        await rest.put(Routes.applicationGuildCommands(APP_CLIENT_ID, SERVER_GUILD_ID), {
            body: commands,
        });

        client.login(TOKEN);

    } catch (err) {
        console.log(err);
    }
}

mainCommands()
