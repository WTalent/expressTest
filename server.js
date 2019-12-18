//服务器

//引入express模块，快速搭建一个nodejs的web服务器
const express=require("express");
//引入cookie-parser模块，给req添加cookies属性
const cookies=require("cookie-parser");
//引入express-session模块，为确定用户是否登录做处理
const session=require("express-session");
//引入一个处理登录校验的中间件，用于解决繁琐的登录检验工作
const auth=require("./middleware/auth");
//引入各种路由处理文件
const userRouter=require("./router/user");
const postRouter=require("./router/post");
const listRouter=require("./router/list");
const fileUpload=require("./router/file");



//实例化express对象
const server=express();

//设置模板引擎
server.set('views','views') //告诉服务器模板页面放在哪个文件夹下面
server.set('view engine','ejs'); //告诉服务器使用的是哪个模板引擎渲染

//设置静态资源文件管理
server.use(express.static('www'));

//调用中间件，给req添加body属性(获取post数据)
server.use(express.json());
server.use(express.urlencoded({extended:true}));

//调用中间件，给req添加cookies属性
server.use(cookies());

//调用express-session中间件，给req添加session属性
server.use(session(
  {
    secret:'sadadasdaa',//cookie的签名
    resave:true, //在对session进行更新操作的时候，是否同时对浏览器保存的session进行更新
    saveUninitialized:false,  //默认是否直接保存session到浏览器的cookie里
    cookie:{
     maxAge:1000*60*60*2 //2个小时的有效期
    }
  }
));
//处理各种路由
server.use('/users',userRouter);         //该路由用来注册用户和用户登录
server.use('/posts',postRouter);  //该路由用来添加文章
server.use('/list',listRouter);   //该路由用来展示数据库数据和修改数据以及删除数据(即文章列表，文章编辑，文章删除)
server.use('/file',fileUpload);   //处理文件相关功能

//监听端口号3000
server.listen(3000);