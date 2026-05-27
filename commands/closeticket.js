const { SlashCommandBuilder } = require('discord.js');

const { handleClose } = require('../tickets/closeTicket');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('closeticket')
    .setDescription('Close the current ticket'),

  async execute(interaction) {
    return handleClose(interaction);
  },
};
