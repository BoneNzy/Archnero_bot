import { SlashCommandBuilder } from "discord.js";

const greetingCommand = new SlashCommandBuilder()
  .setName("greet-in")
  .setDescription("Hello mai ferando")
  .addStringOption((option) =>
    option
      .setName("hello")
      .setDescription("foreign language greetings")
      .setRequired(true)
      .addChoices(
        {
          name: "bodo",
          value: "Gwjwntwng",
        },
        {
          name: "nihongo",
          value: "Konichiwa",
        },
        {
          name: "hindi",
          value: "Namaste",
        },
        {
          name: "spanish",
          value: "Hola",
        },
        {
          name: "chinese",
          value: "Nǐ hǎo",
        }
      )
  );

export default greetingCommand.toJSON();
