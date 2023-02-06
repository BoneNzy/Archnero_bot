import { config } from "dotenv";
import {
    Client,
    GatewayIntentBits,
    Routes
} from "discord.js";
import { REST } from "@discordjs/rest";
import askAnonCommand from "./commands/askAnonCommand.js";

config();

const TOKEN = process.env.archnero_token;
const APP_CLIENT_ID = process.env.APP_CLIENT_ID;
const GUILD_ID = process.env.SERVER_GUILD_ID;

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
]});

const rest = new REST ({ version:'10' }).setToken(TOKEN);


client.on('ready', () => console.log(`logged in as ${client.user.tag}`));

client.on('interactionCreate', (interaction) => {

    if(interaction.isChatInputCommand()){
        const greetings = interaction.options.get('hello').value;
        const goodbyes = interaction.options.get('bye').value;

        console.log(interaction.options.get('hello').value);
        console.log(interaction.options.get('bye').value);

        interaction.reply({ content: `${greetings} and ${goodbyes}` })
    }
});

async function mainCommands() {
    const commands = [askAnonCommand];

    try {

        console.log('started app');
        await rest.put(Routes.applicationGuildCommands(APP_CLIENT_ID, GUILD_ID), {
                body: commands,
            });

    } catch (err) {
        console.log(err);
    }
}


mainCommands();

client.login(TOKEN);

