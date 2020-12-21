function checkServer()
{
    if (!process.env.CHANNEL_ID || !process.env.PING_ROLE_ID || !process.env.SECURITY_KEY)
        return [false, 'Plugin is misconfigured. Please fill out .env'];

}

function sendOutput(type, message)
{
    var currDate = new Date().toLocaleString();
    switch(type) {
        case 'error':
            console.error("ERROR | " + currDate + " | " + message)
            break;
        case 'info':
            console.info("INFO  | " + currDate + " | " + message)
            break;
        case 'warn':
            console.info("WARN  | " + currDate + " | " + message)
            break;
    }
}

module.exports = {checkServer, sendOutput};