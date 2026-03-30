const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// 🔥 normalize helper
const norm = (v) => v?.toString().toLowerCase().trim();

/* ─────────────────────────────
   DISABLED ITEMS
──────────────────────────── */

async function getDisabledItems(game, category = null) {

  const g = norm(game);
  const c = category ? norm(category) : null;

  const { data, error } = await supabase
    .from('disabled_items')
    .select('item, category')
    .eq('game', g);

  if (error) {
    console.error('[Supabase] getDisabledItems error:', error.message);
    return [];
  }

  // 🔥 filter in JS instead (safe)
  return data
    .filter(r => !c || norm(r.category) === c)
    .map(r => norm(r.item));
}

async function disableItem(game, category, item) {

  const g = norm(game);
  const c = norm(category);
  const v = norm(item);

  const { error } = await supabase
    .from('disabled_items')
    .upsert(
      { game: g, category: c, item: v },
      { onConflict: 'game,category,item' }
    );

  if (error) {
    console.error('[Supabase] disableItem error:', error.message);
    return false;
  }

  return true;
}

async function enableItem(game, category, item) {

  const g = norm(game);
  const c = norm(category);
  const v = norm(item);

  const { error } = await supabase
    .from('disabled_items')
    .delete()
    .eq('game', g)
    .eq('category', c)
    .eq('item', v);

  if (error) {
    console.error('[Supabase] enableItem error:', error.message);
    return false;
  }

  return true;
}

/* ─────────────────────────────
   ENABLED ITEMS
──────────────────────────── */

async function getEnabledItems(game, category) {

  const g = norm(game);
  const c = norm(category);

  const { data, error } = await supabase
    .from('enabled_items')
    .select('*')
    .eq('game', g)
    .eq('category', c)
    .order('position', { ascending: true }); // ✅ FIX

  if (error) {
    console.error('[Supabase] getEnabledItems error:', error.message);
    return [];
  }

  return data.map(i => ({
    label: i.label,
    value: norm(i.value),
    position: i.position // ✅ keep position
  }));
}

async function addEnabledItem(game, category, label, value, position) {

  const g = norm(game);
  const c = norm(category);
  const v = norm(value);

  const { error } = await supabase
    .from('enabled_items')
    .upsert(
      {
        game: g,
        category: c,
        label,
        value: v,
        position // ✅ USE PASSED VALUE
      },
      {
        onConflict: 'game,category,value'
      }
    );

  if (error) {
    console.error('[Supabase] addEnabledItem error:', error.message);
    throw error;
  }
}
/* ─────────────────────────────
   TICKETS
──────────────────────────── */

async function createTicketRecord(data) {

  const { error } = await supabase
    .from('tickets')
    .insert({
      ticket_id: data.ticketId,
      channel_id: data.channelId,
      user_id: data.userId,
      username: data.username,
      order_type: data.orderType,
      summary: data.summary,
      status: 'open',
      created_at: data.openedAt || new Date().toISOString()
    });

  if (error) {
    console.error('[Supabase] createTicketRecord error:', error.message);
    return false;
  }

  return true;
}

async function closeTicketRecord(channelId) {
  const { error } = await supabase
    .from('tickets')
    .update({
      status: 'closed',
      closed_at: new Date().toISOString()
    })
    .eq('channel_id', channelId);

  if (error) {
    console.error('[Supabase] closeTicketRecord error:', error.message);
    return false;
  }

  return true;
}
/* ─────────────────────────────
   DISABLED PANEL BUTTONS
──────────────────────────── */

async function getDisabledButtons() {
  const { data, error } = await supabase
    .from('disabled_buttons')
    .select('button');

  if (error) {
    console.error('[Supabase] getDisabledButtons error:', error.message);
    return [];
  }

  return data.map(r => r.button);
}

async function disableButton(button) {
  const { error } = await supabase
    .from('disabled_buttons')
    .upsert({ button });

  if (error) {
    console.error('[Supabase] disableButton error:', error.message);
    return false;
  }

  return true;
}

async function enableButton(button) {
  const { error } = await supabase
    .from('disabled_buttons')
    .delete()
    .eq('button', button);

  if (error) {
    console.error('[Supabase] enableButton error:', error.message);
    return false;
  }

  return true;
}

module.exports = {
  supabase, // ✅ ADD THIS
  getDisabledItems,
  getEnabledItems,
  disableItem,
  enableItem,
  addEnabledItem,
  createTicketRecord,
  closeTicketRecord,
  getDisabledButtons,
  disableButton,
  enableButton
};
