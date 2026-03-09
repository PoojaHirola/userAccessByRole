const userModel=require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userRegister=async(req,res)=>{
    try{
      const{name,email,role,password}=req.body
      const user=await userModel.findOne({email})
      if(user){
        return res.status(203).json({
            message:"user already exist",
            success:false
        })
      }
      const hashPassword=await bcrypt.hash(password,10)
      await userModel.create({
        name:name,
        email:email,
        role:role,
        password:hashPassword
      })
      return res.status(200).json({
        message:"user Register",
        success:true
      })

    }
    catch(err){
        console.log(err)
    }
}
const userLogin=async(req,res)=>{
    try{
      const{email,password,role}=req.body
      const user=await userModel.findOne({email})
      if(!user){
        return res.status(302).json({
            message:'email not matched',
            success:false
        })
      }
       const passwordMatch=await bcrypt.compare(password,user.password)
       if(!passwordMatch){
          return res.status(403).json({
            message:"password not matched",
            success:false
          })
       }
       if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };
       const jwtToken=jwt.sign({
        userId:user._id,
        email:user.email
       },"pooja",{expiresIn:"1d"})

       return res.status(200).json({
        message:"login success",
        success:true,
        token:jwtToken
       })
    }
    catch(err){
        console.log(err)
    }
}
const getDetail=async(req,res)=>{
    try{
      const userId=req.user.userId
      let user=await userModel.findById(userId)
     if(!user){
      return res.status(200).json({message:"user not found",
        
      })
     }
    

     return res.status(200).json({
      user,
      message:"user data get successfully",
      success:true
     })
    }
    catch(err){
        console.log(err)
    }
}
module.exports={userRegister,userLogin,getDetail}
