const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  AttachmentBuilder
} = require('discord.js');

const session = require('./sessionManager');

const FLOW = 'gl';

async function showPriceList(interaction) {

  const banner = new AttachmentBuilder('./pricing.png', { name: 'pricing.png' });

  const embed = new EmbedBuilder()
    .setTitle('🎮 Game Lain – Custom Order')
    .setColor(0x5865F2)
    .setDescription(`
🎫 Mohon beritahu kamu detail order map/jumlah robuxnya, admin akan berikan Harga di ticket 🎫.
`)
    .setImage('attachment://pricing.png')
    .setFooter({ text: 'MoonBlox • Click Order to proceed' })
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('gl_order')
      .setLabel('Order')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('🛒')
  );

  await interaction.reply({
    embeds: [embed],
    components: [row],
    files: [banner],
    ephemeral: true
  });
}

async function handleInteraction(interaction) {
  const id     = interaction.customId;
  const userId = interaction.user.id;

  if (id === 'gl_order') {
    session.setSession(userId, { flow: FLOW, step: 1 });
    return showModal(interaction);
  }

  if (id === 'gl_modal') {
    const username  = interaction.fields.getTextInputValue('gl_username');
    const mapName   = interaction.fields.getTextInputValue('gl_mapname');
    const itemName  = interaction.fields.getTextInputValue('gl_itemname');
    const robux     = interaction.fields.getTextInputValue('gl_robux');
    session.updateSession(userId, { step: 2, username, mapName, itemName, robux });
    return showSummary(interaction);
  }

  if (id === 'gl_create_ticket') return createTicket(interaction);
  if (id === 'gl_cancel') {
    session.deleteSession(userId);
    return interaction.update({ content: '❌ Order cancelled.', embeds: [], components: [] });
  }
}

async function showModal(interaction) {
  const modal = new ModalBuilder().setCustomId('gl_modal').setTitle('🎮 Gift Gamepass – Custom Order');

  modal.addComponents(
    new ActionRowBuilder().addComponents(
      new TextInputBuilder().setCustomId('gl_username').setLabel('👤Username').setStyle(TextInputStyle.Short).setRequired(true)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder().setCustomId('gl_mapname').setLabel('🌍Nama map/Game').setStyle(TextInputStyle.Short).setRequired(true).setPlaceholder('e.g. Blox Fruits')
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder().setCustomId('gl_itemname').setLabel('🛍️Item').setStyle(TextInputStyle.Short).setRequired(true).setPlaceholder('e.g. Gomu Gomu no Mi')
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder().setCustomId('gl_robux').setLabel('💰Total robux').setStyle(TextInputStyle.Short).setRequired(true).setPlaceholder('e.g. 1500')
    ),
  );

  await interaction.showModal(modal);
}

async function showSummary(interaction) {
  const s     = session.getSession(interaction.user.id);
  const embed = new EmbedBuilder()
    .setTitle('🛍️ Detail Pembelian 🛍️')
    .setColor(0x5865F2)
    .setDescription(
    `📋 **Produk:** Game Lain (Custom)\n` +
    `👤 **Username:** ${s.username}\n` +
    `🌍 **Map / Game:** ${s.mapName}\n` +
    `🛍️ **Item:** ${s.itemName}\n` +
    `💰 **Total Robux:** ${s.robux}`
  )
    .setFooter({ text: 'Admin will confirm price & availability in the ticket.' });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('gl_create_ticket').setLabel('Create Ticket').setStyle(ButtonStyle.Success).setEmoji('🎫'),
    new ButtonBuilder().setCustomId('gl_cancel').setLabel('Cancel').setStyle(ButtonStyle.Danger),
  );

  return interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
}

async function createTicket(interaction) {
  const { createTicket: openTicket } = require('../tickets/createTicket');
  const s = session.getSession(interaction.user.id);

  const summary = `**📋Produk:** 🎮 Game Lain\n**👤Username:** ${s.username}\n**🌍Map / Game:** ${s.mapName}\n**🛍️Item:** ${s.itemName}\n**💰Total robux** ${s.robux}`;
  const instruction = `📌 **Instruksi:**
• Pengiriman Item di Private Server yang kami berikan
• Mohon tunggu admin untuk gift item mu di Ps kami.
• Proses di lakukan sesuai antrian ( jika mengantri )
• Selesaikan pembayaran sesuai arahan admin.
• Pastikan username Roblox kamu sudah benar sebelum admin memproses.
• Setelah selesai, tiket akan ditutup oleh admin.`;
  await openTicket(interaction, { orderType: 'Game Lain', categoryKey: 'games', summaryText: summary, instructionText: instruction });
  session.deleteSession(interaction.user.id);
}

module.exports = { showPriceList, handleInteraction };
