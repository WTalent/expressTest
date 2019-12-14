//express对res和req增加的属性和方法(参考lvmx简书 express栏目)

//res
//res.send()是res.write和res.end方法的结合
//res.cookie(数据名，数据值，{maxAge:有效期}) 服务器对客户端设置cookie
//res.set() 设置http响应头，可以解决跨域问题

//req
//req.query属性是url的查询字符串，是一个对象
//req.body属性获取请求主体(post数据，需要设置中间件函数json与urlencode) 
// 中间件调用代码：express实例化对象.use(express.json()); express实例化对象.use(express.urlencoded({extended:true}));
//上面两行代码的功能是给req身上加一个body属性，这时候req.body才会生效
//req.cookies属性获取Cookie(需要使用cookie-parser中间件)
//npm install --save cookie-parser 首先安装cookie-parser模块
//然后再在服务器里引入该模块进行使用 const cookieparser=require("cookie-parser")
//最后调用中间件  express实例化对象.use(cookieparser())即可给req加上cookie属性
//req.params属性获取路由的动态参数
//localhost:3000/hello/apple
//localhost:3000/hello/banana
//localhost:3000/hello/orange
/*
   只要是localhost:3000/hello/随便写 都能进来
   app.get("/hello/:id",(req,res)=>{
       //req.params对象属性能获取到id的值
       console.log("上面的url都能访问进来");
   })

*/
//req.get()获取http请求头
