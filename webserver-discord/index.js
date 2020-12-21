require('dotenv').config();
require('console-info');
require('console-warn');
require('console-error');
const mod = require('./modules');

mod.bot.client.on('ready', () => {
  mod.helper.sendOutput('info', 'Bot token authorized, bot online')
  run_check = mod.helper.checkServer();
  if (!run_check[0]) mod.helper.sendOutput('error', run_check[1]);

});

mod.bot.client.login(process.env.DISCORD_BOT_TOKEN);