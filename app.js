const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
//const expressValidator = require('express-validator')

//Routes
const authRoutes = require('./routes/userAuth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category')
const blogsRoutes = require('./routes/blogs')


//db connect
mongoose.connect(process.env.database,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>console.log("connected"))
.catch((err)=>{})


app.use(bodyParser.json());
//app.use(expressValidator());
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',blogsRoutes);
app.use(cookieParser);


    

const port = process.env.port ;

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});

