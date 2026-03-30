const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { enableButton } = require('../database/supabase');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('open')
    .setDescription('Enable a panel button')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(opt =>
    opt.setName('button')
      .setDescription('Select button')
      .setRequired(true)
      .setAutocomplete(true)
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
