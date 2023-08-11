const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        
        name: {
            type: String,
            require : true,
        }  ,
        description:  {
            type: String,   
            require : true,
        },
        price: {
            type:Number,
            require : true,
        },
        categoryId: {
            type: Number,
            required : true,
        },
        category:{
            type: String,
            // required : true,
        },
         
        base64image : {
            type:String,
            // required : true,
        } 
      }
)


const Book = mongoose.model("Book", bookSchema)
module.exports = Book;