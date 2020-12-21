function checkServer()
{
    if (!process.env.CHANNEL_ID || !process.env.PING_ROLE_ID || !process.env.SECURITY_KEY)
        return [false, 'Plugin is misconfigured. Please fill out .env'];

}

module.exports = {checkServer};