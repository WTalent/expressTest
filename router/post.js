//渲染文章添加页面和文章添加功能
const express=require("express");
const posts=require("../module/posts");
const router=express.Router();


router.get("/create",(req,res)=>{
   //渲染文章添加页面
  res.render("create.ejs");
});

router.post("/createProcess",async (req,res)=>{
  //处理添加的文章
  if(!req.body.title||!req.body.content)
  {
      res.send("标题或者内容不能为空！");
  }
  else
  {
    const u=new posts(req.body);
    await u.save();
    res.send("添加文章成功!");
  }

})
//暴露接口，供其他模块调用
module.exports=router;