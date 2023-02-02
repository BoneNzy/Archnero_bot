import { config } from "dotenv";
import { REST } from "@discordjs/rest";
import {
    Client,
    GatewayIntentBits,
    Routes
} from "discord.js";
import askAnonCommand from "./commands/askAnonCommand.js";


const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages
]});


config();
const TOKEN = process.env.archnero_token;
const APP_CLIENT_ID = process.env.APP_CLIENT_ID;
const rest = new REST ({ version:'10' }).setToken(TOKEN);
client.login(TOKEN);


client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
});


client.on('interactionCreate', (interaction) => {

    if(interaction.isChatInputCommand()) {

    }
});


async function mainCommands() {

    const commands = [askAnonCommand];

    try {

        await rest.put(Routes.applicationCommand(APP_CLIENT_ID), {
            body: commands
        });
    }
    catch (err) {
        console.log(err);
    }
}


mainCommands();