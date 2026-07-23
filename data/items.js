// ============================================================
//  MoonBlox Bot – Items & Price Lists
//  Edit this file to update prices and available items.
// ============================================================

module.exports = {

  // ── Robux Via Username ───────────────────────────────────
  robuxUsernamePackages: [
    { label: '⏣ 100 Rbx – 14.500',  value: '100_rbx' },
    { label: '⏣ 200 Rbx – 29.000',  value: '200_rbx' },
    { label: '⏣ 300 Rbx – 43.500',  value: '300_rbx' },
    { label: '⏣ 400 Rbx – 58.000',  value: '400_rbx' },
    { label: '⏣ 500 Rbx – 72.500',  value: '500_rbx' },
  ],

  // ── Kick a Lucky Block ───────────────────────────────────
  kickLuckyBlock: {
    categories: [
      { label: '⚡ Boost',     value: 'boost' },
      { label: '🎮 Gamepass',  value: 'gamepass' },
      { label: '💰 Cash Pack', value: 'cashpack' },
    ],
    boost: [
      { label: '⚡ x2 Boost – 6.950',  value: 'x2_boost' },
      { label: '⚡ x4 Boost – 17.400', value: 'x4_boost' },
      { label: '⚡ x8 Boost – 62.500', value: 'x8_boost' },
    ],
    gamepass: [
      { label: '👑 VIP – 25.600',               value: 'vip' },
      { label: '🦵 Kick Power – 12.300',         value: 'kick_power' },
      { label: '💵 x2 Cash – 34.700',            value: 'x2_cash' },
      { label: '🧠 x2 Brainrot Luck – 87.000',   value: 'x2_brainrot_luck' },
      { label: '🧬 x2 Mutation Luck – 12.300',   value: 'x2_mutation_luck' },
    ],
    cashpack: [
      { label: '💵 Small Cash Pack – 1.750',   value: 'small_cash_pack' },
      { label: '💵 Medium Cash Pack – 8.700',  value: 'medium_cash_pack' },
      { label: '💵 Big Cash Pack – 21.700',    value: 'big_cash_pack' },
      { label: '💵 Huge Cash Pack – 27.800',   value: 'huge_cash_pack' },
      { label: '💵 Insane Cash Pack – 78.050', value: 'insane_cash_pack' },
    ],
  },

  // ── Discord Nitro / Services ─────────────────────────────
  discordNitro: {
    categories: [
      { label: '🔵 Nitro Boost (VILOG)',  value: 'nitro_boost'  },
      { label: '🚀 Server Boost',          value: 'server_boost' },
      { label: '🎨 Decoration',            value: 'decoration'   },
      { label: '📋 Account For Sale',      value: 'account_sale' },   // ADD THIS
    ],
    nitro_boost: [
      { label: '🔵 Nitro 1 Bulan (Trial) – Rp. 20.000', value: 'nitro_1mo' },
      { label: '🔵 Nitro 3 Bulan (Trial) – Rp. 50.000', value: 'nitro_3mo' },
    ],
    server_boost_1mo: [
      { label: '⚡ 4x Boost  | 1 Bulan – Rp. 105.000',                             value: 'sb_4x_1mo'  },
      { label: '⚡ 6x Boost  | 1 Bulan – Rp. 150.000',                             value: 'sb_6x_1mo'  },
      { label: '⚡ 8x Boost  | 1 Bulan – Rp. 195.000 (Level 2)',                   value: 'sb_8x_1mo'  },
      { label: '⚡ 10x Boost | 1 Bulan – Rp. 240.000',                             value: 'sb_10x_1mo' },
      { label: '⚡ 12x Boost | 1 Bulan – Rp. 285.000',                             value: 'sb_12x_1mo' },
      { label: '⚡ 14x Boost | 1 Bulan – Rp. 330.000 (Level 3)',                   value: 'sb_14x_1mo' },
      { label: '⚡ 16x Boost | 1 Bulan – Rp. 375.000',                             value: 'sb_16x_1mo' },
      { label: '⚡ 18x Boost | 1 Bulan – Rp. 420.000 (Level 3 + Server Tags)',     value: 'sb_18x_1mo' },
      { label: '⚡ 20x Boost | 1 Bulan – Rp. 465.000 (Level 3 + Tags + Gradient)', value: 'sb_20x_1mo' },
    ],
    server_boost_3mo: [
      { label: '⚡ 14x Boost | 3 Bulan – Rp. 700.000', value: 'sb_14x_3mo' },
      { label: '⚡ 16x Boost | 3 Bulan – Rp. 750.000', value: 'sb_16x_3mo' },
      { label: '⚡ 18x Boost | 3 Bulan – Rp. 800.000', value: 'sb_18x_3mo' },
      { label: '⚡ 20x Boost | 3 Bulan – Rp. 850.000', value: 'sb_20x_3mo' },
    ],
    decoration: [
      { label: '🎨 Rp33.000  → Rp17.000',  value: 'deco_17k'  },
      { label: '🎨 Rp39.500  → Rp20.000',  value: 'deco_20k'  },
      { label: '🎨 Rp52.000  → Rp30.000',  value: 'deco_30k'  },
      { label: '🎨 Rp65.000  → Rp35.000',  value: 'deco_35k'  },
      { label: '🎨 Rp71.000  → Rp40.000',  value: 'deco_40k'  },
      { label: '🎨 Rp78.000  → Rp50.000',  value: 'deco_50k'  },
      { label: '🎨 Rp91.000  → Rp60.000',  value: 'deco_60k'  },
      { label: '🎨 Rp96.000  → Rp70.000',  value: 'deco_70k'  },
      { label: '🎨 Rp100.000 → Rp75.000',  value: 'deco_75k'  },
      { label: '🎨 Rp105.000 → Rp80.000',  value: 'deco_80k'  },
      { label: '🎨 Rp115.000 → Rp90.000',  value: 'deco_90k'  },
      { label: '🎨 Rp120.000 → Rp100.000', value: 'deco_100k' },
    ],
    account_sale: [
        { label: '➢ Account 1 Bulan – Rp. 4.000 (Min buy 5)', value: 'acc_1mo'  },
        { label: '➢ Account 2020 – Rp. 24.000',               value: 'acc_2020' },
        { label: '➢ Account 2019 – Rp. 35.500',               value: 'acc_2019' },
        { label: '➢ Account 2018 – Rp. 42.000',               value: 'acc_2018' },
        { label: '➢ Account 2017 – Rp. 80.000',               value: 'acc_2017' },
        { label: '➢ Account 2016 – Rp. 180.000',              value: 'acc_2016' },
      ],
  },

  // ── Robux Via Login ──────────────────────────────────────
  robuxLoginPackages: [
  { label: '💎 Non Premium • 500R – Rp 75.000', value: '500R' },
  { label: '💎 Non Premium • 1.000R – Rp 150.000', value: '1000R' },
  { label: '💎 Non Premium • 1.500R – Rp 225.000', value: '1500R' },
  { label: '💎 Non Premium • 2.000R – Rp 300.000', value: '2000R' },
  { label: '💎 Non Premium • 2.500R – Rp 375.000', value: '2500R' },
  { label: '💎 Non Premium • 3.000R – Rp 450.000', value: '3000R' },
  { label: '💎 Non Premium • 3.500R – Rp 525.000', value: '3500R' },
  { label: '💎 Non Premium • 4.000R – Rp 600.000', value: '4000R' },
  { label: '💎 Non Premium • 4.500R – Rp 675.000', value: '4500R' },
  { label: '💎 Non Premium • 5.000R – Rp 750.000', value: '5000R' },
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
    { label: '👑 VIP + Luck – 39.050', value: 'vip_luck' },
    { label: '🧙 Mutations – 26.050', value: 'mutations' },
    { label: '🍀 Advanced Luck – 47.700', value: 'advanced_luck' },
    { label: '🍀 Extra Luck – 21.250', value: 'extra_luck' },
    { label: '🆙 Double XP – 16.910', value: 'double_xp' },
    { label: '💰 Sell Anywhere – 27.350', value: 'sell_anywhere' },
    { label: '🌸 Small Luck – 5.100', value: 'small_luck' },
    { label: '🛶 Mini Hoverboat – 20.000', value: 'mini_hoverboat' },
    { label: '🛥️ Hyper Boat Pack – 86.700', value: 'hyper_boat_pack' },
    { label: '🦇 Crimson Retribution – 85.000', value: 'crimson_retribution' },
    { label: '💃 Gacor Kang Emote – 5.200', value: 'gacor_kang_emote' },
    { label: '🌀 Voidcraft Boat – 47.000', value: 'voidcraft_boat' },
  ],

  crate: [
    { label: '🕺 Emote Crate (1) – 5.610', value: 'emote_crate_1' },
    { label: '🕺 Emote Crate (5) – 26.010', value: 'emote_crate_5' },

    { label: '📦 Luxury / Enchanted Crate (1) – 8.670', value: 'luxury_crate_1' },
    { label: '📦 Luxury / Enchanted Crate (5) – 43.055', value: 'luxury_crate_5' },
    { label: '📦 Luxury / Enchanted Crate (10) – 85.900', value: 'luxury_crate_10' },

    { label: '🏴‍☠️ Pirate Crate (1) – 10.820', value: 'pirate_crate_1' },
    { label: '🏴‍☠️ Pirate Crate (5) – 47.700', value: 'pirate_crate_5' },

    { label: '🪵 Elderwood (1) – 10.200', value: 'elderwood_1' },
    { label: '🪵 Elderwood (5) – 47.500', value: 'elderwood_5' },

    { label: '🔮 Mystery Crate (1) – 10.820', value: 'mystery_crate_1' },
    { label: '🔮 Mystery Crate (5) – 49.500', value: 'mystery_crate_5' },
    { label: '🔮 Mystery Crate (10) – 99.000', value: 'mystery_crate_10' },

    { label: '🎡 Spinwheels (1) – 8.700', value: 'spinwheel_1' },
    { label: '🎡 Spinwheels (5) – 43.100', value: 'spinwheel_5' },
    { label: '🎡 Spinwheels (10) – 85.000', value: 'spinwheel_10' },
  ],
},

  // ── Fish It Boost x8 ─────────────────────────────────────
  fishitBoost: {

    methods: [
      { label: '🎁 Gift',  value: 'gift' },
      { label: '🔑 Login', value: 'login' },
    ],

    giftPackages: [
      { label: '🍀 Boost x2 – 8.670', value: 'boost_x2' },
      { label: '🍀 Boost x4 – 34.700', value: 'boost_x4' },
      { label: '🍀 Boost x8 – 69.200', value: 'boost_x8' },
      { label: '🍀 Boost x8 3jam – 71.500', value: 'boost_x8_3h' },
      { label: '🍀 Boost x8 6jam – 112.200', value: 'boost_x8_6h' },
      { label: '🍀 Boost x8 12jam – 153.000', value: 'boost_x8_12h' },
      { label: '🍀 Boost x8 24jam – 265.200', value: 'boost_x8_24h' },
      { label: '🍀 Boost x8 48jam – 456.000', value: 'boost_x8_48h' },
      { label: '🍀 Boost x8 72jam – 663.000', value: 'boost_x8_72h' },
      { label: '🍀 Boost x8 96jam – 869.000', value: 'boost_x8_96h' },
      { label: '🍀 Boost x8 120jam – 1.076.000', value: 'boost_x8_120h' },
    ],

    loginPackages: [
  { label: '🍀 Boost x8 12jam – 138.000', value: 'login_boost_x8_12h' },
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
    { label: '🌸59⏣ Essentials Pack : 6.120', value: 'essentials_pack' },
    { label: '💨119⏣ Fast Forge : 10.710', value: 'fast_forge' },
    { label: '🌏219⏣ Forge Anywhere : 19.400', value: 'forge_anywhere' },
    { label: '🌏139⏣ Sell Anywhere : 12.250', value: 'sell_anywhere' },
    { label: '🤝155⏣ Supporter : 13.770', value: 'supporter' },
    { label: '✨199⏣ Better Forge : 17.350', value: 'better_forge' },
    { label: '📦99⏣ Double Storage : 9.200', value: 'double_storage' },
  ],

  totems: [
    { label: '🆙19⏣ XP Totem (1) : 2.050', value: 'xp_totem_1' },
    { label: '🆙55⏣ XP Totem (3) : 5.100', value: 'xp_totem_3' },

    { label: '🍀30⏣ Luck Totem (1) : 2.550', value: 'luck_totem_1' },
    { label: '🍀69⏣ Luck Totem (3) : 6.120', value: 'luck_totem_3' },

    { label: '⛏️30⏣ Miner Totem (1) : 2.500', value: 'miner_totem_1' },
    { label: '⛏️69⏣ Miner Totem (3) : 6.000', value: 'miner_totem_3' },

    { label: '🥷🏻30⏣ Warrior Totem (1) : 2.550', value: 'warrior_totem_1' },
    { label: '🥷🏻69⏣ Warrior Totem (3) : 6.120', value: 'warrior_totem_3' },

    { label: '⚡30⏣ Vitality Totem (1) : 2.550', value: 'vitality_totem_1' },
    { label: '⚡69⏣ Vitality Totem (3) : 6.120', value: 'vitality_totem_3' },
  ],

  rerolls: [
    { label: '🎲30⏣ 1 Reroll : 2.550', value: 'reroll_1' },
    { label: '🎲120⏣ 5 Rerolls : 10.710', value: 'reroll_5' },
    { label: '🎲230⏣ 10 Rerolls : 20.400', value: 'reroll_10' },
  ],

  cashpack: [
    { label: '💵19⏣ 750 Cash : 2.040', value: 'cash_750' },
    { label: '💵70⏣ 3000 Cash : 6.120', value: 'cash_3000' },
    { label: '💵159⏣ 7500 Cash : 14.570', value: 'cash_7500' },
    { label: '💵279⏣ 15000 Cash : 24.500', value: 'cash_15000' },
    { label: '💵479⏣ 30000 Cash : 41.850', value: 'cash_30000' },
  ],

},

  // ── Abyss ─────────────────────────────────────────────────
  abyss: [
  { label: '💨 Faster Geode Open - 14.800', value: 'faster_geode_open' },
  { label: '💸 Sell Anywhere - 31.500', value: 'sell_anywhere' },
  { label: '🤿 Diver Club - 32.200', value: 'diver_club' },
  { label: '📦 More Storage - 21.950', value: 'more_storage' },
  { label: '🎁 Divers Pack - 30.600', value: 'divers_pack' },
  { label: '💎 Small Shard Pack - 4.600', value: 'small_shard_pack' },
  { label: '💎 Mid Shard Pack - 11.300', value: 'mid_shard_pack' },
  { label: '💎 Big Shard Pack - 48.000', value: 'big_shard_pack' },
  { label: '💎 Huge Shard Pack - 104.050', value: 'huge_shard_pack' },
],

  // ── Sawah Indo ────────────────────────────────────────────
  sawahIndo: {

  categories: [
    { label: '🎮 Gamepass', value: 'gamepass' },
    { label: '⚙️ Fiture', value: 'fiture' },
  ],

  gamepass: [
    { label: '👨‍🌾 2x Panen – 4.600', value: '2x_panen' },
    { label: '⚡ Tumbuh Cepat – 6.650', value: 'tumbuh_cepat' },
    { label: '📦 Slot Tambahan – 8.670', value: 'slot_tambahan' },
    { label: '💸 2x Jual – 8.670', value: '2x_jual' },
    { label: '🌟 2x XP – 13.000', value: '2x_xp' },
    { label: '🌧️ Pecinta Hujan – 13.000', value: 'pecinta_hujan' },
    { label: '🤖 Panen Otomatis – 21.700', value: 'panen_otomatis' },
    { label: '📻 Boombox – 17.350', value: 'boombox' },
    { label: '👑 VIP Farmer – 43.350', value: 'vip_farmer' },
  ],

  fiture: [
    { label: '🐥 Auto Feed Chicken – 20.910', value: 'auto_feed_chicken' },
    { label: '🐮 Auto Feed Cow – 20.910', value: 'auto_feed_cow' },
    { label: '🥚 Auto Collect Egg – 13.880', value: 'auto_collect_egg' },
    { label: '🥛 Auto Collect Milk – 13.880', value: 'auto_collect_milk' },
  ]

  
},
slimeRng: {
  categories: [
    { label: 'Gamepass', value: 'gamepass' },
    { label: '🔄 Spin', value: 'spin' },
    { label: '🍖 Food', value: 'food' },
    { label: '🚀 Boost', value: 'boost' },
    { label: '🪙 Coin', value: 'coin' },
  ],

  gamepass: [
    { label: '🎲 Double roll - 21.000', value: 'double_roll' },
    { label: '⚡ Fast roll - 10.500', value: 'fast_roll' },
    { label: '🎰 Lucky roll - 3.000', value: 'lucky_roll' },
    { label: '👑 VIP - 14.000', value: 'vip' },
    { label: '🧲 Auto collect - 7.000', value: 'auto_collect' },
    { label: '👷 +1 slime equip - 5.000', value: 'plus_1_slime_equip' },
    { label: '💼 More loot - 8.800', value: 'more_loot' },
  ],

  spin: [
    { label: '🔄 1 spin - 13.000', value: 'spin_1' },
    { label: '🔄 5 spin - 52.100', value: 'spin_5' },
    { label: '🔄 12 spin - 104.500', value: 'spin_12' },
  ],

  food: [
    { label: '🍪 Snack - 7.000', value: 'snack' },
    { label: '🥗 Meal - 10.500', value: 'meal' },
    { label: '🍖 Feast - 13.600', value: 'feast' },
  ],

  boost: [
    { label: '🚀 Luck boost - 1.050', value: 'luck_boost' },
    { label: '🚀 Ultra luck boost - 1.550', value: 'ultra_luck_boost' },
    { label: '🚀 Roll speed boost - 1.550', value: 'roll_speed_boost' },
    { label: '🚀 Coin boost - 1.050', value: 'coin_boost' },
  ],

  coin: [
    { label: '🪙 Small coin - 2.050', value: 'small_coin' },
    { label: '🪙 Medium coin - 13.900', value: 'medium_coin' },
    { label: '🪙 Large coin - 27.800', value: 'large_coin' },
  ],
},

