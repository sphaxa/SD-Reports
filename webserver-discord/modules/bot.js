const mod = require("./")
const Discord = require('discord.js');
const client = new Discord.Client();

function initBot() {
    if (mod.checks.checkServer()) {var pass = mod.checks.checkChannel();}
    client.guilds.fetch(mod.config.config.GUILD_ID).then(guild => mod.logger.send('info', 'Connected to guild: ' + guild.name));
    client.channels.fetch(mod.config.config.CHANNEL_ID).then(channel => mod.logger.send('info', 'Connected to channel: ' + channel.name));
}

function sendReportMessage(msg) {
    msg = JSON.stringify(msg)
    client.channels.cache.get(mod.config.config.CHANNEL_ID).send("<@&" + mod.config.config.SERVERS[0].ROLE_ID + ">" + msg);
}

module.exports = {client, initBot, sendReportMessage};