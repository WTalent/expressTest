//处理get请求

//引入express模块
let express=require("express");

//实例化路由
let router=express.Router();

//路由处理
router.get('/:id',(req,res)=>{
    //获取get传输过来的数据
    //直接通过req.query获取，不需要任何其他中间件处理
    console.log(req.query);
    res.send(req.params);
});
//暴露路由实例
module.exports=router;