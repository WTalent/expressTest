//渲染文章添加页面和文章添加功能
const express=require("express");
const posts=require("../module/posts");
const auth=require("../middleware/auth");
const router=express.Router();


router.get("/create",auth(),(req,res)=>{
   //渲染文章添加页面
  res.render("create.ejs",{d:req.session.username});
});

router.post("/createProcess",auth(),async (req,res)=>{
  //处理添加的文章
  if(!req.body.title||!req.body.content)
  {
      res.send("标题或者内容不能为空！");
  }
  else
  {
    const u=new posts(req.body);
    await u.save();
    res.redirect('/list'); //res.redirect()方法为重定向方法
  }

})
//暴露接口，供其他模块调用
module.exports=router;