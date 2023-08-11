const mongoose = require('mongoose');
require("dotenv").config();
const autoIncrement = require('mongoose-auto-increment');
let connection;

const connectDatabase =  async() =>{

    //  connection =  mongoose.createConnection(process.env.DATABASE_URL);
    // autoIncrement.initialize(connection);

    // connection.on('connected', () => {
    //     console.log('Connected to the database!');
    // });

    // connection.on('error', (err) => {
    //     console.error('Failed to connect to the database:', err);
    // });
    
    // return connection;
     
    mongoose.connect(process.env.DATABASE_URL).then((connection)=>{
        console.log("DB connection established");
    }).catch(err =>console.log("Error connecting: ", err))
}

module.exports = {connectDatabase};
