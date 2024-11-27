//write compolsory in top of nodejs program
const express = require('express')
const app = express()

const mongoose = require('mongoose');
const connectToDatabase = require('./Database');
const Book = require('./model/bookModel');
const fs = require('fs')



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
    console.log(req.file)
    let fileName ;
    if(!req.file){
        fileName = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAqwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFAQIGB//EADQQAAICAQIEBAMHAwUAAAAAAAABAgMRBEESITFRBRMykWFxsRQiI0JSgaFyovAVJDNiY//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9bAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACSumUufSO8mBGMN9FkWavSUcoJ3S+HQrz8VvfKqEK/wBsgWeCX6JewcWusWvmil/qWsz/AMv9qPUfFNUvVKM18YoC0DxDxKqzlqKOH/tAsRrhdHj01inHs+qAiAfJvPUAAAAAAAAAAAAAAAAkgoVwlfd6Ibd2Afl6evztR0/LDeRmavWW6ltSfDXtBdDzqb56m1zs/ZdkQgAubwubOpNtJdWben08KI4ivvbvuBk1aa61ZhW8d3yR4tqsqeLINfHY3hJKUWpLKezA+ePVdk6p8cJuMluixr9OqLE4eiXRdmVQNjTauGsxXdiF20l0kJQlCTjJc0Y++dzY0eoWsp4Jv8eC5P8AUgOAb9MAAAAAAAAAAAAOxXFJR3fIr+LXffjp4coQ9WN2XdNiMpWPpCLZiSm7JynJ5cm2wOHAAPdLxdBvopLPubxhaeMZX1xn6XJJm6ljC6cgAAAoeLY4Kl3bZmmh4tGP4c36ny/YzwBJTbKm2NkOsX7kYA3L+GShbD0WLJEefD5uzQTg+bqllfI9AAAAAAAAAAAB21uHh2pkurxH3wjHNjUc/C7/AOqP1RjgAAA3zubOiv8APqbl6k8PBjF/whPzLXnlhZA0gCLV5+zWcPXhYGVrNR9otz+WPKJAAAAAGj4K822we9ef89yYr+Cr/dzf/k/qiwAAAAAAAAAAAEkY+ZptRV3hlfMxE8m3p58FsW+nRmXrqfs+qnDH3c5j8gICSqmy1/hwcvjsiz4dp42t2WLME8JPdmokksJAZ1Xhrzm2fLdRL9VcKYKNcUkegAH0AAp6jw+uzMq3wS7bFO3RX18+FSXeJsAD57INnV6aN1bailYujS6mNy6AaXg8eGq+3GyiiRdCSFb0+iqq6Sk+KR4AAAAAAAAAAABsd1dP2vS5is21Lp3Rw9VzdclJdQGhhwaWCa5vn7lg98rI8cOm67HkDgAAAAAAAOmfpdJnW2TsWKq5Z57vY0YRcn2W7IdRapLgh6F/IEds/Mm55+SPIAAAAAAAAAAAAAAB6rm63mLwyzC2u3tGXxKgAuODT6HkhrushyTyuzJY6lfnrX7MDoHn0/ofuceprXpr92B6UW3hLJ6ajDnY0vgQS1M5LEcQ+RC228ttvuBLde5rhiuGH1IgAAAAAAAAAAAAAAADhxgdyOJEUskU1LbIFnjj3XuOOG7M+xWbZK84388Nga/mQ7/yPMg9/wCTEcdR3YUdR3YG5xx7r3HEu6MiEb+WWyxBW75A0MgrwUt8kscgSA4joAAAAAAAAAAAAABwYXYABwrsc4V2OgDnBHshwR7IADvCuwwgAB0ADh0AAAAAAA//2Q=="
    }else{
        fileName = "http://localhost:3000/" + req.file.filename
    }
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body
    await Book.create({
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication,
    imageurl : fileName
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
app.patch("/book/:id",upload.single('image'),async (req,res)=>{
    const id = req.params.id //kun book update garnea id ho yo
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body
    const oldDatas = await Book.findById(id)

    let fileName;

    if(req.file){
        const oldImagespath = oldDatas.imageurl
        console.log(oldImagespath)
        const localHosturlLength = "http://localhost:3000".length
        const newOldImgaepath = oldImagespath.slice(localHosturlLength)
        console.log(newOldImgaepath)
        fs.unlink(`storage/${newOldImgaepath}`,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("File Deleted Sucessfully.")
            }
        })
        fileName = "http://localhost:3000/" + req.file.filename
    }
    await Book.findByIdAndUpdate(id,{
        bookName : bookName ,
        bookPrice : bookPrice,
        isbnNumber : isbnNumber,
        authorName : authorName,
        publishedAt : publishedAt,
        publication : publication,
        imageurl : fileName
    })
    res.status(200).json({
        message : "Book Updated Sucessfully"
    })
})


// to give the read access from the storage to user 
app.use(express.static("./storage/"))

app.listen(3000,()=> {
    console.log("Nodejs server has started at port 3000")

})
