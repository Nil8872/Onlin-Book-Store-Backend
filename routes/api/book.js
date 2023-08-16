const express = require("express");
 
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../../models/book");
const  cloudinary = require('cloudinary');
const uploadBase64Image = require('../../services/cloudinary');      
const { Result } = require("express-validator");
 


router.get("/all", async (req, res) => {
  try {
    const allBooks = await Book.find();
    return res
      .status(200)
      .send({
        success: true,
        message: "successfully get all books",
        books: allBooks,
      });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `internal server error, ${error.message}`,
    });
  }
});


router.get("/byid", async (req, res) => {
    const {id} = req.query; 
    try {
        
        const book =  await Book.findById(id);
        return res.status(200).send({
            success:true,
            message: "book get successfully",
            book
        })


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `internal server error, ${error.message}`,
          });
    }


})



router.post("/", async(req, res) => {
    const bookData = req.body;

   
    const base64Image = req.body.image; 
   console.log(base64Image);
    try {

 
      const data =  await uploadBase64Image(base64Image);
       console.log(data);
        const newBookData = {...bookData, image: data.secure_url}
       
       const result =  await Book.create(newBookData);
        console.log(result)
       if(result){

         return res
           .status(200)
           .send({ success: true, message: "Book is created successfully"});
       }
      } catch (error) { 
        console.log(error);
        return res.send({
          success: false,
          message: `internal server error, ${error.message}`,
        });
      }
} );

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let updatedBookData = req.body;
  console.log(updatedBookData);
  if((req.body.image).startsWith("data:image/jpeg;base64")){
    const data =  await uploadBase64Image(req.body.image);
       
      updatedBookData = {...updatedBookData, image: data.secure_url}
     
  }
   

  try {
    const result = await Book.findByIdAndUpdate(id, updatedBookData, {
      new: true,
    }); 

    if(result){

      return res
        .status(200)
        .send({ success: true, message: "Book is updated successfully" });
    }

  } catch (error) {

    return res.send({
      success: false,
      message: `internal server error, ${error.message}`,
    });

  }
});

router.delete("/", async (req, res) => {
  const { id } = req.query;

  try {

    await Book.findByIdAndDelete(id);
    return res.status(200).send({ 
        success:true,
        message: "Book is deleted successfully" 
    });

  } catch (error) {

    return res.send({
      success: false,
      message: `internal server error, ${error.message}`,
    });

  }
});

module.exports = router;
