const multer = require('multer')

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        const allowedFileTypes = ['image/png','image/jpeg','image/jpg']
        if(!allowedFileTypes.includes(file.mimetype)){
            cb(new error("This filetype is not supported")) //cb(error)
            return
        }
        cb(null,'./storage') //--> cb (error,sucess)
    },
    filename : function(req,file,cb){
        cb(null,Date.now() +"-" + file.originalname)
    }
    
})

module.exports = {
    storage,
    multer
}