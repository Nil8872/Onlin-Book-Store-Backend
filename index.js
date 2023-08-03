const express = require('express');
const app = express();
require('dotenv').config(); 
const  PORT = 5000;

app.get("/", (req, res) => {
    res.send("Hello, world!");
})

app.listen( process.env.PORT || PORT, () => {
    console.log(`listening on port ${PORT}`);
})