surviveApocalypse: {
  categories: [
    { label: '❇️ Emeralds', value: 'emeralds' },
  ],

  emeralds: [
    { label: '❇️ 1400 Emeralds - 173.500', value: 'emeralds_1400' },
    { label: '❇️ 400 Emeralds - 60.700', value: 'emeralds_400' },
    { label: '❇️ 100 Emeralds - 17.350', value: 'emeralds_100' },
    { label: '❇️ 40 Emeralds - 8.670', value: 'emeralds_40' },
  ],
},

dragDriveSimulator: {
  categories: [
    { label: '🏍️ Gamepass', value: 'gamepass' },
    { label: '💸 Cash', value: 'cash' },
  ],

  gamepass: [
    { label: '🛵 Custom Plate Pass - 6.940', value: 'custom_plate_pass' },
    { label: '🏃 Dragspec Pass - 9.700', value: 'dragspec_pass' },
    { label: '⭐ Premium Accesories - 5.202', value: 'premium_accesories' },
    { label: '👑 Exclusive Rims - 6.940', value: 'exclusive_rims' },
    { label: '👮🏻‍♂️ Police Pass - 13.000', value: 'police_pass' },
    { label: '🔓 Slot Limit Unlocker - 7.810', value: 'slot_limit_unlocker' },
    { label: '🎨 Advance Paint Pass - 5.202', value: 'advance_paint_pass' },
    { label: '💳 2x Paycheck - 43.350', value: 'double_paycheck' },
    { label: '✨ Luxury Pass - 10.404', value: 'luxury_pass' },
    { label: '🔧 Suspension Pro - 2.652', value: 'suspension_pro' },
    { label: '📻 Boombox Radio - 2.652', value: 'boombox_radio' },
  ],

  cash: [
    { label: '💸 500.000.000 - 34.680', value: 'cash_500000000' },
    { label: '💸 100.000.000 - 8.850', value: 'cash_100000000' },
    { label: '💸 50.000.000 - 5.202', value: 'cash_50000000' },
    { label: '💸 10.000.000 - 3.060', value: 'cash_10000000' },
    { label: '💸 5.000.000 - 1.840', value: 'cash_5000000' },
    { label: '💸 1.000.000 - 1.020', value: 'cash_1000000' },
  ],
},

