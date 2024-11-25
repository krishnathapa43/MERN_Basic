
//Connect with Mangodb database
const mongoose = require('mongoose')

const ConnectionString = "mongodb+srv://crissnathapa1020:crissnathapa1020@cluster0.3gyfa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function connectToDatabase(){
    await mongoose.connect(ConnectionString)
    console.log("Connected To DB Sucessfully")
}



module.exports = connectToDatabase
 
 
