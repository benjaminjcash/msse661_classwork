const express = require("express");
const fs = require('fs');
const https = require('https');
const path = require('path');
const PORT = process.env.PORT || 4443;
const app = express();

app.use(express.static('public'));

https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, './server.cert'))
}, app).listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}...`);
});
