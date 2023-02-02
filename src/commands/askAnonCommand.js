import { SlashCommandBuilder } from "@discordjs/builders";

const askMeCommand = new SlashCommandBuilder()
    .setName('ask-anon')
    .setDescription('Ask anything anonymously to anyone')
    .addStringOption((option) =>
        option
            .setName('quiz-time')
            .setDescription('Ask whatever you wish')

    )



export default askMeCommand.toJSON();