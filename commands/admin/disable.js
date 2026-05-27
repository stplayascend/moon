const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { disableItem } = require('../../database/supabase');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('disable')
    .setDescription('Disable a shop item')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    .addStringOption(o =>
      o.setName('game')
        .setDescription('Select game')
        .setRequired(true)
        .addChoices(
          { name: 'FishIt',            value: 'fishit' },
          { name: 'FishIt Boost',      value: 'fishitBoost' },
          { name: 'Forge',             value: 'forge' },
          { name: 'Abyss',             value: 'abyss' },
          { name: 'Sawah Indo',        value: 'sawahIndo' },
          { name: 'Kick a Lucky Block',value: 'kickLuckyBlock' },
          { name: 'Discord Nitro',     value: 'discordNitro' },
          { name: 'Robux Username',    value: 'robuxUsername' },
          { name: 'Slime RNG',         value: 'slimeRng' },
          { name: 'Survive The Apocalypse', value: 'surviveApocalypse' },
          { name: 'Drag Drive Simulator', value: 'dragDriveSimulator' },
          { name: 'Dragon Adventures', value: 'dragonAdventures' }
        )
    )

    .addStringOption(o =>
      o.setName('category')
        .setDescription('Category')
        .setRequired(true)
        .setAutocomplete(true)
    )

    .addStringOption(o =>
      o.setName('item')
        .setDescription('Item')
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async execute(interaction) {

    const game = interaction.options.getString('game');
    const category = interaction.options.getString('category');
    const item = interaction.options.getString('item');

    await disableItem(game, category, item);

    await interaction.reply({
      content: `❌ Disabled **${item}**`,
      ephemeral: true
    });
  }
};
