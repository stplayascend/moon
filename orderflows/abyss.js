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

const items = require('../data/items');
const session = require('./sessionManager');

const {
  getDisabledItems,
  getEnabledItems
} = require('../database/supabase');

const FLOW = 'ab';


/* ===============================
   LOAD ITEMS (items.js + DB)
================================ */

async function loadItems() {

  const base = items.abyss ?? [];

  const enabledRaw = await getEnabledItems('abyss', 'null');
  const disabledRaw = await getDisabledItems('abyss', 'null');

  // 🔥 normalize disabled
  const disabledSet = new Set(
    disabledRaw.map(v => v.toLowerCase().trim())
  );

  // 🔥 normalize base
  const baseSet = new Set(
    base.map(b => b.value.toLowerCase().trim())
  );

  // 🔥 filter base
  const baseFiltered = base.filter(
    i => !disabledSet.has(i.value.toLowerCase().trim())
  );

  // 🔥 normalize + filter enabled
  const enabled = enabledRaw
    .filter(i => i.value) // safety
    .map(i => ({
      label: i.label,
      value: i.value.toLowerCase().trim()
    }))
    .filter(i => !disabledSet.has(i.value));

  // 🔥 remove duplicates
  const enabledFiltered = enabled.filter(
    e => !baseSet.has(e.value)
  );

  return [...baseFiltered, ...enabledFiltered];
}


/* ===============================
   PRICE LIST
================================ */

async function showPriceList(interaction) {

  await interaction.deferReply({ ephemeral: true });

  const banner = new AttachmentBuilder('./pricing.png', { name: 'pricing.png' });

  const list = await loadItems();

  const embed = new EmbedBuilder()
    .setTitle('🔮Abyss Gift Gamepass Order - Price List')
    .setColor(0x5865F2)
    .setDescription(list.map(i => i.label).join('\n') || '*Unavailable*')
    .setImage('attachment://pricing.png')
    .setFooter({ text: 'MoonBlox • Click Order to proceed' });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('ab_order')
      .setLabel('Order')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('🛒')
  );

  await interaction.editReply({
    embeds: [embed],
    components: [row],
    files: [banner]
  });

}


/* ===============================
   INTERACTION HANDLER
================================ */

async function handleInteraction(interaction) {

  const id = interaction.customId;
  const userId = interaction.user.id;

  if (id === 'ab_order') {
    session.setSession(userId, { flow: FLOW, step: 1 });
    return showUsernameModal(interaction);
  }
  if(id === 'ab_add_yes'){
  return showItemSelect(interaction); // 🔁 loop back
  }
  
  if(id === 'ab_add_no'){
    return showSummary(interaction);
  }
  if (interaction.isModalSubmit() && id === 'ab_username_modal') {
    const username = interaction.fields.getTextInputValue('ab_username');
    session.updateSession(userId, { step: 2, username });
    return showItemSelect(interaction);
  }

  if (id === 'ab_item_select') {

    const selected = interaction.values[0];

    const list = await loadItems();

    const item = list.find(i => i.value === selected);

    const s = session.getSession(userId);

    if(!s.cart) s.cart = [];
    
    s.cart.push(item?.label ?? selected);
    
    session.updateSession(userId, {
      cart: s.cart,
      step: 'add_more'
    });

    return askAddMore(interaction);
  }

  if (id === 'ab_create_ticket') return createTicket(interaction);

  if (id === 'ab_cancel') {

    session.deleteSession(userId);

    return interaction.update({
      content: '❌ Order cancelled.',
      embeds: [],
      components: []
    });
  }

}

async function askAddMore(interaction){

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('ab_add_yes')
      .setLabel('Add More Items')
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId('ab_add_no')
      .setLabel('Continue')
      .setStyle(ButtonStyle.Danger)
  );

  return interaction.update({
    content:'Do you want to add more items?',
    embeds:[],
    components:[row]
  });
}
/* ===============================
   USERNAME MODAL
================================ */

async function showUsernameModal(interaction) {

  const modal = new ModalBuilder()
    .setCustomId('ab_username_modal')
    .setTitle('🔮Abyss Gift Gamepass Order');

  modal.addComponents(
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('ab_username')
        .setLabel('👤Username')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    )
  );

  await interaction.showModal(modal);

}


/* ===============================
   ITEM SELECT
================================ */

async function showItemSelect(interaction) {

  const available = await loadItems();

  if (available.length === 0) {

    return interaction.reply({
      content: '⚠️ No items available right now.',
      ephemeral: true
    });
  }

  const embed = new EmbedBuilder()
    .setTitle('🛍️ Detail Produk 🛍️')
    .setColor(0x5865F2)
    .setDescription('🛒 Pilih item yang di inginkan');

  const select = new StringSelectMenuBuilder()
    .setCustomId('ab_item_select')
    .setPlaceholder('Pilih item...')
    .addOptions(available);

  if (interaction.deferred || interaction.replied) {
  return interaction.followUp({
    embeds: [embed],
    components: [new ActionRowBuilder().addComponents(select)],
    ephemeral: true
  });
  }
  
  if (interaction.isButton() || interaction.isStringSelectMenu()) {
    return interaction.update({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(select)]
    });
  }
  
  return interaction.reply({
    embeds: [embed],
    components: [new ActionRowBuilder().addComponents(select)],
    ephemeral: true
  });

}


/* ===============================
   SUMMARY
================================ */

async function showSummary(interaction) {

  const s = session.getSession(interaction.user.id);

  let itemsText = "";

  (s.cart || []).forEach((item, i)=>{
    itemsText += `\n${i+1}. ${item}`;
  });

  const embed = new EmbedBuilder()
    .setTitle('🛍️ Detail Pembelian 🛍️')
    .setColor(0x5865F2)
    .setDescription(
      `📋 **Produk:** Abyss\n` +
      `👤 **Username:** ${s.username}\n` +
      `🛒 **Items:** ${itemsText}`
    )
    .setFooter({ text: 'Review your order then click Create Ticket.' });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('ab_create_ticket')
      .setLabel('Create Ticket')
      .setStyle(ButtonStyle.Success)
      .setEmoji('🎫'),

    new ButtonBuilder()
      .setCustomId('ab_cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Danger)
  );

  return interaction.update({
    embeds: [embed],
    components: [row]
  });
}


/* ===============================
   CREATE TICKET
================================ */

async function createTicket(interaction) {

  const { createTicket: openTicket } = require('../tickets/createTicket');

  const s = session.getSession(interaction.user.id);

  // ✅ build items text first
  let itemsText = "";

  (s.cart || []).forEach((item, i)=>{
    itemsText += `\n${i+1}. ${item}`;
  });

  // ✅ then create summary
  const summary =
`**📋Produk:** 🔮Abyss
**👤Username:** ${s.username}
**🛒Items:** ${itemsText}`;

  const instruction =
`📌 **Instruksi:**
• Pengiriman Item di Private Server yang kami berikan
• Mohon tunggu admin untuk gift item mu di Ps kami.
• Proses di lakukan sesuai antrian ( jika mengantri )
• Selesaikan pembayaran sesuai arahan admin.
• Pastikan username Roblox kamu sudah benar sebelum admin memproses.
• Setelah selesai, tiket akan ditutup oleh admin.`;

  await openTicket(interaction, {
    orderType: 'Abyss',
    categoryKey: 'games',
    summaryText: summary,
    instructionText: instruction
  });

  session.deleteSession(interaction.user.id);
}

module.exports = { showPriceList, handleInteraction };
