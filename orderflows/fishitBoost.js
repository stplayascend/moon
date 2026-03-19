const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  AttachmentBuilder
} = require('discord.js');

const items = require('../data/items');
const session = require('./sessionManager');

const {
  getDisabledItems,
  getEnabledItems
} = require('../database/supabase');

const FLOW = 'fib';


/* =================================
   LOAD ITEMS (items.js + DB)
================================= */

async function loadItems(category){

  const c = category.toLowerCase().trim();

  const base =
    c === 'gift'
      ? items.fishitBoost.giftPackages
      : items.fishitBoost.loginPackages;

  const enabledRaw = await getEnabledItems('fishitBoost', c);
  const disabledRaw = await getDisabledItems('fishitBoost', c);

  // normalize disabled
  const disabledSet = new Set(
    disabledRaw.map(v => v.toLowerCase().trim())
  );

  // normalize enabled
  // normalize base values
const baseSet = new Set(
  base.map(b => b.value.toLowerCase().trim())
);

// filter base items
const baseFiltered = base.filter(
  i => !disabledSet.has(i.value.toLowerCase().trim())
);

// normalize + filter enabled items
const enabled = enabledRaw
  .filter(i => i.value) // 🔥 IMPORTANT FIX
  .map(i => ({
    label: i.label,
    value: i.value.toLowerCase().trim()
  }))
  .filter(i => !disabledSet.has(i.value));

// remove duplicates (FIXED)
const enabledFiltered = enabled.filter(
  e => !baseSet.has(e.value)
);

// final list
return [...baseFiltered, ...enabledFiltered];
}


/* =================================
   PRICE LIST
================================= */

async function showPriceList(interaction) {

  await interaction.deferReply({ flags: 64 });

  const banner = new AttachmentBuilder('./pricing.png',{name:'pricing.png'});

  const gift = await loadItems('gift');
  const login = await loadItems('login');

  const giftText = gift.map(i => i.label).join('\n') || '*Unavailable*';
  const loginText = login.map(i => i.label).join('\n') || '*Unavailable*';

  const embed = new EmbedBuilder()
    .setTitle('🍀 Boost x8 Fish It – Price List')
    .setColor(0x5865F2)
    .setDescription(`
**SERVER LUCK BOOSTER VIA GIFT :**
${giftText}

**SERVER LUCK BOOSTER VIA LOGIN :**
${loginText}

**DURASI LAIN OPEN TICKET**

📌 x8 bersifat nempel di akun mu, bukan server, dan bukan akun orang lain.  
📌 x8 vilog sama seperti x8 pada umumnya ( via gift tapi kita yg eksekusi ) kamu tinggal duduk anteng manis.  
📌 x8 vilog tidak perlu topup apapun.  
📌 FULL WARRANTY / GARANSI.
`)
    .setImage('attachment://pricing.png')
    .setFooter({ text: 'MoonBlox • Click Order to proceed' });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('fib_order')
      .setLabel('Order')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('🛒')
  );

  await interaction.editReply({
    embeds:[embed],
    components:[row],
    files:[banner]
  });

}


/* =================================
   INTERACTION HANDLER
================================= */

async function handleInteraction(interaction){

  const id = interaction.customId;
  const userId = interaction.user.id;

  if(id==='fib_order'){
    session.setSession(userId,{flow:FLOW,step:1});
    return showMethodSelect(interaction);
  }

  if(id==='fib_method_select'){
    const method=interaction.values[0];
    session.updateSession(userId,{step:2,method});
    return method==='gift'?showGiftModal(interaction):showLoginModal(interaction);
  }

  if(id==='fib_gift_modal'){
    const username=interaction.fields.getTextInputValue('fib_username');
    session.updateSession(userId,{step:3,username});
    return showPackageSelect(interaction);
  }

  if(id==='fib_login_modal'){
    const username=interaction.fields.getTextInputValue('fib_username');
    const password=interaction.fields.getTextInputValue('fib_password');
    session.updateSession(userId,{step:3,username,password:'••••••••'});
    return showPackageSelect(interaction);
  }

  if(id==='fib_package_select'){

    const selected=interaction.values[0];
    const s=session.getSession(userId);

    const list=await loadItems(s.method);

    const pkg=list.find(i=>i.value===selected);

    session.updateSession(userId,{
      step:4,
      package:pkg?.label??selected
    });

    return showSummary(interaction);
  }

  if(id==='fib_create_ticket') return createTicket(interaction);

  if(id==='fib_cancel'){
    session.deleteSession(userId);
    return interaction.update({
      content:'❌ Order cancelled.',
      embeds:[],
      components:[]
    });
  }

}


/* =================================
   METHOD SELECT
================================= */

