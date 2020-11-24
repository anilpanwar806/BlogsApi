const Blogs = require('../models/blogs');
const formadible = require('formidable');
const _=require('lodash');
const fs= require('fs');



exports.create = (req, res)=>{
     let form = new formadible.IncomingForm()
     form.keepExtensions=true
     form.parse(req,(err,fields,files)=>{
         if(err){
             return res.status(400).json({
                 error:'Image could not be uploaded'
             })
         }
         let blogs = new Blogs(fields);
         

         if(files.photo){
             blogs.photo.data = fs.readFileSync(files.photo.path);
             blogs.photo.contentType = files.photo.type;
             console.log(blogs);
         }
         blogs.save((err,result)=>{
             if(err){
                 return res.status(400).json({
                     error:err
                 });
             }
             res.json(result);
         })
     })
}
