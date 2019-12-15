// //express对res和req增加的属性和方法(参考lvmx简书 express栏目)

// //res
// //res.send()是res.write和res.end方法的结合
// //res.cookie(数据名，数据值，{maxAge:有效期}) 服务器对客户端设置cookie
// //res.set() 设置http响应头，可以解决跨域问题

// //req
// //req.query属性是url的查询字符串，是一个对象
// //req.body属性获取请求主体(post数据，需要设置中间件函数json与urlencode) 
// // 中间件调用代码：express实例化对象.use(express.json()); express实例化对象.use(express.urlencoded({extended:true}));
// //上面两行代码的功能是给req身上加一个body属性，这时候req.body才会生效
// //req.cookies属性获取Cookie(需要使用cookie-parser中间件)
// //npm install --save cookie-parser 首先安装cookie-parser模块
// //然后再在服务器里引入该模块进行使用 const cookieparser=require("cookie-parser")
// //最后调用中间件  express实例化对象.use(cookieparser())即可给req加上cookie属性
// //req.params属性获取路由的动态参数
// //localhost:3000/hello/apple
// //localhost:3000/hello/banana
// //localhost:3000/hello/orange
// /*
//    只要是localhost:3000/hello/随便写 都能进来
//    app.get("/hello/:id",(req,res)=>{
//        //req.params对象属性能获取到id的值
//        console.log("上面的url都能访问进来");
//    })

// */
// //req.get()获取http请求头

// //代码区

//引入express模块
let express=require("express");
//引入路由处理文件，js后缀可以省略
let post=require("./router/post");
let get=require("./router/get");


//创建express实例
let app=express();
//开启静态托管(以www文件夹为本服务器的静态资源根目录,下面那些路由处理都是动态请求)
app.use(express.static('www'));
//使用路由实例(可以让代码更简洁，不用在一个服务器文件里写多个路由处理，可以将同一类的路由处理放到一起处理，大大方便了维护和代码可读性)
//处理get一类的请求
app.use('/get',get);
//处理post一类的请求
app.use('/post',post);
//监听端口号
app.listen(3000);







// //首先引入express框架
// let express=require("express");
// let fs=require("fs");
// // let bodyParser=require("body-parser");
// //实例化一个express对象
// let server=express();
// let cookieparser=require("cookie-parser");


// //中间件调用，处理路由
 
//  server.use(express.static('www'));  //开启静态资源托管，以www文件夹为网站根目录,此时地址访问都是和webserver一样的方式,'/'就是根目录
//  //给req身上加上body属性
//  //第一种中间件方法
//  server.use(express.json());  
//  server.use(express.urlencoded({extended:true}));  
//  //第二种中间件调用方法
//  // server.use(bodyParser.urlencoded({extended:false}));
//  //给req身上加上cookie
// server.use(cookieparser());
// //自己写个中间件，给路由的req对象身上加个zhouxin属性，默认为调用中间件时传入的数字
// const mymiddleware=(type)=>{
//    return (req,res,next)=>{
//         req.zhouxin=type;
//       next();
//    }
// }
// server.use(mymiddleware(1));



// //处理路由
// //http://127.0.0.1:3000/get
// server.get('/get',(req,res)=>{
      
//        console.log(req.path);
//        //req.query对象是get的数据
//        console.log(req.query);
//        res.send('get请求完成'+req.zhouxin);
// });

// server.get('/index',(req,res)=>{
//      //设置cookie
//      res.cookie("data",'{name:"周鑫",age:22}',{maxAge:1000*60*60});
//      console.log(req.cookies);
//      res.send("存放了cookie");
// });

// //处理post请求，两个中间件调用处理后，向req对象上添加body属性，得到post的数据,就是req.body属性
// //http://127.0.0.1:3000/post
// server.post('/post',(req,res)=>{
//         console.log(req.body);
//         res.send('post请求完成');
// });

// //处理动态路由
// server.get('/indexT/:name',(req,res)=>{
//          //得到:name的值   
//         console.log(req.params);
//         res.send(req.params);
// });

// //监听端口3000
// server.listen(3000);