const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  AttachmentBuilder
} = require('discord.js');

const items   = require('../data/items');
const session = require('./sessionManager');

const FLOW = 'dh';

async function showPriceList(interaction) {

  const banner = new AttachmentBuilder('./pricing.png', { name: 'pricing.png' });

  const embed = new EmbedBuilder()
    .setTitle('💎 Diamond Heartopia - Price List')
    .setColor(0x5865F2)
    .setDescription(`
OPEN TOPUP **DIAMOND HEARTOPIA VIA LOGIN ONLY**  
LEGAL 1000% WITH RECEIPT.

🌰 **GAMG JUNIOR MEMBERSHIP 7D** → 8.000  
🌰 **GAMG FULL MEMBERSHIP 30D** → 47.000  

💎 **300 + 20 Heart Diamond** → Rp77.000  
💎 **680 + 50 Heart Diamond** → Rp170.000  
💎 **1280 + 90 Heart Diamond** → Rp320.000  
💎 **1980 +150 Heart Diamond** → Rp500.000  
💎 **3280 + 270 Heart Diamond** → Rp820.000  
💎 **6480 + 570 Heart Diamond** → Rp1.550.000
`)
    .setImage('attachment://pricing.png')
    .setFooter({ text: 'MoonBlox • Click Order to proceed' })
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('dh_order')
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

  if (id === 'dh_order') {
    session.setSession(userId, { flow: FLOW, step: 1 });
    return showUsernameModal(interaction);
  }

  if (id === 'dh_username_modal') {
    const username = interaction.fields.getTextInputValue('dh_username');
    session.updateSession(userId, { step: 2, username });
    return showServerButtons(interaction);
  }

  if (id.startsWith('dh_server_')) {
    const server = id.replace('dh_server_', '');
    session.updateSession(userId, { step: 3, server });
    return showLoginMethodButtons(interaction);
  }

  if (id === 'dh_login_gmail') {
    session.updateSession(userId, { loginMethod: 'Gmail' });
    return showGmailModal(interaction);
  }

  if (id === 'dh_login_fb') {
    session.updateSession(userId, { loginMethod: 'Facebook' });
    return showFBModal(interaction);
  }

  if (id === 'dh_gmail_modal') {
    const email = interaction.fields.getTextInputValue('dh_email');
    const password = interaction.fields.getTextInputValue('dh_password');

    session.updateSession(userId, {
      step: 4,
      email,
      password
    });

    return showPackageSelect(interaction);
  }

  if (id === 'dh_fb_modal') {
    const username = interaction.fields.getTextInputValue('dh_fb_username');
    const password = interaction.fields.getTextInputValue('dh_fb_password');

    session.updateSession(userId, {
      step: 4,
      fbUser: username,
      password
    });

    return showPackageSelect(interaction);
  }

  if (id === 'dh_package_select') {
    const selected = interaction.values[0];
    const pkg = items.heartopiaPackages.find(p => p.value === selected);

    session.updateSession(userId, { step: 5, package: pkg.label });

    return showSummary(interaction);
  }

  if (id === 'dh_create_ticket') return createTicket(interaction);

  if (id === 'dh_cancel') {
    session.deleteSession(userId);
    return interaction.update({ content: '❌ Order cancelled.', embeds: [], components: [] });
  }
}

async function showUsernameModal(interaction) {

  const modal = new ModalBuilder()
    .setCustomId('dh_username_modal')
    .setTitle('💎Heartopia Username');

  modal.addComponents(
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('dh_username')
        .setLabel('👤Username')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    )
  );

  await interaction.showModal(modal);
}

async function showServerButtons(interaction) {

  const embed = new EmbedBuilder()
    .setTitle('🌍 Server')
    .setColor(0x5865F2)
    .setDescription('✨ Pilih server akunmu');

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('dh_server_sea').setLabel('SEA').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('dh_server_twhkmo').setLabel('TW/HK/MO').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('dh_server_asia').setLabel('Asia').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('dh_server_global').setLabel('Global').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('dh_server_america').setLabel('America').setStyle(ButtonStyle.Primary),
  );

  await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
}

