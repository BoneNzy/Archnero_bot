import { SlashCommandBuilder } from "discord.js";

const goodbyeCommand = new SlashCommandBuilder()
  .setName("see-ya")
  .setDescription("Goodbyes mai ferando")
  .addStringOption((option) =>
    option
      .setName("bye")
      .setDescription("foreign language goodbyes")
      .setRequired(true)
      .addChoices(
        {
          name: "bodo",
          value: "Bedai lanwswi",
        },
        {
          name: "nihongo",
          value: "Sayonara",
        },
        {
          name: "hindi",
          value: "Duwa o me yaad rakhna",
        }
      )
  );

export default goodbyeCommand.toJSON();
