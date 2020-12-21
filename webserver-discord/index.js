require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  run_check = checkServer();
  if (!run_check[0]) sendError(run_check[1]);
  
});

/*
    HELPER FUNCTIONS
*/

//Check server to make sure we have the right permissions, as well as validate the channel and role id.
function checkServer()
{
    if (!process.env.CHANNEL_ID || !process.env.PING_ROLE_ID || !process.env.SECURITY_KEY)
        return [false, 'Plugin is misconfigured\nPlease fill out .env'];

}

function sendError(error)
{
    console.log("ERROR: " + error);
}

client.login(process.env.DISCORD_BOT_TOKEN);