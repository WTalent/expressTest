//处理post请求

//引入express模块
let express=require("express");
//创建路由实例
let router=express.Router();

//调用中间件，给express的req添加body属性，为了获取从post传过来的数据
router.use(express.json());
router.use(express.urlencoded({extended:true}));

//处理路由
router.post('/:id',(req,res)=>{
    //获取post传来的数据
    console.log(req.body);
    //req.body是传来的数据，但是需要调用中间件进行添加body数据给req，否则为undefined
     res.send(req.params);    
});
router.post('/:ed/edit',(req,res)=>{
     res.send("这里是修改文件"); 
})
//将路由实例暴露出去，供服务器use调用
module.exports=router;