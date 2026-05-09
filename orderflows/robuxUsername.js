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

const { getDisabledItems, getEnabledItems } = require('../database/supabase');
const items   = require('../data/items');
const session = require('./sessionManager');

const FLOW = 'ru';

/* ───────────────────────────────────── */

async function loadPackages() {
  const base        = items.robuxUsernamePackages ?? [];
  const disabledRaw = await getDisabledItems('robuxUsername', 'packages');
  const enabledRaw  = await getEnabledItems('robuxUsername', 'packages');

  const disabledSet = new Set(disabledRaw.map(v => v.toLowerCase().trim()));

  const enabled = enabledRaw
    .map(i => ({ label: i.label, value: i.value.toLowerCase().trim() }))
    .filter(e => !disabledSet.has(e.value));

  const baseFiltered = base.filter(
    i => !disabledSet.has(i.value.toLowerCase().trim())
  );

  const enabledFiltered = enabled.filter(
    e => !base.some(b => b.value.toLowerCase().trim() === e.value)
  );

  return [...baseFiltered, ...enabledFiltered];
}
async function buildPriceEmbed() {
  const available = await loadPackages();

  const embed = new EmbedBuilder()
    .setTitle('🎮 Robux Via Username – Price List')
    .setColor(0x5865F2)
    .setImage('attachment://pricing.png')
    .setFooter({ text: 'MoonBlox • Click Order to proceed' })
    .setTimestamp();

  let desc = 'Rate: **110 / ⏣1**\n\n';

  available.forEach(p => {
    desc += `⏣ ${p.label}\n`;
  });

  embed.setDescription(desc);

  return embed;
}
/* ───────────────────────────────────── */

async function showPriceList(interaction) {  
  const banner = new AttachmentBuilder('./pricing.png');
  const embed = await buildPriceEmbed();
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('ru_order')
      .setLabel('Order')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('🛒')
  );

  await interaction.deferReply({ flags: 64 });
  await interaction.editReply({ embeds: [embed], components: [row], files: [banner] });
}

/* ───────────────────────────────────── */

async function handleInteraction(interaction) {
  const id     = interaction.customId;
  const userId = interaction.user.id;

  /* ── Order clicked → confirm understanding ── */
  if (id === 'ru_order') {
    session.setSession(userId, { flow: FLOW, step: 1 });
    return showStep1(interaction);
  }

  /* ── Step 1: understood? ── */
  if (id === 'ru_s1_yes') {
    session.updateSession(userId, { step: 2 });
    return showUsernameModal(interaction);
  }

  if (id === 'ru_s1_no') {
    session.deleteSession(userId);
    return replaceStep(interaction, {
      content: '❌ Order cancelled.',
      embeds: [],
      components: []
    });
  }

  /* ── Username modal submitted ── */
  if (interaction.isModalSubmit() && id === 'ru_username_modal') {
    const username = interaction.fields.getTextInputValue('ru_username');
    session.updateSession(userId, { step: 3, username });
    return showPackageSelect(interaction);
  }

  /* ── Package selected ── */
  if (id === 'ru_package_select') {
    const selected = interaction.values[0];
    const pkgs     = await loadPackages();
    const pkg      = pkgs.find(p => p.value === selected);

    session.updateSession(userId, { step: 4, package: pkg?.label ?? selected });
    return showSummary(interaction);
  }

  if (id === 'ru_create_ticket') return createTicket(interaction);

  if (id === 'ru_cancel') {
    session.deleteSession(userId);
    return replaceStep(interaction, {
      content: '❌ Order cancelled.',
      embeds: [],
      components: []
    });
  }
}

/* ───────────────────────────────────── */

async function sendStep(interaction, data) {
  return interaction.update(data);
}
async function replaceStep(interaction, data) {
  return interaction.update({ ...data, ephemeral: true });
}

/* ───────────────────────────────────── */

async function showStep1(interaction) {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('ru_s1_yes')
      .setLabel('✅ Ya')
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId('ru_s1_no')
      .setLabel('❌ Tidak')
      .setStyle(ButtonStyle.Danger)
  );

  const embed = await buildPriceEmbed();

return sendStep(interaction, {
  embeds: [embed],
  components: [row]
});
}

/* ───────────────────────────────────── */

async function showUsernameModal(interaction) {
  const modal = new ModalBuilder()
    .setCustomId('ru_username_modal')
    .setTitle('🎮 Robux Via Username – Order');

  modal.addComponents(
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('ru_username')
        .setLabel('👤 Username Roblox')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder('Masukkan username Roblox kamu...')
    )
  );

  await interaction.showModal(modal);
}

/* ───────────────────────────────────── */

async function showPackageSelect(interaction) {
  const available = await loadPackages();

  if (available.length === 0) {
    const payload = {
      content: '⚠️ No packages available right now.',
      embeds: [],
      components: [],
      ephemeral: true
    };
    if (interaction.replied || interaction.deferred)
      return interaction.followUp(payload);
    return interaction.reply(payload);
  }

  const embed = await buildPriceEmbed();
  const select = new StringSelectMenuBuilder()
    .setCustomId('ru_package_select')
    .setPlaceholder('Pilih paket...')
    .addOptions(available);

return interaction.update({
  embeds: [embed],
  components: [new ActionRowBuilder().addComponents(select)]
});
}

/* ───────────────────────────────────── */

async function showSummary(interaction) {
  const s = session.getSession(interaction.user.id);

  const embed = new EmbedBuilder()
    .setTitle('🛍️ Detail Pembelian 🛍️')
    .setColor(0x5865F2)
    .setDescription(
      `📋 **Produk:** Robux Via Username\n` +
      `👤 **Username:** ${s.username}\n` +
      `📦 **Paket:** ${s.package}`
    );

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('ru_create_ticket')
      .setLabel('Create Ticket')
      .setStyle(ButtonStyle.Success)
      .setEmoji('🎫'),

    new ButtonBuilder()
      .setCustomId('ru_cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Danger)
  );

  return replaceStep(interaction, { embeds: [embed], components: [row] });
}

/* ───────────────────────────────────── */

async function createTicket(interaction) {
  const { createTicket: openTicket } = require('../tickets/createTicket');
  const s = session.getSession(interaction.user.id);

  const summary =
`**📋 Produk:** Robux Via Username
**👤 Username:** ${s.username}
**📦 Paket yang di pesan:** ${s.package}`;

  const instruction =
`📌 **Instruksi:**
• Pengiriman Robux dilakukan via Gamepass sesuai username
• Mohon standby dan pastikan username yang dimasukkan sudah benar
• Proses dilakukan sesuai antrian (jika mengantri)
• Selesaikan pembayaran sesuai arahan admin
• Setelah selesai, tiket akan ditutup oleh admin`;

  await openTicket(interaction, {
    orderType:       'Robux Via Username',
    categoryKey:     'robuxUsername',
    summaryText:     summary,
    instructionText: instruction
  });

  session.deleteSession(interaction.user.id);
}

/* ───────────────────────────────────── */

module.exports = { showPriceList, handleInteraction };
