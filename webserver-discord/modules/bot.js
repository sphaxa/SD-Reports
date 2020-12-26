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
    let server_name = getNameForServer(msg.SERVER_ID);
    const embed = new Discord.MessageEmbed()
    .setTitle("New Report")
    .setAuthor('SD Reports', 'https://i.imgur.com/CJvAgsd.png', 'https://github.com/sphhax/SD-Reports')
    .setColor("#2874e6")
    .setThumbnail('https://i.imgur.com/CJvAgsd.png')
    .addFields(
        { name: 'Reported Player', value: `${msg.REPORTEE_NAME}` },
        { name: 'Report Reason', value: `${msg.REPORT_REASON}` },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Reporter', value: `${msg.REPORTER_NAME}`, inline: true },
        { name: 'Server', value: `${server_name}`, inline: true },
        { name: 'Status', value: `NOT CLAIMED`, inline: true }
	)
    .setFooter("🌿 0.1.0")
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

function getNameForServer(serverid) {
    for (var i = 0; i < mod.config.config.SERVERS.length; i++ ) {
        if (mod.config.config.SERVERS[i].ID == serverid) {
            return mod.config.config.SERVERS[i].NAME;
        }
    }
}

module.exports = {client, initBot, sendReportMessage};
