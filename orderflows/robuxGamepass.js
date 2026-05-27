const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  AttachmentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} = require('discord.js');

const items = require('../data/items');
const session = require('./sessionManager');

const FLOW = 'rg';

/* ──────────────────────────────────────────────
   Helper: send next step
────────────────────────────────────────────── */

async function sendStep(interaction, data) {

  const { MessageFlags } = require('discord.js');

  const payload = {
    ...data,
    flags: MessageFlags.Ephemeral
  };

  if (!interaction.deferred && !interaction.replied) {
    await interaction.deferReply({
      flags: MessageFlags.Ephemeral
    });
    return interaction.editReply(payload);
  }

  return interaction.followUp(payload);
}

/* ──────────────────────────────────────────────
   Disable Buttons Safely
────────────────────────────────────────────── */

async function disableButtons(interaction) {

  if (!interaction.message) return;

  try {

    const rows = interaction.message.components.map(row => {

      const newRow = new ActionRowBuilder();

      row.components.forEach(component => {
        newRow.addComponents(
          ButtonBuilder.from(component).setDisabled(true)
        );
      });

      return newRow;
    });

    await interaction.message.edit({ components: rows });

  } catch (err) {
    // Ignore message edit errors
  }
}

/* ──────────────────────────────────────────────
   Price List
────────────────────────────────────────────── */

const { MessageFlags } = require('discord.js');

async function showPriceList(interaction) {

  // ✅ Since it's a BUTTON → use deferUpdate
  await interaction.deferUpdate();

  const banner = new AttachmentBuilder('./pricing.png');

  const embed = new EmbedBuilder()
    .setTitle('🧳 Robux Via Gamepass 5Day Delay Pricelist')
    .setColor(0x5865F2)
    .setDescription(`
🏷️BEFORE TAX🏷️
100 Rbx — 💵8.500
500 Rbx — 💵42.500
1.000 Rbx — 💵85.000
10.000 Rbx — 💵850.000

📌Nominal lain Rate 85, cara hitung : jumlah robux yang ingin di beli x 85 = Harga

🏷️AFTER TAX🏷️
100 Rbx — 💵13.000
500 Rbx — 💵65.000
1.000 Rbx — 💵130.000
10.000 Rbx — 💵1.300.000

📌Nominal lain Rate 130, cara hitung : jumlah robux yang ingin di beli x 130 = Harga

⚠️PEMBELIAN ROBUX VIA GAMEPASS MEMILIKI 5DAY DELAY⚠️
`)
    .setImage('attachment://pricing.png')
    .setFooter({ text: 'MoonBlox • Click Order to proceed' });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('rg_order')
      .setLabel('Order')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('🛒')
  );

  // ✅ Send new message instead of editReply
  await interaction.followUp({
    embeds: [embed],
    components: [row],
    files: [banner],
    flags: MessageFlags.Ephemeral
  });
}

/* ──────────────────────────────────────────────
   Order Modal
────────────────────────────────────────────── */

async function showOrderModal(interaction) {

  const modal = new ModalBuilder()
    .setCustomId('rg_order_modal')
    .setTitle('🧳 Robux Via Gamepass Order');

  const usernameInput = new TextInputBuilder()
    .setCustomId('rg_username')
    .setLabel('👤 Username')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const amountInput = new TextInputBuilder()
    .setCustomId('rg_amount')
    .setLabel('💰Jumlah Robux')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  modal.addComponents(
    new ActionRowBuilder().addComponents(usernameInput),
    new ActionRowBuilder().addComponents(amountInput)
  );

  return interaction.showModal(modal);
}

/* ──────────────────────────────────────────────
   Interaction Router
────────────────────────────────────────────── */

