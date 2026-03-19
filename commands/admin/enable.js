const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const items = require('../../data/items');

const { 
  enableItem, 
  addEnabledItem,
  supabase
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
      await interaction.deferReply({ flags: 64 });

      const g = interaction.options.getString('game').toLowerCase().trim();
      const c = interaction.options.getString('category').toLowerCase().trim();
      const rawInput = interaction.options.getString('item');

      // 🔥 SAFE value generator
      const numberMatch = rawInput.match(/\(\s*(\d+)\s*\)/);
      
      // clean base name (before bracket)
      const baseName = rawInput
        .split('(')[0]
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // remove symbols
        .replace(/\s+/g, '_')
        .trim();
      
      let v = baseName;
      
      if (numberMatch) {
        v = `${baseName}_${numberMatch[1]}`;
      }
      let label = rawInput
      .replace(/\(\s+/g, '(')   // remove space after (
      .replace(/\s+\)/g, ')')   // remove space before )
      .replace(/\s+/g, ' ')     // normalize spaces
      .trim(); // 🔥 keep original format

      const base = items[g]?.[c] || [];
      const found = base.find(i => i.value === v);

      if (found) label = found.label;

      // ✅ ONLY count within SAME game + category
      const { data: lastItem } = await supabase
        .from('enabled_items')
        .select('position')
        .eq('game', g)
        .eq('category', c)
        .order('position', { ascending: false })
        .limit(1);

      const nextPosition = lastItem?.[0]?.position + 1 || 1;

      await enableItem(g, c, v);
      await addEnabledItem(g, c, label, v, nextPosition);

      await interaction.editReply({
        content: `✅ Enabled **${label}** (Position: ${nextPosition} in ${g}/${c})`
      });

    } catch (err) {
      console.error('[Enable Error]', err);

      await interaction.editReply({
        content: '❌ Failed to enable item'
      });
    }
  }
};
