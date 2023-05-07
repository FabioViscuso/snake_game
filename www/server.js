require('dotenv').config();
const express = require('express');
const app = express();
const compression = require('compression');
const path = require('path');
const public = path.join(__dirname, "public");

const PORT = process.env.PORT;

app.use(compression());
app.use(express.static(public));

app.get('*', (req, res) => {
    res.sendFile(public + "/index.html");
});

app.listen(PORT, () => {
    console.log("server running");
})