async function showMethodSelect(interaction){

  const embed=new EmbedBuilder()
    .setTitle('🛍️ Method Selection 🛍️')
    .setColor(0x5865F2)
    .setDescription('🛒 Pilih metode boost yang di inginkan ');

  const select=new StringSelectMenuBuilder()
    .setCustomId('fib_method_select')
    .setPlaceholder('Gift/Via Login...')
    .addOptions(items.fishitBoost.methods);

  return interaction.reply({
    embeds:[embed],
    components:[new ActionRowBuilder().addComponents(select)],
    ephemeral:true
  });

}


/* =================================
   MODALS
================================= */

async function showGiftModal(interaction){

  const modal=new ModalBuilder()
    .setCustomId('fib_gift_modal')
    .setTitle('🍀 Boost x8 Fish It - Gift');

  modal.addComponents(
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('fib_username')
        .setLabel('👤 Username:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    )
  );

  await interaction.showModal(modal);

}

async function showLoginModal(interaction){

  const modal=new ModalBuilder()
    .setCustomId('fib_login_modal')
    .setTitle('🍀 Boost x8 Fish It - Login');

  modal.addComponents(

    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('fib_username')
        .setLabel('👤 Username:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    ),

    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId('fib_password')
        .setLabel('🔑Password:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    )

  );

  await interaction.showModal(modal);

}


/* =================================
   PACKAGE SELECT
================================= */

async function showPackageSelect(interaction){

  const userId=interaction.user.id;
  const method=session.getSession(userId)?.method??'';

  const available=await loadItems(method);

  if(available.length===0){
    return interaction.reply({
      content:'⚠️ No packages available right now.',
      ephemeral:true
    });
  }

  const embed=new EmbedBuilder()
    .setTitle(' 🍀x8 Boost🍀')
    .setColor(0x5865F2)
    .setDescription('🍀Pilih durasi boost x8 :');

  const select=new StringSelectMenuBuilder()
    .setCustomId('fib_package_select')
    .setPlaceholder('Pilih durasi....')
    .addOptions(
      available.map(i => ({
        label: i.label,
        value: i.value
      }))
    )

  return interaction.update({
  embeds:[embed],
  components:[new ActionRowBuilder().addComponents(select)]
});

}


/* =================================
   SUMMARY
================================= */

async function showSummary(interaction){

  const s=session.getSession(interaction.user.id);

  const embed=new EmbedBuilder()
    .setTitle('🛍️ Detail Pembelian 🛍️')
    .setColor(0x5865F2)
    .setDescription(
    `📋 **Produk:** Boost x8 Fish It\n` +
    `👤 **Username:** ${s.username}\n` +
    `🛒 **Metode:** ${s.method === 'gift' ? '🎁 Gift' : '🔑 Login'}\n` +
    `🍀 **Paket Durasi:** ${s.package}`
  );

  const row=new ActionRowBuilder().addComponents(

    new ButtonBuilder()
      .setCustomId('fib_create_ticket')
      .setLabel('Create Ticket')
      .setStyle(ButtonStyle.Success)
      .setEmoji('🎫'),

    new ButtonBuilder()
      .setCustomId('fib_cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Danger)

  );

  return interaction.update({
    embeds:[embed],
    components:[row]
  });

}


/* =================================
   CREATE TICKET
================================= */

async function createTicket(interaction){

  const { createTicket: openTicket } = require('../tickets/createTicket');
  const s = session.getSession(interaction.user.id);

  const summary =
`**📋Produk:** Boost x8 Fish It
**👤Username:** ${s.username}
**🛒Metode:** ${s.method}
**🍀Paket Durasi:** ${s.package}`;

  // ✅ Declare first
  let instruction;

  // ✅ Correct condition
  if (s.method === 'gift') {
    instruction = 
`📌** Instruksi:**
• Pengiriman Boost di Private Server yang kami berikan
• Mohon tunggu admin untuk gift item mu di PS kami
• Proses dilakukan sesuai antrian
• Selesaikan pembayaran sesuai arahan admin
• Pastikan username Roblox benar
• Setelah selesai, tiket akan ditutup oleh admin`;
  } else {
    instruction = 
`📌 **Instruksi:**
• Pengiriman Boost via login akan kami proses
• Mohon standby untuk kode
• Proses dilakukan sesuai antrian
• Selesaikan pembayaran sesuai arahan admin
• Pastikan username Roblox benar
• Setelah selesai, tiket akan ditutup oleh admin`;
  }

  await openTicket(interaction, {
    orderType: 'Boost x8 Fish It',
    categoryKey: 'games',
    summaryText: summary,
    instructionText: instruction
  });

  session.deleteSession(interaction.user.id);
}

module.exports={showPriceList,handleInteraction};
