const express = require('express');
var path = require('path');

const app = express();

// serve files in this directory statically
app.use(express.static(path.join(__dirname)));

// serve index.html at base path
app.get('/', function(req, res) {
    res.sendFile('index.html');
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
