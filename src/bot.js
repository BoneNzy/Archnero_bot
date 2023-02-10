import { config } from "dotenv";
import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import greetingCommand from "./commands/greetings.js";
import goodbyeCommand from "./commands/goodbyes.js";

config();

const TOKEN = process.env.archnero_token;
const APP_CLIENT_ID = process.env.APP_CLIENT_ID;
const GUILD_ID = process.env.SERVER_GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: "10" }).setToken(TOKEN);

client.on("ready", () => console.log(`logged in as ${client.user.tag}`));

client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand()) {

    if(interaction.commandName === "greet-in") {
        const greetings = interaction.options.get("hello").value;
        interaction.reply({ content: `${greetings}` });
    } else if(interaction.commandName === "see-ya") {
      const goodbyes = interaction.options.get("bye").value;
      interaction.reply({content: `${goodbyes}`});
    }
  }
});

async function mainCommands() {
  const commands = [
    greetingCommand,
    goodbyeCommand
];

  try {
    console.log(`Am awake!`);
    await rest.put(Routes.applicationGuildCommands(APP_CLIENT_ID, GUILD_ID), {
      body: commands,
    });
  } catch (err) {
    console.log(err);
  }
}

mainCommands();

client.login(TOKEN);
