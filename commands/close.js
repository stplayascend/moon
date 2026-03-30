const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { disableButton } = require('../database/supabase');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('close')
    .setDescription('Disable a panel button')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(opt =>
      opt.setName('button')
        .setDescription('Button to disable')
        .setRequired(true)
        .addChoices(
          { name: 'Robux Login', value: 'robux_login' },
          { name: 'Gamepass', value: 'robux_gamepass' },
          { name: 'Group Payout', value: 'robux_group' },
          { name: 'Fish It', value: 'fishit' },
          { name: 'Boost Fish It', value: 'boost_fishit' },
          { name: 'Forge', value: 'forge' },
          { name: 'Abyss', value: 'abyss' },
          { name: 'Sawah Indo', value: 'sawah' },
          { name: 'Game Lain', value: 'game_lain' },
          { name: 'Heartopia', value: 'heartopia' }
        )
    ),

  async execute(interaction) {

    const btn = interaction.options.getString('button');

    await disableButton(btn);

    await interaction.reply({
      content: `❌ Disabled: ${btn}`,
      ephemeral: true
    });
  }
};
