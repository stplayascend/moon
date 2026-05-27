const createCatalogFlow = require('./catalogFlow');

module.exports = createCatalogFlow({
  flowPrefix: 'da',
  dataKey: 'dragonAdventures',
  productName: 'Dragon Adventures',
  priceListTitle: '🐉 Dragon Adventures - Price List',
  usernameModalTitle: '🐉 Dragon Adventures - Order',
  instructionText:
`📌** Instruksi:**
• Pengiriman item di private server yang kami berikan
• Mohon tunggu admin untuk gift item mu di PS kami.
• Proses dilakukan sesuai antrian (jika mengantri)
• Selesaikan pembayaran sesuai arahan admin.
• Pastikan username Roblox kamu sudah benar sebelum admin memproses.
• Setelah selesai, tiket akan ditutup oleh admin.`,
});
