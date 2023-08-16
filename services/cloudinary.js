const cloudinary = require('cloudinary');


          
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });




const uploadBase64Image = (base64)=>{
    return new Promise((resolve, reject)=>{
        cloudinary.v2.uploader.upload(base64, { resource_type: 'image', public_id: "olympic_flag" }, (error, result)=>{
            if(error){

                console.log(error)
                reject(error);
            }
            resolve(result);
        })
    })
}

module.exports = uploadBase64Image