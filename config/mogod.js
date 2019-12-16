//该模块用来连接mongodb的一个数据库(mysql和mongodb都是叫数据库)

//引入mongoose模块
const mongoose=require("mongoose");
//设置需要链接的mongodb的数据库(这里链接到register数据库，如果没有的话，它会自己创建)
const url='mongodb://127.0.0.1:27017/register';
//开始链接
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
  console.log("数据库连接成功");
}).catch(
     ()=>{
        console.log("数据库连接失败");
    }
);
//将模块暴露出去，给其他模块调用
module.exports=mongoose;