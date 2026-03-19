const robuxLogin       = require('../orderflows/robuxLogin');
const robuxGamepass    = require('../orderflows/robuxGamepass');
const robuxGroupPayout = require('../orderflows/robuxGroupPayout');
const heartopia        = require('../orderflows/diamondHeartopia');
const fishit           = require('../orderflows/fishit');
const fishitBoost      = require('../orderflows/fishitBoost');
const forge            = require('../orderflows/forge');
const abyss            = require('../orderflows/abyss');
const sawahIndo        = require('../orderflows/sawahIndo');
const gameLain         = require('../orderflows/gameLain');

const items = require('../data/items');

const { 
  getDisabledItems,
  getEnabledItems
} = require('../database/supabase');

const { handleClose, handleCloseModal } = require('../tickets/closeTicket');

const FLOW_HANDLERS = {
  rl_:  robuxLogin.handleInteraction,
  rg_:  robuxGamepass.handleInteraction,
  rgp_: robuxGroupPayout.handleInteraction,
  dh_:  heartopia.handleInteraction,
  fi_:  fishit.handleInteraction,
  fib_: fishitBoost.handleInteraction,
  fo_:  forge.handleInteraction,
  ab_:  abyss.handleInteraction,
  si_:  sawahIndo.handleInteraction,
  gl_:  gameLain.handleInteraction,
};

module.exports = {
  name: 'interactionCreate',

  async execute(interaction, client) {

    /* ─────────────────────────────
       AUTOCOMPLETE
    ───────────────────────────── */

    if (interaction.isAutocomplete()) {
      try {
        const focused = interaction.options.getFocused(true) || {};
        const search = (focused.value || '').toLowerCase();

        const game = interaction.options.getString('game');
        const category = interaction.options.getString('category');

        if (!game || !items[game]) {
          return interaction.respond([]);
        }

        const gameData = items[game];

        /* CATEGORY AUTOCOMPLETE */
        if (focused?.name === 'category') {

          let categories = [];

          if (game === 'fishitBoost') {
            categories = gameData.methods.map(m => ({
              name: m.label,
              value: m.value
            }));
          }

          else if (gameData.categories) {
            categories = gameData.categories.map(c => ({
              name: c.label,
              value: c.value
            }));
          }

          else if (!Array.isArray(gameData)) {
            categories = Object.keys(gameData)
              .filter(k => k !== 'categories')
              .map(k => ({
                name: k,
                value: k
              }));
          }

          categories = categories.filter(c =>
            c.name.toLowerCase().includes(search)
          );

          return interaction.respond(categories.slice(0, 25));
        }

        /* ITEM AUTOCOMPLETE */
        if (focused?.name === 'item') {

          if (!category) return interaction.respond([]);

          let base = [];

          if (game === 'fishitBoost') {
            if (category === 'gift') base = gameData.giftPackages;
            if (category === 'login') base = gameData.loginPackages;
          }

          else if (Array.isArray(gameData)) {
            base = gameData;
          }

          else if (gameData[category]) {
            base = gameData[category];
          }

          const enabled = await getEnabledItems(game, category);

          const enabledFormatted = enabled.map(i => ({
            label: i.label,
            value: i.value
          }));

          const merged = [...base, ...enabledFormatted];

          const disabled = await getDisabledItems(game, category);

          const results = merged
            .filter(i => !disabled.includes(i.value))
            .filter(i => i.label.toLowerCase().includes(search))
            .slice(0, 25)
            .map(i => ({
              name: i.label,
              value: i.value
            }));

          return interaction.respond(results);
        }

      } catch (err) {
        console.error('Autocomplete error:', err);
        return interaction.respond([]);
      }
    }

    /* ─────────────────────────────
       SLASH COMMANDS
    ───────────────────────────── */

    if (interaction.isChatInputCommand()) {

      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (err) {

        console.error(`[Command] /${interaction.commandName} error:`, err);

        const msg = {
          content: '❌ An error occurred executing that command.',
          ephemeral: true
        };

        if (interaction.replied || interaction.deferred)
          await interaction.followUp(msg);
        else
          await interaction.reply(msg);
      }

      return;
    }

    /* ─────────────────────────────
       MODALS
    ───────────────────────────── */

    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'close_ticket_modal') {
        return handleCloseModal(interaction);
      }
    }

    const id = interaction.customId;

    /* ─────────────────────────────
       BUTTONS
    ───────────────────────────── */

    if (interaction.isButton()) {

      if (id === 'robux_login') return robuxLogin.showPriceList(interaction);
      if (id === 'robux_gamepass') return robuxGamepass.showPriceList(interaction);
      if (id === 'robux_group') return robuxGroupPayout.showPriceList(interaction);
      if (id === 'heartopia') return heartopia.showPriceList(interaction);
      if (id === 'fishit') return fishit.showPriceList(interaction);
      if (id === 'boost_fishit') return fishitBoost.showPriceList(interaction);
      if (id === 'forge') return forge.showPriceList(interaction);
      if (id === 'abyss') return abyss.showPriceList(interaction);
      if (id === 'sawah') return sawahIndo.showPriceList(interaction);
      if (id === 'game_lain') return gameLain.showPriceList(interaction);

      if (id === 'ticket_close') return handleClose(interaction);
    }

    /* ─────────────────────────────
       ORDER FLOW ROUTER
    ───────────────────────────── */

    for (const [prefix, handler] of Object.entries(FLOW_HANDLERS)) {

      if (id.startsWith(prefix)) {

        try {
          await handler(interaction);
        } catch (err) {

          console.error(`[Flow] ${prefix} handler error:`, err);

          const msg = {
            content: '❌ Something went wrong. Please try again.',
            ephemeral: true
          };

          try {
            if (interaction.replied || interaction.deferred)
              await interaction.followUp(msg);
            else
              await interaction.reply(msg);
          } catch (_) {}
        }

        return;
      }
    }
  },
};