const express = require("express");
 
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../../models/book");

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
    try {
    
        const newBookData = {...bookData, image: req.file}
        console.log(newBookData); 
    
        return res
          .status(200)
          .send({ success: true, message: "Book is created successfully", newBookData });
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
  const updatedBookData = req.body;

  try {
    const result = await Book.findByIdAndUpdate(id, updatedBookData, {
      new: true,
    }); 

    return res
      .status(200)
      .send({ success: true, message: "Book is updated successfully" });

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
