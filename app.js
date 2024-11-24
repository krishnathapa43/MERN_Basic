//write compolsory in top of nodejs program
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const connectToDatabase = require('./Database');
const Book = require('./model/bookModel');

app.use(express.json())
connectToDatabase()

//Alternative
// Const app = require ('express') ()   

//json code
app.get("/",(req,res)=>{
    res.status(200).json({
        "name" : "krishna Bahadur Thapa",
        "age":22
    })
})

//Create book a API , create table book and connect with mongodb
app.post("/book",async(req,res)=>{
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

//Read All Book 
app.get("/book",async (req,res)=>{
    const books =await Book.find()   //find = return array ma garxa
    res.status(200).json({
        message : "Books fetched successfully",
        data :books
    })
})

//Read single Book
app.get("/book/:id",async (req,res)=>{
    const id = req.params.id
    const book =await Book.findById(id)  //findByid = return object garxa
    console.log(book)
    res.json({
        message : "single Book Fetched Successfully",
        date : book
    })
})



app.listen(3000,()=> {
    console.log("Nodejs server has started at port 3000")

})
