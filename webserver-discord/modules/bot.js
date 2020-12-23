const mod = require("./")
const Discord = require('discord.js');
const client = new Discord.Client();

function initBot() {
    if (mod.checks.checkServer()) {var pass = mod.checks.checkChannel();}
    client.guilds.fetch(mod.config.config.GUILD_ID).then(guild => mod.logger.send('info', 'Connected to guild: ' + guild.name));
    client.channels.fetch(mod.config.config.CHANNEL_ID).then(channel => mod.logger.send('info', 'Connected to channel: ' + channel.name));
}

function sendReportMessage(msg) {
    let channel = client.channels.cache.get(mod.config.config.CHANNEL_ID);
    let role_ping_id = getPingRoleForServer(msg.SERVER_ID);
    const embed = new Discord.MessageEmbed()
    .setTitle("A new Report has been made!")
    .setAuthor("SD Report Bot")
    .setColor("#000000")
    .setDescription(`<@&${role_ping_id}>, [${msg.REPORTER_NAME}]("https://www.google.com") has reported [${msg.REPORTEE_NAME}]("https://www.google.com") on [${msg.SERVER_NAME}]("https://www.google.com") for ${msg.REPORT_REASON}!`)
    .setFooter("VERSION")
    .setTimestamp()
    channel.send("<@&" + role_ping_id + ">")
    channel.send({embed})
}

function getPingRoleForServer(serverid) {
    for (var i = 0; i < mod.config.config.SERVERS.length; i++ ) {
        if (mod.config.config.SERVERS[i].ID == serverid) {
            return mod.config.config.SERVERS[i].ROLE_ID;
        }
    }
}

module.exports = {client, initBot, sendReportMessage};
