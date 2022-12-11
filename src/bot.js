import {config} from 'dotenv';
import {REST} from '@discordjs/rest';
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
] });

client.on('ready', () => console.log(`Logged in as ${client.user.username}!`));

const rest = new REST ({ version:'10' }).setToken(TOKEN);

client.on('interactionCreate', (interaction) => {
    if(interaction.isChatInputCommand()){
        interaction.reply({ content: 'what is it!' })
    }
})

async function mainCommands() {
    const commands = [{
        name:'hello',
        description: 'greetings'
    }];

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

// Message Details
// client.on('messageCreate', (message) => {
//     let messageDetails = [{
//         content: message.content,
//         date: message.createdAt.toDateString(),
//         user: message.author.tag
//     }];
//     let obj = messageDetails.map(({content, date, user}) =>{
//         return ({
//             content,
//             date,
//             user});
//     })
//     console.log(obj);
// })
