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

function buildPanelRows(disabledButtons = [], removedButtons = []) {
  const disabledClean = normalizeDisabledButtons(disabledButtons);
  const removedClean = normalizeDisabledButtons(removedButtons);

  return panelButtons
    .map(row => row.filter(button => !removedClean.includes(button.id)))
    .filter(row => row.length > 0)
    .map(row =>
      new ActionRowBuilder().addComponents(
        row.map(button =>
          new ButtonBuilder()
            .setCustomId(button.id)
            .setLabel(button.label)
            .setStyle(ButtonStyle.Primary)
            .setEmoji(button.emoji)
            .setDisabled(disabledClean.includes(button.id))
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
