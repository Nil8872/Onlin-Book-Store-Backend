const mongoose = require('mongoose');

const userSchema  = mongoose.Schema({
    firstName: {
        type : 'string',
        required: true
    },
    lastName : {
        type : 'string',
        required: true
    },
    email : {
        type : "string",
        required : true
    },
    password :{
        type : "string",
        required : true,

    },
    cpassword : {
        type : "string",
        required : true,

    }
})

const User = mongoose.model("User", userSchema)

module.exports  = User;