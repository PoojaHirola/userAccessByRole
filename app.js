const express=require('express')
const app=express()
const db=require('./db/db')
const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(express.json());
const userRoute=require('./route/route')
app.use(userRoute)
app.use('/hirola',(req,res)=>{
    res.status(200).json({message:"my first deployed project"})
})
app.listen(3000,()=>{
    db()
    console.log("server is running 3000")
})