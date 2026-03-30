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

// 🔥 UPDATE PANEL
const { getDisabledButtons } = require('../database/supabase');
const { buildPanel } = require('../utils/panelBuilder');

const panel = interaction.client.panelData;

if (panel) {
  const channel = await interaction.client.channels.fetch(panel.channelId);
  const msg = await channel.messages.fetch(panel.messageId);

  const disabled = await getDisabledButtons();

  await msg.edit({
    components: buildPanel(disabled)
  });
}

await interaction.reply({
  content: `✅ Enabled: ${btn}`,
  ephemeral: true
});
    });
  }
};
