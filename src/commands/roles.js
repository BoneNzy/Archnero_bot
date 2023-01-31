import { SlashCommandBuilder } from '@discordjs/builders';

const rolesCommand = new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('Get roles for yourself')