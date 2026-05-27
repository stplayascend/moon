const { getDisabledButtons } = require('../database/supabase');
const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
  PermissionFlagsBits,
} = require('discord.js');

const { buildPanelRows } = require('../utils/panelRows');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('link')
    .setDescription('Deploy the MoonBlox Order Panel in this channel.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    if (!interaction.member.permissions.has('Administrator')) {
      return interaction.reply({
        content: '❌ You are not allowed to use this command.',
        ephemeral: true,
      });
    }

    const disabled = await getDisabledButtons();
    const banner = new AttachmentBuilder('./pricing.png');

    const purchaseEmbed = new EmbedBuilder()
      .setTitle('🛒 MoonBlox Pricelist')
      .setColor(0x2ecc71)
      .setImage('attachment://pricing.png')
      .setDescription(`
Di sini kamu dapat melihat berbagai layanan yang tersedia di Moonblox beserta pricelist lengkapnya.

Silakan klik menu yang kamu inginkan di bawah 👇📜 untuk melihat harga serta detail produk yang tersedia.

🔒 Informasi harga yang kamu buka melalui menu hanya akan terlihat oleh kamu saja.

Setelah menemukan produk yang kamu butuhkan, kamu bisa langsung membuka ticket sesuai kategori 🎫.

💎 Tim Moonblox siap membantu dan memberikan pelayanan terbaik. 🌙✨
`)
      .setFooter({ text: 'MoonBlox Store' });

    const msg = await interaction.channel.send({
      embeds: [purchaseEmbed],
      components: buildPanelRows(disabled),
      files: [banner],
    });

    global.panelData = {
      channelId: msg.channel.id,
      messageId: msg.id,
    };

    await interaction.reply({
      content: '✅ Purchase panel deployed!',
      ephemeral: true,
    });
  },
};
