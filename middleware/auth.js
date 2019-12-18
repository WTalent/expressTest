//处理登录校验的中间件
const auth=()=>{

    return (req,res,next)=>{
       if(!req.session.username)
       {
        res.send("没有登录");
       }
       else
       {
          next(); 
       }
    }
}
module.exports=auth;