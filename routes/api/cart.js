const express = require('express');
const router = express.Router();
const Cart = require("../../models/cart");
const Book = require("../../models/book");
// const { Promise } = require('mongoose');

router.get("/", async (req, res)=>{
    const userId =  req.query.userId;

    try {
 
        const carts = await Cart.find({userId});

        if(carts.length > 0){

            const promisesArray = carts.map( async(cart)=>{
                const book = await Book.findById(cart.bookId);
                return {...cart.toObject(), book};
            })

            const result = await Promise.all(promisesArray);

            return  res.status(200).send({success: true, message: "All cart items were successfully", result})
        }
        else{
            res.status(200).send({success:true, message:"No any items were found", result : []})
        }
        
    }catch (error) {
        console.log(error)
        return res.status(500).send({success: false, message:"Internal server error", errorMassage: error.message});
    }
})


router.post("/", async (req, res)=>{

    const cartData = req.body;

    try {

       const result =  await Cart.create(cartData);
       if(result ) {
        return res.send({success: true, message: "Book is added to cart successfully"});
       }else{
        return res.send({success: false, message: "Book is not added to cart successfully"});
       }
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({success: false, message:"Internal server error", errorMassage: error.message});
    }
    
})


router.put("/", async (req,res)=>{
    const {cartId, ...updatedData } = req.body;
    
    try {
        const result = await Cart.findByIdAndUpdate(cartId, updatedData);
        if(result){
            
            res.send({success: true, message: "Cart is updated successfully"});
        }else{
            res.send({success: false, message: "Cart cannot updated. please try again"});
        }
        
    } catch (error) {
        return res.status(500).send({success: false, message:"Internal server error", errorMassage: error.message});
        
    }

})



router.delete("/", async (req, res)=>{
    
    const id = req.query.cartId;
    try {
        const result =  await Cart.findByIdAndDelete(id);
        if(result){
            res.send({success: true, message: "Cart is deleted successfully"});
        }else{
            res.send({sucess: false, message: "Cart is not deleted"});
        }
        
    } catch (error) {
        return res.status(500).send({success: false, message:"Internal server error", errorMassage: error.message});
        
    }
})



module.exports = router;