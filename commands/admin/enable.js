const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const items = require('../../data/items');

const { 
  enableItem, 
  addEnabledItem 
} = require('../../database/supabase');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('enable')
    .setDescription('Enable a shop item')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    .addStringOption(o =>
      o.setName('game')
        .setDescription('Game')
        .setRequired(true)
        .addChoices(
          { name: 'FishIt', value: 'fishit' },
          { name: 'FishIt Boost', value: 'fishitBoost' },
          { name: 'Forge', value: 'forge' },
          { name: 'Abyss', value: 'abyss' },
          { name: 'Sawah Indo', value: 'sawahIndo' }
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
        .setDescription('Item name')
        .setRequired(true)
    ),

  async execute(interaction) {
  try {
    // ✅ FIX 1: defer immediately (VERY IMPORTANT)
    await interaction.deferReply({ flags: 64 });

    const game = interaction.options.getString('game');
    const category = interaction.options.getString('category');
    const itemValue = interaction.options.getString('item');

    // 🔥 Normalize
    const g = game.toLowerCase().trim();
    const c = category.toLowerCase().trim();
    const v = itemValue.toLowerCase().trim();

    let label = itemValue;

    const base = items[g]?.[c] || [];
    const found = base.find(i => i.value === v);

    if (found) {
      label = found.label;
    }

    // ⏳ DB calls (these were causing timeout)
    await enableItem(g, c, v);
    await addEnabledItem(g, c, label, v);

    // ✅ FIX 2: use editReply instead of reply
    await interaction.editReply({
      content: `✅ Enabled **${label}**`
    });

  } catch (err) {
    console.error('[Enable Command Error]', err);

    // ✅ Safe error handling
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply({
        content: '❌ Failed to enable item'
      });
    } else {
      await interaction.reply({
        content: '❌ Failed to enable item',
        flags: 64
      });
    }
  }
}
};