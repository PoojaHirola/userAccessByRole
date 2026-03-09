const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const connectDb=async()=>{
    try{
       await mongoose.connect(process.env.mongoDb_url)
       console.log('mongodb connected')
    }
    catch(err){
        console.log(err)
    }
}
module.exports=connectDb