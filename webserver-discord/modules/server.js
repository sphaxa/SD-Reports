const express = require('express')
const app = express()
const http = require('http')

app.get('/', function(req, res) {
    
})

var httpServer = http.createServer(app);
 module.exports = {app, httpServer}