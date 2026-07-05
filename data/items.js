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
      { label: '⚡ x2 Boost – 6.800',  value: 'x2_boost' },
      { label: '⚡ x4 Boost – 17.000', value: 'x4_boost' },
      { label: '⚡ x8 Boost – 61.200', value: 'x8_boost' },
    ],
    gamepass: [
      { label: '👑 VIP – 25.075',               value: 'vip' },
      { label: '🦵 Kick Power – 12.000',         value: 'kick_power' },
      { label: '💵 x2 Cash – 34.000',            value: 'x2_cash' },
      { label: '🧠 x2 Brainrot Luck – 85.000',   value: 'x2_brainrot_luck' },
      { label: '🧬 x2 Mutation Luck – 12.000',   value: 'x2_mutation_luck' },
    ],
    cashpack: [
      { label: '💵 Small Cash Pack – 1.700',   value: 'small_cash_pack' },
      { label: '💵 Medium Cash Pack – 8.500',  value: 'medium_cash_pack' },
      { label: '💵 Big Cash Pack – 21.250',    value: 'big_cash_pack' },
      { label: '💵 Huge Cash Pack – 27.200',   value: 'huge_cash_pack' },
      { label: '💵 Insane Cash Pack – 76.500', value: 'insane_cash_pack' },
    ],
  },

  // ── Discord Nitro / Services ─────────────────────────────
  discordNitro: {
    categories: [
      { label: '🔵 Nitro Boost (VILOG)',  value: 'nitro_boost'  },
      { label: '🚀 Server Boost',          value: 'server_boost' },
      { label: '🎨 Decoration',            value: 'decoration'   },
    ],
    nitro_boost: [
      { label: '🔵 Nitro 1 Bulan (Trial) – Rp. 25.000', value: 'nitro_1mo' },
      { label: '🔵 Nitro 3 Bulan (Trial) – Rp. 40.000', value: 'nitro_3mo' },
    ],
    server_boost_1mo: [
      { label: '🚀 2x Boost  | 1 Bulan – Rp. 30.000',  value: 'sb_2x_1mo'  },
      { label: '🚀 14x Boost | 1 Bulan – Rp. 110.000', value: 'sb_14x_1mo' },
      { label: '🚀 20x Boost | 1 Bulan – Rp. 160.000', value: 'sb_20x_1mo' },
    ],
    server_boost_3mo: [
      { label: '🚀 2x Boost  | 3 Bulan – Rp. 40.000',  value: 'sb_2x_3mo'  },
      { label: '🚀 14x Boost | 3 Bulan – Rp. 160.000', value: 'sb_14x_3mo' },
      { label: '🚀 20x Boost | 3 Bulan – Rp. 260.000', value: 'sb_20x_3mo' },
    ],
    decoration: [
      { label: '🎨 Rp33.000  → Rp20.000',  value: 'deco_20k'  },
      { label: '🎨 Rp39.500  → Rp25.000',  value: 'deco_25k'  },
      { label: '🎨 Rp52.000  → Rp40.000',  value: 'deco_40k'  },
      { label: '🎨 Rp78.000  → Rp63.000',  value: 'deco_63k'  },
      { label: '🎨 Rp100.000 → Rp80.000',  value: 'deco_80k'  },
      { label: '🎨 Rp105.000 → Rp90.000',  value: 'deco_90k'  },
      { label: '🎨 Rp130.000 → Rp130.000', value: 'deco_130k' },
      { label: '🎨 Rp155.000 → Rp150.000', value: 'deco_150k' },
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
slimeRng: {
  categories: [
    { label: 'Gamepass', value: 'gamepass' },
    { label: '🔄 Spin', value: 'spin' },
    { label: '🍖 Food', value: 'food' },
    { label: '🚀 Boost', value: 'boost' },
    { label: '🪙 Coin', value: 'coin' },
  ],

  gamepass: [
    { label: '🎲 Double roll - 20.400', value: 'double_roll' },
    { label: '⚡ Fast roll - 10.200', value: 'fast_roll' },
    { label: '🎰 Lucky roll - 2.550', value: 'lucky_roll' },
    { label: '👑 VIP - 13.600', value: 'vip' },
    { label: '🧲 Auto collect - 6.800', value: 'auto_collect' },
    { label: '👷 +1 slime equip - 4.675', value: 'plus_1_slime_equip' },
    { label: '💼 More loot - 8.500', value: 'more_loot' },
  ],

  spin: [
    { label: '🔄 1 spin - 12.750', value: 'spin_1' },
    { label: '🔄 5 spin - 51.000', value: 'spin_5' },
    { label: '🔄 12 spin - 102.000', value: 'spin_12' },
  ],

  food: [
    { label: '🍪 Snack - 6.800', value: 'snack' },
    { label: '🥗 Meal - 10.200', value: 'meal' },
    { label: '🍖 Feast - 13.600', value: 'feast' },
  ],

  boost: [
    { label: '🚀 Luck boost - 1.000', value: 'luck_boost' },
    { label: '🚀 Ultra luck boost - 1.500', value: 'ultra_luck_boost' },
    { label: '🚀 Roll speed boost - 1.500', value: 'roll_speed_boost' },
    { label: '🚀 Coin boost - 1.000', value: 'coin_boost' },
  ],

  coin: [
    { label: '🪙 Small coin - 2.000', value: 'small_coin' },
    { label: '🪙 Medium coin - 13.600', value: 'medium_coin' },
    { label: '🪙 Large coin - 27.200', value: 'large_coin' },
  ],
},

surviveApocalypse: {
  categories: [
    { label: '❇️ Emeralds', value: 'emeralds' },
  ],

  emeralds: [
    { label: '❇️ 1400 Emeralds - 170.000', value: 'emeralds_1400' },
    { label: '❇️ 400 Emeralds - 59.500', value: 'emeralds_400' },
    { label: '❇️ 100 Emeralds - 17.000', value: 'emeralds_100' },
    { label: '❇️ 40 Emeralds - 8.500', value: 'emeralds_40' },
  ],
},

dragDriveSimulator: {
  categories: [
    { label: '🏍️ Gamepass', value: 'gamepass' },
    { label: '💸 Cash', value: 'cash' },
  ],

  gamepass: [
    { label: '🛵 Custom Plate Pass - 6.800', value: 'custom_plate_pass' },
    { label: '🏃 Dragspec Pass - 9.500', value: 'dragspec_pass' },
    { label: '⭐ Premium Accesories - 5.100', value: 'premium_accesories' },
    { label: '👑 Exclusive Rims - 6.800', value: 'exclusive_rims' },
    { label: '👮🏻‍♂️ Police Pass - 12.750', value: 'police_pass' },
    { label: '🔓 Slot Limit Unlocker - 7.650', value: 'slot_limit_unlocker' },
    { label: '🎨 Advance Paint Pass - 5.100', value: 'advance_paint_pass' },
    { label: '💳 2x Paycheck - 42.500', value: 'double_paycheck' },
    { label: '✨ Luxury Pass - 10.200', value: 'luxury_pass' },
    { label: '🔧 Suspension Pro - 2.600', value: 'suspension_pro' },
    { label: '📻 Boombox Radio - 2.600', value: 'boombox_radio' },
  ],

  cash: [
    { label: '💸 500.000.000 - 34.000', value: 'cash_500000000' },
    { label: '💸 100.000.000 - 8.500', value: 'cash_100000000' },
    { label: '💸 50.000.000 - 5.100', value: 'cash_50000000' },
    { label: '💸 10.000.000 - 3.000', value: 'cash_10000000' },
    { label: '💸 5.000.000 - 1.800', value: 'cash_5000000' },
    { label: '💸 1.000.000 - 1.000', value: 'cash_1000000' },
  ],
},

dragonAdventures: {
  categories: [
    { label: '🐉 Gamepass', value: 'gamepass' },
    { label: '🛍️ Bundle', value: 'bundle' },
  ],

  gamepass: [
    { label: '🐣 Lucky egg - 29.800', value: 'lucky_egg' },
    { label: '📿 Multi Accesories - 14.900', value: 'multi_accesories' },
    { label: '🎒 Big Backpack - 42.500', value: 'big_backpack' },
    { label: '🛠️ Advanced Building - 34.000', value: 'advanced_building' },
    { label: '👑 VIP - 25.500', value: 'vip' },
  ],

  bundle: [
    { label: '🛍️ Purist Bundle - 85.000', value: 'purist_bundle' },
    { label: '🛍️ Warrior Bundle - 153.000', value: 'warrior_bundle' },
    { label: '🛍️ Druid Bundle - 153.000', value: 'druid_bundle' },
    { label: '🛍️ Royalty Bundle - 153.000', value: 'royalty_bundle' },
    { label: '🛍️ Drakon Pass - 63.750', value: 'drakon_pass' },
    { label: '🛍️ Dragoneer Pass - 42.500', value: 'dragoneer_pass' },
  ],
},

resellerMoonbloxPackages: [
  { label: '👑 Normal Reseller - 100.000 / bulan', value: 'normal' },
  { label: '👑 Premium Reseller - 200.000 / bulan', value: 'premium' },
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
