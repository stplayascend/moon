# 🌙 MoonBlox Discord Order Bot

A fully automated Discord order & ticket bot for Roblox-related services.

---

## 📋 Features

- 9 service order flows (Robux × 3, Fish It, Boost x8, Forge, Abyss, Sawah Indo, Game Lain, Heartopia)
- Automatic private ticket channel creation per order
- HTML transcript generation on ticket close
- Supabase database for disabled items & ticket records
- Admin enable/disable commands for all item categories

---

## 🚀 Setup Guide

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in all values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DISCORD_TOKEN` | Your bot token from Discord Developer Portal |
| `CLIENT_ID` | Your app's Client ID |
| `GUILD_ID` | Your Discord server ID |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_KEY` | Your Supabase anon/public key |
| `TRANSCRIPT_LOG_CHANNEL_ID` | Channel ID where transcripts are sent |
| `ADMIN_ROLE_ID` | Main admin role ID |
| `ROBUX_ADMIN_ROLE_ID` | Role ID for Robux order admins |
| `HEARTOPIA_ADMIN_ROLE_ID` | Role ID for Heartopia admins |
| `GAMES_ADMIN_ROLE_ID` | Role ID for game order admins |
| `CATEGORY_ROBUX_LOGIN` | Discord category ID for Robux Login tickets |
| `CATEGORY_ROBUX_GAMEPASS` | Discord category ID for Gamepass tickets |
| `CATEGORY_ROBUX_GROUPPAYOUT` | Discord category ID for Group Payout tickets |
| `CATEGORY_HEARTOPIA` | Discord category ID for Heartopia tickets |
| `CATEGORY_GAMES` | Discord category ID for all other game tickets |

### 3. Set up Supabase

1. Go to your [Supabase dashboard](https://supabase.com)
2. Open the **SQL Editor**
3. Paste and run the contents of `supabase-setup.sql`

This creates two tables:
- `disabled_items` – tracks which items are turned off
- `tickets` – logs every ticket created

### 4. Deploy slash commands

```bash
npm run deploy
```

### 5. Start the bot

```bash
npm start
```

---

## 🛠️ Bot Permissions Required

When inviting the bot, ensure it has:
- `View Channels`
- `Send Messages`
- `Manage Channels` (to create ticket channels)
- `Embed Links`
- `Attach Files` (for transcripts)
- `Read Message History`
- `Manage Messages`

---

## 📦 Commands

### User Commands

| Command | Description |
|---|---|
| `/link` | Deploy the order panel (admin only in practice) |

### Admin Commands

| Command | Description |
|---|---|
| `/disablefishit [category] [item]` | Disable a Fish It item |
| `/enablefishit [category] [item]` | Enable a Fish It item |
| `/disablefishitx8 [category] [item]` | Disable a Boost x8 item |
| `/enablefishitx8 [category] [item]` | Enable a Boost x8 item |
| `/disableforge [category] [item]` | Disable a Forge item |
| `/enableforge [category] [item]` | Enable a Forge item |
| `/disableabyss [item]` | Disable an Abyss item |
| `/enableabyss [item]` | Enable an Abyss item |
| `/disablesawahindo [item]` | Disable a Sawah Indo item |
| `/enablesawahindo [item]` | Enable a Sawah Indo item |

---

## 📁 Project Structure

```
moonblox-bot/
├── index.js                  # Entry point
├── deploy-commands.js        # Slash command deployer
├── config.js                 # Central config from .env
├── supabase-setup.sql        # Run this in Supabase SQL editor
├── data/
│   └── items.js              # All price lists & items — edit this to update prices
├── commands/
│   ├── link.js               # /link command
│   └── admin/                # All admin enable/disable commands
├── events/
│   └── interactionCreate.js  # Central interaction router
├── orderflows/               # One file per service flow
│   ├── sessionManager.js
│   ├── robuxLogin.js
│   ├── robuxGamepass.js
│   ├── robuxGroupPayout.js
│   ├── diamondHeartopia.js
│   ├── fishit.js
│   ├── fishitBoost.js
│   ├── forge.js
│   ├── abyss.js
│   ├── sawahIndo.js
│   └── gameLain.js
├── tickets/
│   ├── createTicket.js       # Creates private ticket channels
│   └── closeTicket.js        # Closes tickets + generates transcript
└── database/
    └── supabase.js           # All Supabase queries
```

---

## ✏️ Updating Prices

All prices and items live in `data/items.js`. Edit that file and restart the bot — no other changes needed.

---

## 🔐 Security Notes

- Passwords collected in the Boost x8 Login flow are **never stored** in Supabase — only masked in the session.
- Sessions are in-memory and cleared after each ticket is created or cancelled.
- All ticket channels are private by default.
