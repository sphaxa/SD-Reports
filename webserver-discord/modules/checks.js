const mod = require("./")

function checkConfig()
{
    let config = mod.config.config; // Jesus
    if (!config.PORT) {mod.logger.send('warn', 'PORT is a required field')}
    if (!config.CHANNEL_ID) {mod.logger.send('warn', 'CHANNEL_ID is a required field')}
    if (!config.SERVERS) {mod.logger.send('warn', 'At least one server is required')}
    config.SERVERS.forEach(function(item, index) {
        if (!index.ROLE_ID || !index.ID) {mod.logger.send('warn', `Server number ${index + 1} is malformed`)}});
    mod.logger.send('info', 'Config check finished')
}

module.exports = {checkConfig};