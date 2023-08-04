const express = require('express');
const app = express();
require('dotenv').config(); 
const connectDatabase = require('./db')

const  PORT = 500

app.get("/", (req, res) => {
    res.send("Hello, world!");
})

app.listen( process.env.PORT || PORT, () => {
    console.log(`listening on port ${PORT}`);
})

connectDatabase();