// ============================================================
//  MoonBlox Bot – Items & Price Lists
//  Edit this file to update prices and available items.
// ============================================================

module.exports = {

  // ── Robux Via Login ──────────────────────────────────────
  robuxLoginPackages: [
  { label: '🧸 Premium • 450R + Prem – Rp 75.000', value: '450P' },
  { label: '🧸 Premium • 1.000R + Prem – Rp 145.000', value: '1000P' },
  { label: '🧸 Premium • 2.200R + Prem – Rp 300.000', value: '2200P' },

  { label: '💎 Non Premium • 500R – Rp 70.000', value: '500R' },
  { label: '💎 Non Premium • 1.000R – Rp 140.000', value: '1000R' },
  { label: '💎 Non Premium • 2.000R – Rp 280.000', value: '2000R' },
  { label: '💎 Non Premium • 3.000R – Rp 420.000', value: '3000R' },
  { label: '💎 Non Premium • 4.000R – Rp 560.000', value: '4000R' },
  { label: '💎 Non Premium • 5.000R – Rp 700.000', value: '5000R' },

  { label: '👑 Sultan • 10.000R – Rp 1.400.000', value: '10000R' },
  { label: '👑 Sultan • 15.000R – Rp 2.100.000', value: '15000R' },
  { label: '👑 Sultan • 20.000R – Rp 3.080.000', value: '20000R' },
],

  // ── Robux Via Gamepass ───────────────────────────────────
  robuxGamepassTaxOptions: [
    { label: 'Before Tax (I pay full amount)', value: 'before_tax' },
    { label: 'After Tax (I receive full amount)', value: 'after_tax' },
  ],

  // ── Diamond Heartopia ─────────────────────────────────────
  heartopiaLoginMethods: [
    { label: 'Via Login',   value: 'login'  },
    { label: 'Via Other',   value: 'other'  },
  ],
  heartopiaPackages: [
    { label: '100 Diamond  – Rp 5.000',   value: '100_diamond'  },
    { label: '500 Diamond  – Rp 22.000',  value: '500_diamond'  },
    { label: '1.000 Diamond – Rp 42.000', value: '1000_diamond' },
    { label: '5.000 Diamond – Rp 200.000',value: '5000_diamond' },
  ],

  // ── Fish It ───────────────────────────────────────────────
  fishit: {
  categories: [
    { label: ' 🎮 Gamepass 🎮', value: 'gamepass' },
    { label: '📦 Crate / Spinwheels 🎡', value: 'crate' },
  ],

  gamepass: [
    { label: '👑 VIP + Luck – 38.250', value: 'vip_luck' },
    { label: '🧙 Mutations – 25.500', value: 'mutations' },
    { label: '🍀 Advanced Luck – 46.750', value: 'advanced_luck' },
    { label: '🍀 Extra Luck – 20.825', value: 'extra_luck' },
    { label: '🆙 Double XP – 16.575', value: 'double_xp' },
    { label: '💰 Sell Anywhere – 26.800', value: 'sell_anywhere' },
    { label: '🌸 Small Luck – 5.000', value: 'small_luck' },
    { label: '🛶 Mini Hoverboat – 19.200', value: 'mini_hoverboat' },
    { label: '🛥️ Hyper Boat Pack – 85.000', value: 'hyper_boat_pack' },
    { label: '🦇 Crimson Retribution – 85.000', value: 'crimson_retribution' },
    { label: '💃 Gacor Kang Emote – 5.200', value: 'gacor_kang_emote' },
    { label: '🌀 Voidcraft Boat – 47.000', value: 'voidcraft_boat' },
  ],

  crate: [
    { label: '🕺 Emote Crate (1) – 5.500', value: 'emote_crate_1' },
    { label: '🕺 Emote Crate (5) – 25.500', value: 'emote_crate_5' },

    { label: '📦 Luxury / Enchanted Crate (1) – 8.500', value: 'luxury_crate_1' },
    { label: '📦 Luxury / Enchanted Crate (5) – 42.200', value: 'luxury_crate_5' },
    { label: '📦 Luxury / Enchanted Crate (10) – 84.200', value: 'luxury_crate_10' },

    { label: '🏴‍☠️ Pirate Crate (1) – 10.600', value: 'pirate_crate_1' },
    { label: '🏴‍☠️ Pirate Crate (5) – 46.750', value: 'pirate_crate_5' },

    { label: '🪵 Elderwood (1) – 10.000', value: 'elderwood_1' },
    { label: '🪵 Elderwood (5) – 46.500', value: 'elderwood_5' },

    { label: '🔮 Mystery Crate (1) – 10.000', value: 'mystery_crate_1' },
    { label: '🔮 Mystery Crate (5) – 48.500', value: 'mystery_crate_5' },
    { label: '🔮 Mystery Crate (10) – 97.000', value: 'mystery_crate_10' },

    { label: '🎡 Spinwheels (1) – 8.500', value: 'spinwheel_1' },
    { label: '🎡 Spinwheels (5) – 42.200', value: 'spinwheel_5' },
    { label: '🎡 Spinwheels (10) – 84.200', value: 'spinwheel_10' },
  ],
},

  // ── Fish It Boost x8 ─────────────────────────────────────
  fishitBoost: {

    methods: [
      { label: '🎁 Gift',  value: 'gift' },
      { label: '🔑 Login', value: 'login' },
    ],

    giftPackages: [
      { label: '🍀 Boost x2 – 8.500', value: 'boost_x2' },
      { label: '🍀 Boost x4 – 34.000', value: 'boost_x4' },
      { label: '🍀 Boost x8 – 67.800', value: 'boost_x8' },
      { label: '🍀 Boost x8 3jam – 70.000', value: 'boost_x8_3h' },
      { label: '🍀 Boost x8 6jam – 110.000', value: 'boost_x8_6h' },
      { label: '🍀 Boost x8 12jam – 150.000', value: 'boost_x8_12h' },
      { label: '🍀 Boost x8 24jam – 260.000', value: 'boost_x8_24h' },
      { label: '🍀 Boost x8 48jam – 447.000', value: 'boost_x8_48h' },
      { label: '🍀 Boost x8 72jam – 650.000', value: 'boost_x8_72h' },
      { label: '🍀 Boost x8 96jam – 852.000', value: 'boost_x8_96h' },
      { label: '🍀 Boost x8 120jam – 1.055.000', value: 'boost_x8_120h' },
    ],

    loginPackages: [
  { label: '🍀 Boost x8 12jam – 135.000', value: 'login_boost_x8_12h' },
  { label: '🍀 Boost x8 24jam – 180.000', value: 'login_boost_x8_24h' },
  { label: '🍀 Boost x8 48jam – 270.000', value: 'login_boost_x8_48h' },
  { label: '🍀 Boost x8 72jam – 370.000', value: 'login_boost_x8_72h' },
  { label: '🍀 Boost x8 96jam – 480.000', value: 'login_boost_x8_96h' },
  { label: '🍀 Boost x8 120jam – 600.000', value: 'login_boost_x8_120h' },
  { label: '🍀 Boost x8 144jam – 735.000', value: 'login_boost_x8_144h' },
  { label: '🍀 Boost x8 168jam – 870.000', value: 'login_boost_x8_168h' },
],

  },

  // ── The Forge ─────────────────────────────────────────────
  forge: {

  categories: [
    { label: '🎮 Gamepass',  value: 'gamepass' },
    { label: '🔮 Totems',    value: 'totems' },
    { label: '🔄 Rerolls',   value: 'rerolls' },
    { label: '💰 Cash Pack', value: 'cashpack' },
  ],

  gamepass: [
    { label: '🌸59⏣ Essentials Pack : 6.000', value: 'essentials_pack' },
    { label: '💨119⏣ Fast Forge : 10.500', value: 'fast_forge' },
    { label: '🌏219⏣ Forge Anywhere : 19.000', value: 'forge_anywhere' },
    { label: '🌏139⏣ Sell Anywhere : 12.000', value: 'sell_anywhere' },
    { label: '🤝155⏣ Supporter : 13.500', value: 'supporter' },
    { label: '✨199⏣ Better Forge : 17.000', value: 'better_forge' },
    { label: '📦99⏣ Double Storage : 9.000', value: 'double_storage' },
  ],

  totems: [
    { label: '🆙19⏣ XP Totem (1) : 2.000', value: 'xp_totem_1' },
    { label: '🆙55⏣ XP Totem (3) : 5.000', value: 'xp_totem_3' },

    { label: '🍀30⏣ Luck Totem (1) : 2.500', value: 'luck_totem_1' },
    { label: '🍀69⏣ Luck Totem (3) : 6.000', value: 'luck_totem_3' },

    { label: '⛏️30⏣ Miner Totem (1) : 2.500', value: 'miner_totem_1' },
    { label: '⛏️69⏣ Miner Totem (3) : 6.000', value: 'miner_totem_3' },

    { label: '🥷🏻30⏣ Warrior Totem (1) : 2.500', value: 'warrior_totem_1' },
    { label: '🥷🏻69⏣ Warrior Totem (3) : 6.000', value: 'warrior_totem_3' },

    { label: '⚡30⏣ Vitality Totem (1) : 2.500', value: 'vitality_totem_1' },
    { label: '⚡69⏣ Vitality Totem (3) : 6.000', value: 'vitality_totem_3' },
  ],

  rerolls: [
    { label: '🎲30⏣ 1 Reroll : 2.500', value: 'reroll_1' },
    { label: '🎲120⏣ 5 Rerolls : 10.500', value: 'reroll_5' },
    { label: '🎲230⏣ 10 Rerolls : 20.000', value: 'reroll_10' },
  ],

  cashpack: [
    { label: '💵19⏣ 750 Cash : 2.000', value: 'cash_750' },
    { label: '💵70⏣ 3000 Cash : 6.000', value: 'cash_3000' },
    { label: '💵159⏣ 7500 Cash : 14.000', value: 'cash_7500' },
    { label: '💵279⏣ 15000 Cash : 24.000', value: 'cash_15000' },
    { label: '💵479⏣ 30000 Cash : 41.000', value: 'cash_30000' },
  ],

},

  // ── Abyss ─────────────────────────────────────────────────
  abyss: [
  { label: '💨 Faster Geode Open - 14.500', value: 'faster_geode_open' },
  { label: '💸 Sell Anywhere - 31.500', value: 'sell_anywhere' },
  { label: '🤿 Diver Club - 30.000', value: 'diver_club' },
  { label: '📦 More Storage - 21.500', value: 'more_storage' },
  { label: '🎁 Divers Pack - 30.000', value: 'divers_pack' },
  { label: '💎 Small Shard Pack - 4.500', value: 'small_shard_pack' },
  { label: '💎 Mid Shard Pack - 11.000', value: 'mid_shard_pack' },
  { label: '💎 Big Shard Pack - 47.000', value: 'big_shard_pack' },
  { label: '💎 Huge Shard Pack - 102.000', value: 'huge_shard_pack' },
],

  // ── Sawah Indo ────────────────────────────────────────────
  sawahIndo: {

  categories: [
    { label: '🎮 Gamepass', value: 'gamepass' },
    { label: '⚙️ Fiture', value: 'fiture' },
  ],

  gamepass: [
    { label: '👨‍🌾 2x Panen – 4.500', value: '2x_panen' },
    { label: '⚡ Tumbuh Cepat – 6.500', value: 'tumbuh_cepat' },
    { label: '📦 Slot Tambahan – 8.500', value: 'slot_tambahan' },
    { label: '💸 2x Jual – 8.500', value: '2x_jual' },
    { label: '🌟 2x XP – 12.750', value: '2x_xp' },
    { label: '🌧️ Pecinta Hujan – 12.750', value: 'pecinta_hujan' },
    { label: '🤖 Panen Otomatis – 21.250', value: 'panen_otomatis' },
    { label: '📻 Boombox – 17.000', value: 'boombox' },
    { label: '👑 VIP Farmer – 42.500', value: 'vip_farmer' },
  ],

  fiture: [
    { label: '🐥 Auto Feed Chicken – 20.500', value: 'auto_feed_chicken' },
    { label: '🐮 Auto Feed Cow – 20.500', value: 'auto_feed_cow' },
    { label: '🥚 Auto Collect Egg – 13.600', value: 'auto_collect_egg' },
    { label: '🥛 Auto Collect Milk – 13.600', value: 'auto_collect_milk' },
  ]

  
},
heartopiaPackages: [
  { label: '💎 300 + 20 Heart Diamond – Rp77.000', value: '300_20' },
  { label: '💎 680 + 50 Heart Diamond – Rp170.000', value: '680_50' },
  { label: '💎 1280 + 90 Heart Diamond – Rp320.000', value: '1280_90' },
  { label: '💎 1980 + 150 Heart Diamond – Rp500.000', value: '1980_150' },
  { label: '💎 3280 + 270 Heart Diamond – Rp820.000', value: '3280_270' },
  { label: '💎 6480 + 570 Heart Diamond – Rp1.550.000', value: '6480_570' },

  { label: '🌰 GAMG Junior 7D – Rp8.000', value: 'gamg_junior_7d' },
  { label: '🌰 GAMG Full 30D – Rp47.000', value: 'gamg_full_30d' }
],
};
