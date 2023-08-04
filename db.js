const mongoose = require('mongoose');
require("dotenv").config();

const connectDatabase =  () =>{

    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("DB connection established");
    }).catch(err =>console.log("Error connecting: ", err))
}

module.exports = connectDatabase;