const express = require("express");
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.static('public'));

app.listen(PORT, function() {
    console.log(`Server listening on PORT ${PORT}...`);
});
