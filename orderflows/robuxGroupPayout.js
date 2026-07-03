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

const FLOW = 'rgp';

// ADD THESE:
const RATES = {
  po: 115,
  ready: 120
};

const CATEGORY_LABELS = {
  po: 'PO/Booked',
  ready: 'Ready'
};

function formatIDR(amount) {
  return Math.round(amount).toLocaleString('id-ID');
}
async function showPriceList(interaction) {

  const banner = new AttachmentBuilder('./pricing.png');

  const embed = new EmbedBuilder()
    .setTitle('⚡ Robux Via Group Payout – Price List')
    .setColor(0x57F287)
    .setDescription(`
⚡ **Robux Via Group Payout PO/Booked – Price List**
⏣ **100 Rbx** - 11.500 💰
⏣ **500 Rbx** - 57.500 💰
⏣ **1.000 Rbx** - 115.000 💰
⏣ **10.000 Rbx** - 1.150.000 💰
**Rate:** 115 / ⏣1

⚡ **Robux Via Group Payout Ready – Price List**
⏣ **100 Rbx** - 12.000 💰
⏣ **500 Rbx** - 60.000 💰
⏣ **1.000 Rbx** - 120.000 💰
⏣ **10.000 Rbx** - 1.200.000 💰
**Rate:** 120 / ⏣1

📌 **Requirements**
- Wajib berada di group minimal **2 minggu**
- Robux masuk **instant tanpa delay** (jika sudah 2 minggu di group)

🔗 Join group:
https://www.roblox.com/communities/716400201/Moonbloomie
https://www.roblox.com/communities/634467947/Moonie-Studio

**Cara membeli:**
✅Check ketersediaan akun di 🤖〢bot-command, ketik \`/payout\` username
Jika belum 2 minggu/not eligible silahkan tunggu sampai akun bisa di kirim payout.
✅Jika buyer memesan robux via group payout pada saat payout sedang tidak ready, buyer akan mengikuti harga rate 115 (lebih murah)
✅Pergantian rate normal dari 115 > 120
✅Robux via group payout bersikap fleksibel, bisa berapapun robux nya sesuai yang kalian inginkan (tidak terpaku pada pricelist)
`)
    .setImage('attachment://pricing.png')
    .setFooter({ text: 'MoonBlox • Click Order to proceed' })
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('rgp_order_po')
      .setLabel('Order PO/Booked')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('🛒'),
    new ButtonBuilder()
      .setCustomId('rgp_order_ready')
      .setLabel('Order Ready')
      .setStyle(ButtonStyle.Success)
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

  const id = interaction.customId;
  const userId = interaction.user.id;

   if (id === 'rgp_order_po' || id === 'rgp_order_ready') {
      const category = id === 'rgp_order_po' ? 'po' : 'ready';
      session.setSession(userId, { flow: FLOW, step: 1, category });
      return showModal(interaction, category);
    }

  if (interaction.isModalSubmit() && interaction.customId === 'rgp_modal') {

    const username = interaction.fields.getTextInputValue('rgp_username');
    const amount = interaction.fields.getTextInputValue('rgp_amount');

    session.updateSession(userId, {
      step: 2,
      username,
      amount
    });

    return showSummary(interaction);
  }

  if (id === 'rgp_create_ticket') return createTicket(interaction);

  if (id === 'rgp_cancel') {
    session.deleteSession(userId);

    return interaction.update({
      content: '❌ Order cancelled.',
      embeds: [],
      components: []
    });
  }
}

async function showModal(interaction, category) {

  const modal = new ModalBuilder()
    .setCustomId('rgp_modal')
    .setTitle(`⚡Robux Payout (${CATEGORY_LABELS[category]})`);

  modal.addComponents(
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('rgp_username')
        .setLabel('👤 Username')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('rgp_amount')
        .setLabel('💰Jumlah Robux:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder('e.g. 1000')
    )
  );

  await interaction.showModal(modal);
}

async function showSummary(interaction) {

const s = session.getSession(interaction.user.id);
  const rate = RATES[s.category];
  const total = Number(s.amount) * rate;

  const embed = new EmbedBuilder()
    .setTitle('🛍️ Detail Pembelian 🛍️y')
    .setColor(0x5865F2)
    .setDescription(
    `📄 **Produk:** ⚡ Robux Via Group Payout (${CATEGORY_LABELS[s.category]})\n` +
    `👤 **Username:** ${s.username}\n` +
    `💰 **Jumlah Robux:** ${s.amount}\n` +
    `📊 **Rate:** ${rate} / ⏣1\n` +
    `💵 **Total:** ${formatIDR(total)} 💰`
  )
    .setFooter({
      text: '⚠️ Pastikan sudah di dalam group community selama 2+ minggu!'
    });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('rgp_create_ticket')
      .setLabel('Create Ticket')
      .setStyle(ButtonStyle.Success)
      .setEmoji('🎫'),
    new ButtonBuilder()
      .setCustomId('rgp_cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Danger)
  );

  return interaction.reply({
    embeds: [embed],
    components: [row],
    ephemeral: true
  });
}

async function createTicket(interaction) {

  const { createTicket: openTicket } = require('../tickets/createTicket');

  const s = session.getSession(interaction.user.id);
  const rate = RATES[s.category];
  const total = Number(s.amount) * rate;

  const summary = `
**📋Produk:** Robux Via Group Payout (${CATEGORY_LABELS[s.category]})
**👤Username:** ${s.username}
**💰Jumlah Robux:** ${s.amount} Robux
**📊Rate:** ${rate} / ⏣1
**💵Total:** ${formatIDR(total)} 💰
`;
 const instruction =
  `📌 **Instruksi:**
• Robux via Group payout instant tanpa delay.
• Pastikan sudah 2 minggu di dalam group
• Selesaikan pembayaran sesuai arahan admin.
• Pastikan username Roblox kamu sudah benar sebelum admin memproses.
• Setelah selesai, tiket akan ditutup oleh admin.`;

  await openTicket(interaction, {
    orderType: 'Robux Via Group Payout',
    categoryKey: 'robuxGroupPayout',
    summaryText: summary,
    instructionText: instruction
  });

  session.deleteSession(interaction.user.id);
}

module.exports = {
  showPriceList,
  handleInteraction
};
