const mod = require("./")
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http')

app.use(bodyParser.urlencoded())

app.post('/report', function(req, res) {
    if (!mod.checks.checkSecurity(req.body.SECURITY_KEY)) {mod.logger.send('warn', 'An unauthorized report was attempted'); res.status(401).send("The server has refused our key");return;}
    if (!mod.checks.checkReport(req.body)) {mod.logger.send('error', `Server with id ${req.body.SERVER_ID} not found`); res.status(403).send("This server's ID doesn't exist in web config");return;}
    mod.logger.send('info', `New report - ${req.body.REPORTER_NAME} has reported ${req.body.REPORTEE_NAME} for ${req.body.REPORT_REASON}`);
    mod.bot.sendReportMessage(req.body);
    res.send("Your report has been submitted");
})

var httpServer = http.createServer(app);
 module.exports = {app, httpServer}