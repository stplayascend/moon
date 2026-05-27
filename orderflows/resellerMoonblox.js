const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  AttachmentBuilder,
} = require('discord.js');

const items = require('../data/items');
const session = require('./sessionManager');

const FLOW = 'rs';

async function showPriceList(interaction) {
  await interaction.deferReply({ ephemeral: true });

  const banner = new AttachmentBuilder('./pricing.png', { name: 'pricing.png' });

  const embed = new EmbedBuilder()
    .setTitle('👨🏻‍💻 Reseller Moonblox')
    .setColor(0x5865F2)
    .setDescription(
`Reseller Moonblox 🚀
Ingin join jadi reseller di Moonblox? Bisa banget! ✨
Dapatkan berbagai benefit menarik dan harga spesial khusus reseller 💸

**👑 Normal Reseller - 100.000 per bulan**
🎁 GIG / Robux via Gamepass before tax rate 80
👥 Robux via Group Payout rate 110
💎 Limited item rate 55 (normal rate 65)
🔐 Robux via Login rate 67.5k / 500 Rbx
📱 Akses langsung ke WhatsApp pribadi admin
🕐 Fast response & 24 jam services
📦 Prioritas stock & proses order
✨ Dan masih banyak benefit lainnya!

**👑 Premium Reseller - 200.000 per bulan**
🎁 GIG / Robux via Gamepass before tax rate 80
👥 Robux via Group Payout rate 105
💎 Limited item rate 50 (normal rate 65)
🔐 Robux via Login rate 65k / 500 Rbx
📱 Akses langsung ke WhatsApp pribadi admin
🕐 Fast response & 24 jam services
📦 Prioritas stock & proses order
👥 Bisa dibuatkan group atas nama store mu sendiri
✨ Dan masih banyak benefit lainnya!

Cocok buat kalian yang ingin mulai jualan robux, limited, ataupun build store sendiri bareng Moonblox 🌙`
    )
    .setImage('attachment://pricing.png')
    .setFooter({ text: 'MoonBlox • Click Order to proceed' });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('rs_order')
      .setLabel('Order')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('🛒')
  );

  await interaction.editReply({
    embeds: [embed],
    components: [row],
    files: [banner],
  });
}

async function showPackageSelect(interaction) {
  const embed = new EmbedBuilder()
    .setTitle('📦 Pilih paket')
    .setColor(0x5865F2)
    .setDescription('Pilih paket reseller yang kamu inginkan.');

  const select = new StringSelectMenuBuilder()
    .setCustomId('rs_package_select')
    .setPlaceholder('Pilih paket...')
    .addOptions(items.resellerMoonbloxPackages);

  return interaction.update({
    embeds: [embed],
    components: [new ActionRowBuilder().addComponents(select)],
  });
}

async function showSummary(interaction) {
  const currentSession = session.getSession(interaction.user.id);

  const embed = new EmbedBuilder()
    .setTitle('🛍️ Detail Pembelian')
    .setColor(0x5865F2)
    .setDescription(
      `📋 **Produk:** Reseller Moonblox\n` +
      `📦 **Paket:** ${currentSession.packageLabel}`
    );

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('rs_create_ticket')
      .setLabel('Create Ticket')
      .setStyle(ButtonStyle.Success)
      .setEmoji('🎫'),
    new ButtonBuilder()
      .setCustomId('rs_cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Danger)
  );

  return interaction.update({
    embeds: [embed],
    components: [row],
  });
}

async function createTicket(interaction) {
  const { createTicket: openTicket } = require('../tickets/createTicket');
  const currentSession = session.getSession(interaction.user.id);

  const summaryText =
`**📋 Produk:** Reseller Moonblox
**📦 Paket:** ${currentSession.packageLabel}`;

  const instructionText =
`📌 **Instruksi:**
• Pastikan paket reseller yang kamu pilih sudah sesuai.
• Selesaikan pembayaran sesuai detail yang dikirim bot.
• Setelah pembayaran diverifikasi, admin akan memproses aktivasi reseller kamu.
• Masa aktif reseller dihitung dari orderan pertama.`;

  await openTicket(interaction, {
    orderType: 'Reseller Moonblox',
    categoryKey: 'reseller',
    summaryText,
    instructionText,
  });

  session.deleteSession(interaction.user.id);
}

async function handleInteraction(interaction) {
  const id = interaction.customId;
  const userId = interaction.user.id;

  if (id === 'rs_order') {
    session.setSession(userId, {
      flow: FLOW,
      step: 1,
    });

    return showPackageSelect(interaction);
  }

  if (id === 'rs_package_select') {
    const selected = interaction.values[0];
    const selectedPackage = items.resellerMoonbloxPackages.find(pkg => pkg.value === selected);

    session.updateSession(userId, {
      step: 2,
      packageValue: selected,
      packageLabel: selectedPackage?.label ?? selected,
    });

    return showSummary(interaction);
  }

  if (id === 'rs_create_ticket') {
    return createTicket(interaction);
  }

  if (id === 'rs_cancel') {
    session.deleteSession(userId);

    return interaction.update({
      content: '❌ Order cancelled.',
      embeds: [],
      components: [],
    });
  }
}

module.exports = {
  showPriceList,
  handleInteraction,
};
