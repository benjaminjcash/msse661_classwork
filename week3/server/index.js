const express = require("express");
const PORT = 3000;
const app = express();

app.use(express.static('public'));

app.use('/css', express.static(__dirname, + '/public/css')); // http://localhost:3000/css
app.use('/js', express.static(__dirname, + '/public/js')); // http://localhost:3000/js

app.listen(PORT, function() {
    console.log('server started at http://localhost:%s', PORT);
});