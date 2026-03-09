const mongoose=require('mongoose')
const schema=mongoose.Schema
const user=new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','recruiter','admin'],
        required:true
    }
    
})
const userHirola=mongoose.model('HirolaUser',user)
module.exports=userHirola