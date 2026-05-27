const fs = require('fs');
const path = require('path');

const {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require('discord.js');

const config = require('../config');

function getTicketMeta(channel) {
  try {
    return JSON.parse(channel.topic || '{}');
  } catch {
    return {};
  }
}

function getPaymentQrPath() {
  const configuredPath = config.paymentQrImagePath || 'payment-qr.png';

  return path.isAbsolute(configuredPath)
    ? configuredPath
    : path.resolve(__dirname, '..', configuredPath);
}

async function sendPaymentInstructions(channel, user) {
  const paymentEmbed = new EmbedBuilder()
    .setTitle('💳 Payment Information')
    .setColor(0x5865F2)
    .setDescription(
`**Bank Transfer**
BCA 7425163001 AN Revina A

**E-Wallet**
Dana - 085283960141 AN Yani M.

**FEE QRIS**
💵 0 - 500.000 = Rp.500
💵 500.001 - 1.000.000 = Rp.2000
💵 1.000.001 - 5.000.000 = Rp.5000
💵 5.000.001 - seterusnya = Rp.10.000

**FEE QRIS WAJIB DI BAYAR**`
    );

  await channel.send({ embeds: [paymentEmbed] });

  const qrPath = getPaymentQrPath();

  if (fs.existsSync(qrPath)) {
    await channel.send({
      files: [new AttachmentBuilder(qrPath)],
    });
  } else {
    console.warn(`[paymentFlow] QR image not found at ${qrPath}`);
  }

  const paymentDoneRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('payment_done')
      .setLabel('Payment Done')
      .setStyle(ButtonStyle.Success)
  );

  await channel.send({
    content: `Hey <@${user.id}> Once you complete your payment click here`,
    components: [paymentDoneRow],
    allowedMentions: { users: [user.id] },
  });
}

async function handlePaymentDone(interaction) {
  const ticketMeta = getTicketMeta(interaction.channel);
  const ownerUserId = config.ownerUserId;

  if (!ticketMeta.userId || interaction.user.id !== ticketMeta.userId) {
    return interaction.reply({
      content: '❌ Only the ticket buyer can use this button.',
      ephemeral: true,
    });
  }

  const disabledRow = ActionRowBuilder.from(interaction.message.components[0]);
  disabledRow.components[0].setDisabled(true);

  await interaction.update({
    components: [disabledRow],
  });

  const verifyRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('payment_verify')
      .setLabel('Verify')
      .setStyle(ButtonStyle.Primary)
  );

  if (ownerUserId) {
    await interaction.channel.send({
      content: `Hey <@${ownerUserId}> the Buyer has completed the payment`,
      components: [verifyRow],
      allowedMentions: { users: [ownerUserId] },
    });

    try {
      const ownerUser = await interaction.client.users.fetch(ownerUserId);
      const ticketUrl = `https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}`;

      await ownerUser.send(
        `Hey Moon, the Buyer has completed the payment in the ticket:\n${ticketUrl}`
      );
    } catch (error) {
      console.error('[paymentFlow] Failed to DM owner:', error);
    }
  } else {
    await interaction.channel.send({
      content: '⚠️ OWNER_USER_ID is not configured, so no owner was notified.',
    });
  }
}

async function handlePaymentVerify(interaction) {
  const ownerUserId = config.ownerUserId;
  const ticketMeta = getTicketMeta(interaction.channel);

  if (!ownerUserId || interaction.user.id !== ownerUserId) {
    return interaction.reply({
      content: '❌ Only Moon can verify this payment.',
      ephemeral: true,
    });
  }

  const disabledRow = ActionRowBuilder.from(interaction.message.components[0]);
  disabledRow.components[0].setDisabled(true);

  await interaction.update({
    components: [disabledRow],
  });

  if (ticketMeta.userId) {
    await interaction.channel.send({
      content:
        `Hey <@${ticketMeta.userId}> Your purchase is successful\n` +
        'Please wait until the admin proccesses your items',
      allowedMentions: { users: [ticketMeta.userId] },
    });
  }
}

module.exports = {
  sendPaymentInstructions,
  handlePaymentDone,
  handlePaymentVerify,
};
