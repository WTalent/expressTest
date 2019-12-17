//在register数据库里创建一个集合posts
const mongoose=require("../config/mogod");

//设置数据结构
const schema=new mongoose.Schema({
    title:String,
    content:String
},{
   timestamps:true
});

//创建该集合posts

const p=mongoose.model("post",schema);

//将表暴露出去，供其他模块调用
module.exports=p;