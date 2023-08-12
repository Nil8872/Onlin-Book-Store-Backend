const express = require('express');
const Category = require('../../models/category')

const router = express.Router();



router.post("/", async (req, res) => {

    const categoryData = req.body;
    try {
        const result =  await Category.create(categoryData);
        if(result){
            return res.status(200).send({success: true, message:"Category created successfully"});
        }
        return res.status(404).send({success: false, message:"Something went wrong"});
    } catch (error) {
        res.status(500).send({success: false, message:"Internal server error", error: error.message});
    }
})


router.get("/all", async (req, res) => {
    try {
        
        const categories = await Category.find();

        if(categories.length > 0){
            return res.status(200).send({success:true, message:"All categories", categories: categories});
        }
        return res.status(404).send({success:false, message:"Not Fount"})

    } catch (error) {
        res.status(500).send({success: false, message:"Internal server error", error: error.message});
    
    }
})


router.get("/byid", async (req, res)=>{
    const id = req.query.id;
    try {
        const category = await Category.findById(id).select("-__v");
        if(category){
            return res.status(200).send({success:true, category, message:"Category found"});
            
        }
        else{
            return res.status(404).send({success:false, message:"Not Found"});

        }
    } catch (error) {
        res.status(500).send({success: false, message:"Internal server error", error: error.message});
        
    }
})


router.put( "/:id" , async (req, res)=>{
    const id = req.params.id;
    const newCategory = req.body; 
    try {
        const result = await Category.findByIdAndUpdate(id, newCategory, {new: true});
        console.log(result);
        if(result){
            return res.status(200).send({success:true, message:"Category updated successfully"});
        }
        else{
            return res.status(404).send({success:fasle, message:"Category not Found"});

        }
    } catch (error) {
       return res.status(500).send({success: false, message:"Internal server error", error: error.message});
        
    }
})

module.exports = router