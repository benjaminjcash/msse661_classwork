const express = require("express");
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.static('public'));

app.use('/css', express.static(__dirname, + '/public/css'));
app.use('/js', express.static(__dirname, + '/public/js'));

app.listen(PORT, function() {
    console.log(`Server listening on PORT ${PORT}...`);
});
