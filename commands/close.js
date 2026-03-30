const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { disableButton } = require('../database/supabase');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('close')
    .setDescription('Disable a panel button')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(opt =>
    opt.setName('button')
      .setDescription('Select button')
      .setRequired(true)
      .setAutocomplete(true)
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
