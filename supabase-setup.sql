-- ============================================================
--  MoonBlox Bot – Supabase Schema
--  Run this in your Supabase SQL editor to set up all tables.
-- ============================================================

-- Table: disabled_items
-- Stores items that admins have disabled from appearing in menus.
CREATE TABLE IF NOT EXISTS disabled_items (
  id         BIGSERIAL PRIMARY KEY,
  game       TEXT NOT NULL,
  category   TEXT NOT NULL DEFAULT '',
  item       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (game, category, item)
);

-- Table: tickets
-- Stores a record of every ticket created by the bot.
CREATE TABLE IF NOT EXISTS tickets (
  id          BIGSERIAL PRIMARY KEY,
  ticket_id   TEXT NOT NULL UNIQUE,   -- e.g. "order-shrey-1234"
  channel_id  TEXT NOT NULL UNIQUE,
  user_id     TEXT NOT NULL,
  username    TEXT NOT NULL,
  order_type  TEXT NOT NULL,
  summary     TEXT,
  status      TEXT NOT NULL DEFAULT 'open',  -- 'open' | 'closed'
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  closed_at   TIMESTAMPTZ
);

-- Optional indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_disabled_items_game ON disabled_items(game, category);
CREATE INDEX IF NOT EXISTS idx_tickets_channel ON tickets(channel_id);
CREATE INDEX IF NOT EXISTS idx_tickets_user ON tickets(user_id);
