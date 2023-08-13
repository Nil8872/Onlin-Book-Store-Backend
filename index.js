    const express = require('express')
    const path = require('path')
    const cors = require('cors') 
    const fs = require('fs-extra'); 
    
    require('dotenv').config()
    const multer = require('multer');
    // const upload = multer({dest:'Images/'});
    // const upload = multer({ dest: 'uploads/' })


    const storage = multer.diskStorage({
        destination: async function (req, file, cb) {
            const dir = `Nilesh/images/`;
            await fs.ensureDir(dir);
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix);
        }
    });

    const upload = multer({storage,
        fileFilter:   (req, file, cb) =>{
            const fileTypes = /jpg|jpeg|png/
            const mimeTypes = fileTypes.test(file.mimetype);
            const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
            
            

            if(mimeTypes && extname){
            return cb(null, true);
            }

            cb(new Error('Error: File upload only supports the following filetypes - ' + fileTypes));
        }
    })




    const auth = require('./routes/api/auth')
    const book = require('./routes/api/book')
    const category = require('./routes/api/category')


    const app = express()
    const PORT = process.env.PORT || 5000;

    app.use(cors()) 
    app.use(express.json());
  


    app.use("/Images", express.static("Images"))
    app.use("/Nilesh/images", express.static("Nilesh/Images"))


    const {connectDatabase} = require('./db')

    

    app.get("/", (req, res) => { 
        res.send("Hello, world!");
    }) 

    app.use("/api/auth", auth);
    app.use("/api/book",upload.single("image"), book);
    app.use("/api/category", category);



    app.listen( process.env.PORT || PORT, () => {
        console.log(`listening on port ${PORT}`);
    })

 
    const connection =  connectDatabase();
    module.exports = {connection}