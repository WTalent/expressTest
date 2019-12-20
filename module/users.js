//集合的模型(model)对象
//调用数据库链接模块，去链接数据库
const mongoose=require('../config/mogod');
//设置集合的数据结构
const schema=new mongoose.Schema({
   username:String,
   password:String,
   passwordAgain:String,
   email:String,
   adavat:{
      type:String,
      default:"/images/19_logo.jpg" //默认头像
   }
});
//创建集合
const model=mongoose.model('user',schema);
//暴露模块，供其他模块调用
module.exports=model;