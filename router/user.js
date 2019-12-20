//引入express模块，为了后续使用express.Router()方法
const express = require("express");
//引入users模块
const user = require("../module/users");
//引入bcryptjs密码加密模块
const bcryptjs=require("bcryptjs");
//处理登录校验
const auth=require("../middleware/auth");
//实例化路由，用来接收传进来的路由
const router = express.Router();
//引入multer模块，处理文件传输
const multer=require("multer");
//实例化multer
const upload=multer({
    dest:"upLoadImages" //临时存储文件夹
});
//引入path模块
const path=require("path");
//引入fs模块
const fs=require("fs");

//处理路由
router.get("/register", (req, res) => {
  res.render("index.ejs",{d:req.session.username});
});
router.post("/process", async (req, res) => {
  //1.取得从前端传来的数据
  let username = req.body.username;
  let password = req.body.password;
  let passwordAgain = req.body.passwordAgain;
  let email = req.body.email;
  
  //2.处理数据(是否为空，是否为已经注册过的)
  if(!username||!password||!passwordAgain||!email)
  {
    //数据为空就提示错误
    res.send("有输入为空!");
    return ;
  }

  const data=await user.findOne({email:email}); //user.findOne返回一个promise对象
  if(data)
  {
    res.send("已经注册过该邮箱了！");
  }
  else
  {
   let u=new user({
      username:req.body.username,
      password:bcryptjs.hashSync(req.body.password,10),
      passwordAgain:bcryptjs.hashSync(req.body.passwordAgain,10),
      email:req.body.email
   });//调用nodejs的密码加密模块bcryptjs，然后调用它的hash方法进行加密
   await u.save();
   //注册成功后，跳转到文章列表页面
   res.redirect('/list');
  }

  // user.findOne({ email:email}).then((data)=> {
  //   console.log(data);
  //   if (data) {
  //     res.send("邮箱已经被注册过了!");
  //   } else {
  //     //3.将数据存在mongodb数据库中
  //     let u = new user(req.body);
  //      u.save().then(() => {
  //         res.send("存入成功！");
  //       }).catch((error) => {
  //         res.send(error);
  //       });
  //   }
  // });
});
//处理登录注销
router.get('/logout',(req,res)=>{
  //将req.session清除即可
  req.session.destroy();
  //然后跳转到登录页面
  res.redirect('/users/login');

})

//处理登录页面
router.get('/login',(req,res)=>{
  //渲染登录页面
  //接收url上的rediect数据
  //判断rediect是否为空，为空的话就赋值为文章列表
  let rediect=req.query.rediect?req.query.rediect:'/list';
  res.render("login.ejs",{rediect,d:req.session.username});
});

//处理登录
router.post('/login',async(req,res)=>{
    //获得登录的数据
    let email=req.body.email;
    let password=req.body.password;
    let rediect=req.body.rediect;
    
    if(!email||!password)
    {
      res.send("密码和邮箱不能为空!");
      return;
    }
    //开始查询数据库中是否有注册的邮箱
    if(!email)
    {
      res.send("用户名或密码错误");
      return; 
    }
    //通过唯一的email进行数据库查询
    let isok=await user.findOne({email:email});
   if(!isok)
   {
     res.send("没有找到该用户");
     return; 
   }
   //比较密码，由于数据库中的密码经过hash加密，所以只能进行compare比较
   let isk=bcryptjs.compareSync(password,isok.password);
   if(!isk)
   {
     res.send("密码错误，请重新输入");
     return; 
   }
   //登录成功，给req.session对象加个username，以此来告诉浏览器用户登录成功
   req.session.username=isok; //直接把该用户的数据赋值到session对象上
   res.redirect(rediect);

})

//渲染用户信息页面
router.get('/infor',auth(),(req,res)=>{
   res.render('infor.ejs',{d:req.session.username});
})
//处理更改数据
router.post('/update',auth(),upload.single('file'),async (req,res)=>{
  let fileName='';
  if(!req.file)
  {
    //没有提交图片时 
    fileName="19_logo.jpg";
  }
  else
  {
  //处理文件
  //首先新名字
  fileName=new Date().getTime()+"_"+req.file.originalname;
  //然后拼接得到新路径
  let newPath=path.resolve(__dirname,"../www/images/"+fileName);
  //读取文件
  let fileContent=fs.readFileSync(req.file.path);
  //将读取的文件写入新路径
  fs.writeFileSync(newPath,fileContent);

  }
  //修改数据库数据,因为已经登录，所以有req.session.username属性
  //需要判断是否同时修改用户名和图片
  await user.updateOne({email:req.body.email},{username:req.body.username,adavat:"/images/"+fileName});
  let ul=await user.findOne({email:req.body.email});
  //更新req.session.username
  req.session.username=ul;
  res.redirect('back');
})


//暴露出去，给其他文件调用
//根据commonjs规范
//一个文件就是一个模块，每个模块里的类，变量都是私有的，不会去污染全局
//module对象代表当前模块，module.exports就是当前模块对外的接口
module.exports = router;
