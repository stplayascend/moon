const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { enableButton } = require('../database/supabase');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('open')
    .setDescription('Enable a panel button')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(opt =>
      opt.setName('button')
        .setDescription('Button to enable')
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

    await enableButton(btn);

    await interaction.reply({
      content: `✅ Enabled: ${btn}`,
      ephemeral: true
    });
  }
};
