const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { enableButton, getDisabledButtons } = require('../database/supabase');

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
    const panel = global.panelData;

    if (panel) {
      const channel = await interaction.client.channels.fetch(panel.channelId);
      const msg = await channel.messages.fetch(panel.messageId);

      const disabled = await getDisabledButtons();

      const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

      const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('robux_login').setLabel('Robux Via Login').setStyle(ButtonStyle.Primary).setEmoji('🔐').setDisabled(disabled.includes('robux_login')),
        new ButtonBuilder().setCustomId('robux_gamepass').setLabel('Robux Via Gamepass').setStyle(ButtonStyle.Primary).setEmoji('⏳').setDisabled(disabled.includes('robux_gamepass')),
        new ButtonBuilder().setCustomId('robux_group').setLabel('Robux Via Group Payout').setStyle(ButtonStyle.Primary).setEmoji('⚡').setDisabled(disabled.includes('robux_group'))
      );

      const row2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('fishit').setLabel('Fish It').setStyle(ButtonStyle.Primary).setEmoji('🐟').setDisabled(disabled.includes('fishit')),
        new ButtonBuilder().setCustomId('boost_fishit').setLabel('Boost x8 Fish It').setStyle(ButtonStyle.Primary).setEmoji('🍀').setDisabled(disabled.includes('boost_fishit')),
        new ButtonBuilder().setCustomId('forge').setLabel('The Forge').setStyle(ButtonStyle.Primary).setEmoji('⛏').setDisabled(disabled.includes('forge'))
      );

      const row3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('abyss').setLabel('Abyss').setStyle(ButtonStyle.Primary).setEmoji('🔮').setDisabled(disabled.includes('abyss')),
        new ButtonBuilder().setCustomId('sawah').setLabel('Sawah Indo').setStyle(ButtonStyle.Primary).setEmoji('🌾').setDisabled(disabled.includes('sawah')),
        new ButtonBuilder().setCustomId('game_lain').setLabel('Game Lain').setStyle(ButtonStyle.Primary).setEmoji('🎮').setDisabled(disabled.includes('game_lain'))
      );

      const row4 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('heartopia').setLabel('Diamond Heartopia').setStyle(ButtonStyle.Primary).setEmoji('💎').setDisabled(disabled.includes('heartopia'))
      );

      await msg.edit({
        components: [row1, row2, row3, row4]
      });
    }

    await interaction.reply({
      content: `✅ Enabled: ${btn}`,
      ephemeral: true
    });
  }
};
