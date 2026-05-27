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

async function showPriceList(interaction) {

  const banner = new AttachmentBuilder('./pricing.png');

  const embed = new EmbedBuilder()
    .setTitle('⚡ Robux Via Group Payout – Price List')
    .setColor(0x57F287)
    .setDescription(`
⏣ **100 Rbx** - 11.500 💰
⏣ **500 Rbx** - 57.500 💰
⏣ **1.000 Rbx** - 115.000 💰
⏣ **10.000 Rbx** - 1.150.000 💰

**Rate:** 115 / ⏣1

📌 **Requirements**
• Wajib berada di group minimal **2 minggu**
• Robux masuk **instant tanpa delay** (jika sudah 2 minggu di group)

🔗 Join group:
https://www.roblox.com/communities/716400201/Moonbloomie\n
✅Check ketersediaan akun di \nhttps://discord.com/channels/1435168751158038700/1435168759039000708 \nJika belum 2 minggu/not eligible silahkan tunggu sampai akun bisa di kirim payout.
`)
    .setImage('attachment://pricing.png')
    .setFooter({ text: 'MoonBlox • Click Order to proceed' })
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('rgp_order')
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

  const id = interaction.customId;
  const userId = interaction.user.id;

  if (id === 'rgp_order') {
    session.setSession(userId, { flow: FLOW, step: 1 });
    return showModal(interaction);
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

async function showModal(interaction) {

  const modal = new ModalBuilder()
    .setCustomId('rgp_modal')
    .setTitle('⚡Robux Via Group Payout');

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

  const embed = new EmbedBuilder()
    .setTitle('🛍️ Detail Pembelian 🛍️y')
    .setColor(0x5865F2)
    .setDescription(
    `📄 **Produk:** ⚡ Robux Via Group Payout\n` +
    `👤 **Username:** ${s.username}\n` +
    `💰 **Jumlah Robux:** ${s.amount}`
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

  const summary = `
**📋Produk:** Robux Via Group Payout
**👤Username:** ${s.username}
**💰Jumlah Robux:** ${s.amount} Robux
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
