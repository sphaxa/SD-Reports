function send(type, message)
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
            console.warn("WARN  | " + currDate + " | " + message)
            break;
    }
}

module.exports = {send}