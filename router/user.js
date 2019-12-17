//引入express模块，为了后续使用express.Router()方法
const express = require("express");
//引入users模块
const user = require("../module/users");
//引入bcryptjs密码加密模块
const bcryptjs=require("bcryptjs");
//实例化路由，用来接收传进来的路由
const router = express.Router();
//处理路由
router.get("/register", (req, res) => {
  res.render("index.ejs");
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
   res.send("注册完毕");
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
//暴露出去，给其他文件调用
//根据commonjs规范
//一个文件就是一个模块，每个模块里的类，变量都是私有的，不会去污染全局
//module对象代表当前模块，module.exports就是当前模块对外的接口
module.exports = router;
