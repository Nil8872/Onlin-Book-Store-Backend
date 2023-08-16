const cloudinary = require('cloudinary');
require("dotenv").config();

          
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });


console.log(process.env.CLOUDINARY_API_KEY);

const uploadBase64Image = (base64)=>{
    return new Promise((resolve, reject)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cloudinary.v2.uploader.upload(base64, { resource_type: 'image', public_id: uniqueSuffix }, (error, result)=>{
            if(error){

                console.log(error)
                reject(error);
            }
            resolve(result);
        })
    })
}

module.exports = uploadBase64Image