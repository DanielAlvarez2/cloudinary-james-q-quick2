const express = require('express')
const app = express()
app.use(express.json({limit:'50mb'})) //parses data from req.body into a JS Object
app.use(express.urlencoded({limit:'50mb', extended:true})) //delete?deprecated?accepts data from forms
app.post('/api/upload',(req,res)=>{
    try{
        const fileStr = req.body.data //add: app.use(express.json()) AND app.use(express.urlencoded()) 
        console.log(fileStr)
    }catch(err){
        console.log(err)
    }
})
const port = process.env.PORT || 5174
app.listen(port,()=>console.log(`Server Listening on Port: ${port}`))