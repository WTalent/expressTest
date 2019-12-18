//处理登录校验的中间件
const auth=()=>{
    return (req,res,next)=>{
       if(!req.session.username)
       {
         res.redirect(`/users/login?rediect=${req.originalUrl}`); //req.originalUrl直接取所有的URL，而不是经过跳转后的url
       }
       else
       {
          next(); 
       }
    }
}
module.exports=auth;