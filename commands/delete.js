const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const { removeButtonFully, getDisabledButtons, getRemovedButtons } = require('../database/supabase');
const { buildPanelRows } = require('../utils/panelRows');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete')
    .setDescription('Remove a button from the panel entirely')
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

    await removeButtonFully(btn);

    const panel = global.panelData;

    if (panel) {
      const channel = await interaction.client.channels.fetch(panel.channelId);
      const msg = await channel.messages.fetch(panel.messageId);

      await msg.edit({
        components: buildPanelRows(await getDisabledButtons(), await getRemovedButtons()),
      });
    }

    await interaction.reply({
      content: `🗑️ Removed: ${btn}`,
      ephemeral: true,
    });
  },
};
