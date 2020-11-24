const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required:true,
        maxlength:32
    },
    email:{
        type: String,
        trim:true,
        required:true,
        unique:32
    },
    password:{
        type: String,
        required:true,
        
    },
    role:{
        type:Number,
        default:0
    },
    blogs:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'blogs'
        }
    ]
        
    

},
{timestamps:true})

//hash password
userSchema.pre('save', async function(next){
    try{
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(this.password,salt);
this.password=hashedPassword;
next();
console.log(this.email,this.password);
    }
    catch(error){
        next(error);
    }

})

//validating password
userSchema.methods = {
isValidPassword :  function(newPassword){
try{
    const pass= newPassword;

return bcrypt.compareSync(pass,this.password)

}
catch(error)
{
throw new Error(error);
}
}
}

module.exports = mongoose.model("User",userSchema);




