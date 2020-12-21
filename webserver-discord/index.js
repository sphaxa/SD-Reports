require('dotenv').config();
require('console-info');
require('console-warn');
require('console-error');
const mod = require('./modules');

// DISCORD BOT
mod.bot.client.on('ready', () => {
  mod.logger.send('info', 'Bot token authorized, bot online');
  mod.checks.checkConfig();
});

// WEB SERVER
mod.server.httpServer.listen(mod.config.config.PORT, () => {
  mod.logger.send('info', 'Server listening on port ' + mod.config.config.PORT);
})

mod.bot.client.login(process.env.DISCORD_BOT_TOKEN);