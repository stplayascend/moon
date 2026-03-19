const {
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

const config = require('../config');
const { createTicketRecord } = require('../database/supabase');

async function createTicket(interaction, { orderType, categoryKey, summaryText, instructionText }) {

  await interaction.deferReply({ ephemeral: true });

  const guild = interaction.guild;
  const user = interaction.user;

  // ── Category ────────────────────────────────
  const categoryId = config.categories[categoryKey] ?? config.categories.games;

  // ── Prefix Mapping ──────────────────────────
  const categoryPrefixes = {
    robuxLogin: '🛄Rbxvilog',
    robuxGamepass: '💳rbxdelay',
    robuxGroupPayout: '👨‍👨‍👦‍👦Payout',

    fishit: '🎮Gamepass',
    fishitBoost: '🍀boostx8',
    forge: '🎮Gamepass',
    abyss: '🎮Gamepass',
    sawah: '🎮Gamepass',
    game: '🎮Gamepass',

    heartopia: '💎heartopia'
  };

  // ── Username cleanup ────────────────────────
  const safeName = user.username
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 20);

  // ── Prefix Logic (FIXED) ────────────────────
  let prefix = categoryPrefixes[categoryKey];

  if (!prefix && categoryKey === 'games') {
    const type = orderType.toLowerCase().replace(/\s+/g, '');

    if (type.includes('fishitx8') || type.includes('boost')) {
      prefix = '🍀boostx8';
    } 
    else if (type.includes('fishit') || type.includes('fistit')) {
      prefix = '🎮Gamepass';
    } 
    else if (type.includes('forge')) {
      prefix = '🎮Gamepass';
    } 
    else if (type.includes('abyss')) {
      prefix = '🎮Gamepass';
    } 
    else if (type.includes('sawah')) {
      prefix = '🎮Gamepass';
    } 
    else if (type.includes('game')) {
      prefix = '🎮Gamepass';
    } 
    else {
      prefix = '🎮game';
    }
  }

  prefix = prefix || 'order';

  const ticketId = `${prefix}-${safeName}-${Date.now().toString(36)}`;
  const channelName = `${prefix}-${safeName}`;

  // ── Permissions ─────────────────────────────
  const overwrites = [
    {
      id: guild.id,
      deny: [PermissionFlagsBits.ViewChannel],
    },
    {
      id: user.id,
      allow: [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.ReadMessageHistory,
      ],
    },
    ...(config.adminRoleId
      ? [{
          id: config.adminRoleId,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
            PermissionFlagsBits.ManageChannels,
          ],
        }]
      : []),
  ];

  // ── Extra Role ──────────────────────────────
  let extraRole = null;

  switch (categoryKey) {
    case 'robuxLogin':
      extraRole = config.robuxLoginRoleId;
      break;

    case 'robuxGamepass':
      extraRole = config.robuxGamepassRoleId;
      break;

    case 'robuxGroupPayout':
      extraRole = config.robuxPayoutRoleId;
      break;

    case 'heartopia':
      extraRole = null; // no extra role
      break;

    case 'games':
    default:
      extraRole = config.gamesAdminRoleId;
      break;
  }

  if (extraRole && extraRole !== config.adminRoleId) {
    overwrites.push({
      id: extraRole,
      allow: [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.ReadMessageHistory,
      ],
    });
  }

  // ── Create Channel ──────────────────────────
 const openedAt = new Date().toISOString();

// ── Create Channel ──────────────────────────
let channel;

try {
  channel = await guild.channels.create({
    name: channelName,
    type: ChannelType.GuildText,
    parent: categoryId || undefined,
    permissionOverwrites: overwrites,
    topic: JSON.stringify({
      openedAt,
      userId: user.id
    })
  });
} catch (err) {
  console.error('[createTicket] Failed:', err);

  return interaction.editReply({
    content: '❌ Failed to create ticket channel.',
  });
}
  // ── Save DB ────────────────────────────────
  try {
    await createTicketRecord({
      ticketId,
      channelId: channel.id,
      userId: user.id,
      username: user.username,
      orderType,
      summary: summaryText,
      openedAt
    });
  } catch (err) {
    console.error('[Supabase error]:', err);
  }

  // ── Embed ──────────────────────────────────
  const welcomeEmbed = new EmbedBuilder()
    .setTitle('🎫 MoonBlox – Tiket Dibuka')
    .setColor(0x5865F2)
    .setDescription(
      `🌙 Halo Moonguards! <@${user.id}> 👋\n\n` +
      '**🛍️Ringkasan Pesanan:**\n' +
      summaryText.trim() +
      '\n\n💳 **PEMBAYARAN**\n' +
      '- `/payment` untuk QR / Bank / E-Wallet\n' +
      '**PEMBAYARAN VIA QR ADA FEE\n\n **'+
      (instructionText ||
      '📌 **Instruksi:**\n' +
      '• Ikuti arahan admin\n' +
      '• Standby selama proses'
    )
    )
    .setFooter({ text: `Ticket ID: ${ticketId}` })
    .setTimestamp();

  const closeRow = new ActionRowBuilder().addComponents(  
    new ButtonBuilder()
      .setCustomId('ticket_close')
      .setLabel('Close Ticket')
      .setStyle(ButtonStyle.Danger)
      .setEmoji('🔒')
  );

  // ── Send Message ───────────────────────────
  const mentions = [
    `<@${user.id}>`,
    config.adminRoleId ? `<@&${config.adminRoleId}>` : '',
    extraRole ? `<@&${extraRole}>` : ''
  ].join(' ');

  await channel.send({
    content: mentions,
    embeds: [welcomeEmbed],
    components: [closeRow],
    allowedMentions: {
      users: [user.id],
      roles: [
        ...(config.adminRoleId ? [config.adminRoleId] : []),
        ...(extraRole ? [extraRole] : [])
      ]
    }
  });

  // ── Reply ──────────────────────────────────
  await interaction.editReply({
    content: `✅ Ticket created → ${channel}`,
  });
}

module.exports = { createTicket };