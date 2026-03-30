const { getDisabledButtons } = require('../database/supabase');
const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('link')
    .setDescription('Deploy the MoonBlox Order Panel in this channel.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const disabled = await getDisabledButtons();
    const clean = disabled;
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

    // Row 1
    const row1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('robux_login')
        .setLabel('Robux Via Login')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('🔐')
        .setDisabled(clean.includes('robux_login')),

      new ButtonBuilder()
        .setCustomId('robux_gamepass')
        .setLabel('Robux Via Gamepass')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('⏳')
        .setDisabled(clean.includes('robux_gamepass')),

      new ButtonBuilder()
        .setCustomId('robux_group')
        .setLabel('Robux Via Group Payout')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('⚡')
        .setDisabled(clean.includes('robux_group'))
    );

    // Row 2
    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('fishit')
        .setLabel('Fish It')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('🐟')
        .setDisabled(clean.includes('fishit')),

      new ButtonBuilder()
        .setCustomId('boost_fishit')
        .setLabel('Boost x8 Fish It')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('🍀')
        .setDisabled(clean.includes('boost_fishit')),

      new ButtonBuilder()
        .setCustomId('forge')
        .setLabel('The Forge')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('⛏')
        .setDisabled(clean.includes('forge'))
    );

    // Row 3
    const row3 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('abyss')
        .setLabel('Abyss')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('🔮')
        .setDisabled(clean.includes('abyss')),

      new ButtonBuilder()
        .setCustomId('sawah')
        .setLabel('Sawah Indo')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('🌾')
        .setDisabled(clean.includes('sawah')),

      new ButtonBuilder()
        .setCustomId('game_lain')
        .setLabel('Game Lain')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('🎮')
        .setDisabled(clean.includes('game_lain'))
    );

    // Row 4
    const row4 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('heartopia')
        .setLabel('Diamond Heartopia')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('💎')
        .setDisabled(clean.includes('heartopia'))
    );

    const msg = await interaction.channel.send({
    embeds: [purchaseEmbed],
    components: [row1, row2, row3, row4],
    files: [banner]
    });
    global.panelData = {
    channelId: msg.channel.id,
    messageId: msg.id
  };
    await interaction.reply({
      content: '✅ Purchase panel deployed!',
      ephemeral: true
    });

  },
};
