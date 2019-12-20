//文件相关路由处理
const express=require("express");
const router=express.Router();
const auth=require("../middleware/auth");
//引入fs模块
const fs=require("fs");
//引入path模块
const path=require("path");
//引入对文件数据传输的处理
const multer=require("multer");
//实例化multer,设置配置信息(比如文件上传到服务器临时存放的位置)
const upload=multer({
   dest:"upLoadImages" //文件上传临时存放路径，默认在当前项目目录下创建该文件夹
});

//渲染文件上传页面
router.get('/fileUpload',auth(),(req,res)=>{
    
   res.render('fileUpload.ejs',{d:req.session.username});
})
//处理文件上传(upload.single()接收从前端发送过来的文件数据,一次一个)
router.post('/process',auth(),upload.single('file'),(req,res)=>{
   //经过multer中间件处理后，req添加一个属性file，req.file表示当前上传文件的详细信息
   //将文件写入到指定路径中，并且修改文件名
   //fileName为文件的新名字(new Date().getTime()_是为了设置时间戳，解决不同用户上传同一个名字的文件所造成的文件重名问题)
   let fileName=new Date().getTime()+"_"+req.file.originalname;
   //newPath为新路径(__dirname代表当前文件所在目录的绝对路径,__filename代表当前文件的绝对路径，这是两个全局变量)
   let newPath=path.resolve(__dirname,'../www/images/'+fileName);
   //读取获取到的文件
   let fileContent=fs.readFileSync(req.file.path);
   //将获取到的文件写入到新路径中
   fs.writeFileSync(newPath,fileContent);
   //上传完毕，跳转到文章列表页面
   res.redirect('/list');
});

//处理一个input一次性上传多个文件
router.post('/processMany',auth(),upload.array('file',5),(req,res)=>{
           //将临时文件夹里的文件移动到静态资源托管的文件夹中
           //循环操作
           for(let i=0;i<req.files.length;i++)
           {
             let FileName=new Date().getTime()+"_"+req.files[i].originalname;
             let newPath=path.resolve(__dirname,"../www/images/"+FileName);
             let fileContent=fs.readFileSync(req.files[i].path);
             fs.writeFileSync(newPath,fileContent);
           }
           //上传完毕，跳转到文章列表页面
           res.redirect('/list');
})

//处理多个input情况
router.post('/processManyInput',auth(),upload.fields([{name:"file2",maxCount:2},{name:"file3",maxCount:2}]),(req,res)=>{
  for(item in req.files)
  {
     for(let i=0;i<req.files[item].length;i++)
     {
      let FileName=new Date().getTime()+"_"+req.files[item][i].originalname;
      let newPath=path.resolve(__dirname,"../www/images/"+FileName);
      let fileContent=fs.readFileSync(req.files[item][i].path);
      fs.writeFileSync(newPath,fileContent);
     }
  }
   //上传完毕，跳转到文章列表页面
   res.redirect('/list');
})


module.exports=router;