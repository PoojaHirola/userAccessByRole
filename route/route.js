const express=require('express')
const router=express.Router()
const {userRegister,userLogin,getDetail}=require('../controller/userController')
const {authenticated}=require('../middeware/mid')
router.post('/register',userRegister)
router.post('/login',userLogin)
router.get('/getData',authenticated,getDetail)
module.exports=router;