async function handleInteraction(interaction) {

  const userId = interaction.user.id;

  /* BUTTON INTERACTIONS */

  if (interaction.isButton()) {

    const id = interaction.customId;

    /* ORDER BUTTON */

    if (id === 'rg_order') {

      session.setSession(userId, { flow: FLOW, step: 1 });

      return showOrderModal(interaction);
    }

    /* TAX BUTTONS */

    if (id === 'rg_tax_before' || id === 'rg_tax_after') {

      await disableButtons(interaction);

      const tax = id.replace('rg_tax_', '');

      const taxLabel =
        items.robuxGamepassTaxOptions.find(t => t.value === tax)?.label ?? tax;

      session.updateSession(userId, {
        step: 4,
        tax: taxLabel
      });

      return showSummary(interaction);
    }

    /* CREATE TICKET */

    if (id === 'rg_create_ticket') {

      await disableButtons(interaction);

      return createTicket(interaction);
    }

    /* CANCEL */

    if (id === 'rg_cancel') {

      await disableButtons(interaction);

      session.deleteSession(userId);

      return sendStep(interaction, {
        content: '❌ Order cancelled.',
        embeds: [],
        components: []
      });
    }
  }

  /* MODAL SUBMIT */

  if (interaction.isModalSubmit() && interaction.customId === 'rg_order_modal') {

    const username = interaction.fields.getTextInputValue('rg_username').trim();
    const amount = interaction.fields.getTextInputValue('rg_amount').trim();

    session.updateSession(userId, {
      flow: FLOW,
      step: 3,
      username,
      amount
    });

    return showStep3(interaction);
  }
}

/* ──────────────────────────────────────────────
   Step 3 (UNCHANGED)
────────────────────────────────────────────── */

async function showStep3(interaction) {

  const embed = new EmbedBuilder()
    .setColor(0x5865F2)
    .setDescription(' ⚠️ Pilih jenis pembelian robux Before tax / After tax ⚠️');

  const row = new ActionRowBuilder().addComponents(

    new ButtonBuilder()
      .setCustomId('rg_tax_before')
      .setLabel('⚖️Before Tax')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId('rg_tax_after')
      .setLabel('⚖️After Tax')
      .setStyle(ButtonStyle.Primary)
  );

  return sendStep(interaction, { embeds: [embed], components: [row] });
}

/* ──────────────────────────────────────────────
   Summary
────────────────────────────────────────────── */

async function showSummary(interaction) {

  const s = session.getSession(interaction.user.id);

  const embed = new EmbedBuilder()
    .setTitle('🛍️ Detail Pembelian 🛍️')
    .setColor(0x5865F2)
    .setDescription(
    `📋 **Produk:** Robux Via Gamepass\n` +
    `👤 **Username:** ${s.username}\n` +
    `💰 **Jumlah Robux:** ${s.amount}\n` +
    `⚖️ **Opsi Tax:** ${s.tax}\n` +
    `🚚 **Estimasi:** ⏳ 5 hari`
  )
    .setFooter({ text: 'Review your order then click Create Ticket.' });

  const row = new ActionRowBuilder().addComponents(

    new ButtonBuilder()
      .setCustomId('rg_create_ticket')
      .setLabel('Create Ticket')
      .setStyle(ButtonStyle.Success)
      .setEmoji('🎫'),

    new ButtonBuilder()
      .setCustomId('rg_cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Danger)
  );

  return interaction.update({ embeds: [embed], components: [row] });
}

/* ──────────────────────────────────────────────
   Create Ticket
────────────────────────────────────────────── */

async function createTicket(interaction) {

  const { createTicket: openTicket } = require('../tickets/createTicket');

  const s = session.getSession(interaction.user.id);

  const summary =
`**📋Produk** Robux Via Gamepass 5Day Delay
**👤Username** ${s.username}
**💰Jumlah Robux:** ${s.amount}
**⚖️Opsi tax:** ${s.tax}
**🚚 Estimasi Robux terkirim :** 5 Hari`;

  const instruction =
  `📌** Instruksi:**
• Robux via Gamepass memiliki delay 5 hari masuk ke dalam akunmu.
• Selesaikan pembayaran sesuai arahan admin.
• Pastikan username Roblox kamu sudah benar sebelum admin memproses.
• Setelah selesai, tiket akan ditutup oleh admin.`;
  await openTicket(interaction, {
    orderType: 'Robux Via Gamepass',
    categoryKey: 'robuxGamepass',
    summaryText: summary,
    instructionText: instruction
  });

  session.deleteSession(interaction.user.id);
}

module.exports = {
  showPriceList,
  handleInteraction
};