async function showLoginMethodButtons(interaction) {

  const embed = new EmbedBuilder()
    .setTitle('🛒Metode Login')
    .setColor(0x5865F2)
    .setDescription('✨ Pilih metode login akunmu');

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('dh_login_gmail')
      .setLabel('🔑 Login via Gmail')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId('dh_login_fb')
      .setLabel('🔑 Login via Facebook')
      .setStyle(ButtonStyle.Primary),
  );

  await interaction.update({ embeds: [embed], components: [row] });
}

async function showGmailModal(interaction) {

  const modal = new ModalBuilder()
    .setCustomId('dh_gmail_modal')
    .setTitle('🔑 Gmail Login');

  modal.addComponents(

    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('dh_email')
        .setLabel('Email')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    ),

    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('dh_password')
        .setLabel('Password')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    )

  );

  await interaction.showModal(modal);
}

async function showFBModal(interaction) {

  const modal = new ModalBuilder()
    .setCustomId('dh_fb_modal')
    .setTitle('Facebook Login');

  modal.addComponents(

    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('dh_fb_username')
        .setLabel('Facebook Username')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    ),

    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('dh_fb_password')
        .setLabel('Password')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    )

  );

  await interaction.showModal(modal);
}

async function showPackageSelect(interaction) {

  const embed = new EmbedBuilder()
    .setTitle('🛍️ Detail Produk 🛍️')
    .setColor(0x5865F2)
    .setDescription(' 🛒 Pilih paket diamond/pass yang di inginkan');

  const select = new StringSelectMenuBuilder()
    .setCustomId('dh_package_select')
    .setPlaceholder('Pilih item...')
    .addOptions(items.heartopiaPackages);

  const row = new ActionRowBuilder().addComponents(select);

  return interaction.update({ embeds: [embed], components: [row] });
}

async function showSummary(interaction) {

  const s = session.getSession(interaction.user.id);

  const embed = new EmbedBuilder()
    .setTitle('🛍️ Detail Pembelian 🛍️')
    .setColor(0x5865F2)
    .setDescription(
    `📋 **Produk:** Diamond Heartopia\n` +
    `👤 **Username:** ${s.username}\n` +
    `🌍 **Server:** ${s.server}\n` +
    `🔑 **Metode Login:** ${s.loginMethod}\n` +
    `🛒 **Paket:** ${s.package}`
  )
    .setFooter({ text: 'Review your order then click Create Ticket.' });

  const row = new ActionRowBuilder().addComponents(

    new ButtonBuilder()
      .setCustomId('dh_create_ticket')
      .setLabel('Create Ticket')
      .setStyle(ButtonStyle.Success)
      .setEmoji('🎫'),

    new ButtonBuilder()
      .setCustomId('dh_cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Danger)
  );

  return interaction.update({ embeds: [embed], components: [row] });
}

async function createTicket(interaction) {

  const { createTicket: openTicket } = require('../tickets/createTicket');

  const s = session.getSession(interaction.user.id);

  const summary =
`**📋Produk:** 💎 Diamond Heartopia
**👤Username:** ${s.username}
**🌍Server:** ${s.server}
**🔑Metode Login:** ${s.loginMethod}
**🛒Paket:** ${s.package}`;

  const instruction =
  `📌** Instruksi:**
• Pengiriman Diamond melalui via login only
• Mohon standby untuk pengiriman kode login
• Proses di lakukan sesuai antrian ( jika mengantri )
• Selesaikan pembayaran sesuai arahan admin.
• Pastikan username server dan email password kamu sudah benar sebelum admin memproses.
• Setelah selesai, tiket akan ditutup oleh admin.`;
  await openTicket(interaction, {
    orderType: 'Diamond Heartopia',
    categoryKey: 'heartopia',
    summaryText: summary,
    instructionText: instruction
  });

  session.deleteSession(interaction.user.id);
}

module.exports = { showPriceList, handleInteraction };
