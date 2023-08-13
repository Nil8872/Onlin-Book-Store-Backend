const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        
        bookName: {
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
            type: String,
            // required : true,
        },
        category:{
            type: String,
            required : true,
        },
         
        image : {
            type:String,
            required : true,
        } 
      }
)


const Book = mongoose.model("Book", bookSchema)
module.exports = Book;