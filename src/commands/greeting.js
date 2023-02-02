import { SlashCommandBuilder } from "@discordjs/builders";

const greetingCommand = new SlashCommandBuilder()
    .setName('greet-in')
    .setDescription('Greetings')
    .addStringOption((option) =>
        option
            .setName('hello')
            .setDescription('foreign language greetings')
            .setRequired(true)
            .addChoices(
                {
                    name: 'bodooooo',
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
            ),
    )
    .addStringOption((option) =>
        option
            .setName('bye')
            .setDescription('foreign language goodbyes')
            .setRequired(true)
            .addChoices(
                {
                    name: 'bodo',
                    value: 'Bedai lanwswi'
                },
                {
                    name: 'nihongo',
                    value: 'Sayonara'
                },
                {
                    name: 'hindi',
                    value: 'Duwa o me yaad rakhna'
                },
            ),
    );

    export default greetingCommand.toJSON();