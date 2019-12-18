//文件相关路由处理
const express=require("express");
const router=express.Router();
const auth=require("../middleware/auth");

router.get('/fileUpload',auth(),(req,res)=>{
    
   res.render('fileUpload.ejs',{d:req.session.username});
})
module.exports=router;