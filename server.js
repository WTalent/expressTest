//添加注册功能

//引入express模块，快速搭建一个nodejs的web服务器
const express=require("express");
//引入cookie-parser模块，给req添加cookies属性
const cookies=require("cookie-parser");
//引入各种路由处理文件
const userRouter=require("./router/user");

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

//处理各种路由
server.use('/user',userRouter);

//监听端口号3000
server.listen(3000);