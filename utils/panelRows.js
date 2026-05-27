const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

const panelButtons = require('../data/panelButtons');

function normalizeDisabledButtons(disabledButtons = []) {
  return disabledButtons.map(button =>
    button.toLowerCase().replace(/\s+/g, '_').trim()
  );
}

function buildPanelRows(disabledButtons = []) {
  const clean = normalizeDisabledButtons(disabledButtons);

  return panelButtons.map(row =>
    new ActionRowBuilder().addComponents(
      row.map(button =>
        new ButtonBuilder()
          .setCustomId(button.id)
          .setLabel(button.label)
          .setStyle(ButtonStyle.Primary)
          .setEmoji(button.emoji)
          .setDisabled(clean.includes(button.id))
      )
    )
  );
}

function getAllPanelButtonIds() {
  return panelButtons.flat().map(button => button.id);
}

module.exports = {
  buildPanelRows,
  getAllPanelButtonIds,
  normalizeDisabledButtons,
};
