const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema



const blogSchema = new mongoose.Schema({
 
    title:{
        type: String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type: String,
        required:true,
    },
    category:{
        type: ObjectId,
        ref: 'Category',
        required:true,
        maxlength:32
        
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    author:{
        type:ObjectId,
        ref:'User'
    }
},

{timestamps:true})

module.exports = mongoose.model("Blogs",blogSchema)
