const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const { enableButton, getDisabledButtons } = require('../database/supabase');
const { buildPanelRows } = require('../utils/panelRows');

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
    if (!interaction.member.permissions.has('Administrator')) {
      return interaction.reply({
        content: '❌ You are not allowed to use this command.',
        ephemeral: true,
      });
    }

    const btn = interaction.options.getString('button');

    await enableButton(btn);

    const panel = global.panelData;

    if (panel) {
      const channel = await interaction.client.channels.fetch(panel.channelId);
      const msg = await channel.messages.fetch(panel.messageId);

      await msg.edit({
        components: buildPanelRows(await getDisabledButtons()),
      });
    }

    await interaction.reply({
      content: `✅ Enabled: ${btn}`,
      ephemeral: true,
    });
  },
};
