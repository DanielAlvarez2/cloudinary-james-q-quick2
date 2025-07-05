const express = require('express')
const app = express()
const {cloudinary} = require('./utils/cloudinary.js')
app.use(express.json({limit:'50mb'})) //parses data from req.body into a JS Object
app.use(express.urlencoded({limit:'50mb', extended:true})) //delete?deprecated?accepts data from forms
app.post('/api/upload',async(req,res)=>{
    try{
        const fileStr = req.body.data //add: app.use(express.json()) AND app.use(express.urlencoded()) 
        const uploadedResponse = await cloudinary.uploader.upload(  fileStr,{
                                                                    upload_preset:'dev_setups'
                                                                    })
        console.log(uploadedResponse)
        res.json({msg:'YAYAYAYYA'})
    }catch(err){
        console.log(err)
        res.status(500).json({err:'Something went wrong'})
    }
})
const port = process.env.PORT || 5174
app.listen(port,()=>console.log(`Server Listening on Port: ${port}`))