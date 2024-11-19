//write compolsory in top of nodejs program
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const connectToDatabase = require('./Database');


connectToDatabase()

//Alternative
// Const app = require ('express') ()   

//json code
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
