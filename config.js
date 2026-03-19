require('dotenv').config();

module.exports = {
  // Channels
  publicTranscriptChannelId: process.env.PUBLIC_TRANSCRIPT_CHANNEL_ID,
  transcriptLogChannelId: process.env.TRANSCRIPT_LOG_CHANNEL_ID,

  // Roles
  adminRoleId:        process.env.ADMIN_ROLE_ID,
  robuxLoginRoleId: process.env.ROBUX_LOGIN_ROLE_ID,
  robuxGamepassRoleId: process.env.ROBUX_GAMEPASS_ROLE_ID,
  robuxPayoutRoleId: process.env.ROBUX_PAYOUT_ROLE_ID,
  gamesAdminRoleId:   process.env.GAMES_ADMIN_ROLE_ID,

  // Ticket categories (Discord category channel IDs)
  categories: {
    robuxLogin:      process.env.CATEGORY_ROBUX_LOGIN,
    robuxGamepass:   process.env.CATEGORY_ROBUX_GAMEPASS,
    robuxGroupPayout: process.env.CATEGORY_ROBUX_GROUPPAYOUT,
    heartopia:       process.env.CATEGORY_HEARTOPIA,
    games:           process.env.CATEGORY_GAMES,
  },
};
