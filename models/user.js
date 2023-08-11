const mongoose = require('mongoose'); 
const userSchema  = mongoose.Schema({
     
    firstName: {
        type : String,
        required: true
    },
    lastName : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true,

    },
    cpassword : {
        type : String,
        required : true,

    },
    roleId : {
        type : Number,
    }
})

 
const User = mongoose.model('User', userSchema);
module.exports  = User;
 

 