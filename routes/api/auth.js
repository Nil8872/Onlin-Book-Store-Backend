require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");


// post method for creating a new user 
router.post("/createuser", [ 
    body("firstName", "Please enter First Name").trim().notEmpty(),
    body("lastName", "Please enter Last Name").trim().notEmpty(),
    body("email", "Please enter Email").isEmail().withMessage('Not a valid e-mail address').trim(),
    body("password", "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.")
    .isLength({ min: 8 })
    .matches(/\d/).withMessage('must contain a number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('must contain a special character')
    .matches(/[a-z]/).withMessage('must contain a lowercase letter')
    .matches(/[A-Z]/).withMessage('must contain an uppercase letter'),
    body("cpassword", "Please enter Confirm Password").custom((value, { req }) => {
        if(value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
      
], async (req, res) => {
    const userData = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {

        const user = await User.findOne({email: userData.email})

        if(!user){

            const salt = bcrypt.genSaltSync(10);
            const hashPassword =  bcrypt.hashSync(userData.password,salt);

            await User.create({...userData, password: hashPassword});
            res.send({success: true, message:"User created successfully"}); 
        }
        else{
            res.status(400).send({success: false, message:"Email is already exist. please try with different email"})
        }
         

    } catch (error) {
        // res.send({success: false, message:"Somethis is wrong..", error: error}); 
        // console.log(error);
        res.status(500).send("Internal server Error");
    }

})

router.post('/login',
[
    body("email", "Please enter Email").isEmail().withMessage("Please enter valid email address"),
    body("password", "Please enter password.")
], 
async(req, res) => {

    const errors = validationResult(req);
    const email = req.body.email; 
    const password = req.body.password; 
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        
        const user = await User.findOne({email});
         
       
        if(!user){

            res.status(400).json({success:false, message:"Please enter valid credential"});
        }
        else{   

            const passwordCompare = await bcrypt.compare(password, user.password);

            if(!passwordCompare){
               res.status(400).json({success:false, message:"Please enter valid credential"});
            }
            res.json({success : true, message:"User logged in successfully"});

        }
         


         
    } catch (error) { 
        // console.log(error);
        res.status(500).send("Internal server Error");
    }
})

module.exports = router;