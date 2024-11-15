const express = require('express')
const app = express()

//Alternative
// Const app = require ('express') ()


app.get("/",(req,res)=>{
    res.status(200
        
    ).json({
        "name" : "krishna Bahadur Thapa",
        "age":22
    })
})




app.listen(3000,()=> {
    console.log("Nodejs server has started at port 3000")
})