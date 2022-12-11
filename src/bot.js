import { config } from 'dotenv';
import { REST } from '@discordjs/rest';
import {
    Client,
    GatewayIntentBits,
    Routes
} from 'discord.js';

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
        console.log(interaction.options.get('hello').value);
        // interaction.reply({ content: 'what is it!' })
        interaction.reply({ content: interaction.options.get('hello').value })
    }
})

async function mainCommands() {
    const commands = [{
        name:'greet',
        description: 'greetings',
        options: [
            {
                name: 'hello',
                description: 'foreign language greetings',
                type: 3,
                required: true,
                choices: [
                    {
                        name: 'bodo',
                        value: 'Gwjwntwng'
                    },
                    {
                        name: 'nihongo',
                        value: 'Konichiwa'
                    },
                    {
                        name: 'hindi',
                        value: 'Namaste'
                    },
                    {
                        name: 'spanish',
                        value: 'Hola'
                    },
                    {
                        name: 'chinese',
                        value: 'Nǐ hǎo'
                    },
                ],
            },
        ],
    }];

    try {
        console.log();
        await rest.put(Routes.applicationGuildCommands(APP_CLIENT_ID, SERVER_GUILD_ID), {
            body: commands,
        });

    } catch (err) {
        console.log(err);
    }
}

mainCommands()

client.login(TOKEN);