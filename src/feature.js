
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
import { config } from 'dotenv';
import { REST } from '@discordjs/rest';
import {
    Client,
    GatewayIntentBits,
    Routes
} from 'discord.js';
import greetingCommand from './commands/greeting.js';

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

config();

const TOKEN = process.env.TOKEN;
const APP_CLIENT_ID = process.env.APP_CLIENT_ID;
// const guild = client.guilds.cache.first();
// const SERVER_GUILD_ID = guild.id;
const SERVER_GUILD_ID = process.env.SERVER_GUILD_ID;

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
        await rest.put(Routes.applicationGuildCommands(APP_CLIENT_ID), { body: commands });


    } catch (err) {
        console.log(err);
    }
}

client.login(TOKEN);
mainCommands()
