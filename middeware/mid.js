const jwt=require('jsonwebtoken')
const authenticated=async(req,res,next)=>{
    try{
    const auth=req.header('Authorization')
    if(!auth){
        return res.status(403).json({
            message:'Unauthorized',
            success:false
        })
    }
    const decoded=jwt.verify(auth,"pooja")
    req.user=decoded
    next()
    }
    catch(err){
        console.log(err)
    }

}
module.exports={authenticated}