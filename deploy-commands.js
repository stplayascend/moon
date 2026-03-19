require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs   = require('fs');
const path = require('path');

const commands = [];

function collectCommands(dir) {
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js'))) {
    const cmd = require(path.join(dir, file));
    if (cmd?.data) {
      commands.push(cmd.data.toJSON());
      console.log(`  + /${cmd.data.name}`);
    }
  }
}

console.log('Collecting commands...');
collectCommands(path.join(__dirname, 'commands'));
collectCommands(path.join(__dirname, 'commands', 'admin'));

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`\nDeploying ${commands.length} slash command(s) to guild ${process.env.GUILD_ID}...`);

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );

    console.log('✅ All commands deployed successfully!');
  } catch (err) {
    console.error('❌ Deployment failed:', err);
  }
})();