dragonAdventures: {
  categories: [
    { label: '🐉 Gamepass', value: 'gamepass' },
    { label: '🛍️ Bundle', value: 'bundle' },
  ],

  gamepass: [
    { label: '🐣 Lucky egg - 30.400', value: 'lucky_egg' },
    { label: '📿 Multi Accesories - 15.200', value: 'multi_accesories' },
    { label: '🎒 Big Backpack - 43.400', value: 'big_backpack' },
    { label: '🛠️ Advanced Building - 34.700', value: 'advanced_building' },
    { label: '👑 VIP - 26.010', value: 'vip' },
  ],

  bundle: [
    { label: '🛍️ Purist Bundle - 86.700', value: 'purist_bundle' },
    { label: '🛍️ Warrior Bundle - 156.060', value: 'warrior_bundle' },
    { label: '🛍️ Druid Bundle - 156.060', value: 'druid_bundle' },
    { label: '🛍️ Royalty Bundle - 156.060', value: 'royalty_bundle' },
    { label: '🛍️ Drakon Pass - 65.025', value: 'drakon_pass' },
    { label: '🛍️ Dragoneer Pass - 43.400', value: 'dragoneer_pass' },
  ],
},

resellerMoonbloxPackages: [
  { label: '👑 Reseller Moonblox - 100.000 / bulan', value: 'normal' },
],

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
