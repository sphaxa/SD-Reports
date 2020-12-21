require('dotenv').config();
require('console-info');
require('console-warn');
require('console-error');
const mod = require('./modules');

mod.bot.client.on('ready', () => {
  mod.logger.send('info', 'Bot token authorized, bot online');

  //Using this method for checks we stop execution of the check on the first error, but script execution does not stop
  run_check = mod.checks.checkServer();
  if (!run_check[0]) mod.logger.send('warn', run_check[1] + ". This will be an error in the future");
  
});

mod.server.app.listen(process.env.PORT, () => {
  mod.logger.send('info', 'Server listening on port ' + process.env.PORT);
})

mod.bot.client.login(process.env.DISCORD_BOT_TOKEN);