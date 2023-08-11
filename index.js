const express = require('express')
const cors = require('cors')
require('dotenv').config()
const auth = require('./routes/api/auth')
const book = require('./routes/api/book');
 
const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
const {connectDatabase} = require('./db')

 

app.get("/", (req, res) => { 
    res.send("Hello, world!");
})
// app.use('/api/auth', require('./routes/auth')); 
app.use("/api/auth", auth);
app.use("/api/book", book);



app.listen( process.env.PORT || PORT, () => {
    console.log(`listening on port ${PORT}`);
})

const connection =  connectDatabase();
module.exports = {connection}