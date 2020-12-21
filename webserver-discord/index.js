require('dotenv').config();
require('console-info');
require('console-warn');
require('console-error');
const mod = require('./modules');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  run_check = mod.helper.checkServer();
  if (!run_check[0]) mod.helper.sendOutput('error', run_check[1]);

});

client.login(process.env.DISCORD_BOT_TOKEN);