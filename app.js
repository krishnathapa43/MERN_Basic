//write compolsory in top of nodejs program
const express = require('express')
const app = express()

const mongoose = require('mongoose');
const connectToDatabase = require('./Database');
const Book = require('./model/bookModel');


app.use(express.json())
connectToDatabase()


//multerconfig imports
const {multer,storage} = require("./middleware/multerConfig")
const upload = multer({storage : storage})

//Alternative
// Const app = require ('express') ()   


//json code
app.get("/",(req,res)=>{
    res.status(200).json({
        "name" : "krishna Bahadur Thapa",
        "age":22
    })
})

//CRUD operation (Book management System) 
//Create book a API , create table book and connect with mongodb

app.post("/book",upload.single("image"), async(req,res)=>{
    
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body
    await Book.create({
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication
   })
   res.status(201).json({
    message : "Book created Successfully"
   })
})

//Read All Book table
app.get("/book",async (req,res)=>{
    const books =await Book.find()   //find = return array ma garxa
    res.status(200).json({
        message : "Books fetched successfully",
        data :books
    })
})

//Read single Book data from table
app.get("/book/:id",async (req,res)=>{
    const id = req.params.id
    const book =await Book.findById(id)  //findByid = return object garxa
    if(!book){
        res.status(404).json({
        message : "NOthing Found"
    })
}else{
    res.status(200).json({
        message : "single Book Fetched Successfully",
        date : book
    })
}
})

//Delete operation
app.delete("/book/:id",async(req,res)=>{
    const id = req.params.id
    await Book.findByIdAndDelete(id)
    res.status(200).json({
        message : "Book Delete Sucessfully"
    })

})

//Update operation using patch
app.patch("/book/:id",async (req,res)=>{
    const id = req.params.id //kun book update garnea id ho yo
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body
    await Book.findByIdAndUpdate(id,{
        bookName : bookName ,
        bookPrice : bookPrice,
        isbnNumber : isbnNumber,
        authorName : authorName,
        publishedAt : publishedAt,
        publication : publication
    })
    res.status(200).json({
        message : "Book Updated Sucessfully"
    })
})





app.listen(3000,()=> {
    console.log("Nodejs server has started at port 3000")

})
