//处理文章列表页面

const express=require("express");
const router=express.Router();
const post=require("../module/posts");
const auth=require("../middleware/auth");
//引入日期处理模块momentjs
const moment=require("moment");
moment.locale('zh-cn'); //设置日期的语言
//处理路由
router.get('/',auth(),async (req,res)=>{

    //制定分页效果
    let count=await post.find().countDocuments(); //总记录数count
    let pageNum=parseInt(req.query.pageNum)||1;//当前页数 pageNum,默认为第一页
    let pageSize=parseInt(req.query.pageSize)||5; // //一页多少条记录 pageSize，默认是5页
    let total=Math.ceil(parseInt(count)/pageSize); //页总数 total
    let list=await post.find().sort({updatedAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize); //需要渲染的数据

    list=JSON.parse(JSON.stringify(list)); //由数据库查出来的数组不是一个真数组，我们需要先将该数组转换为真数组再进行使用
                                            //深拷贝，并且转换为真数组
    list.forEach(item=>{
      let data=new Date(item.updatedAt);
     //  let y=data.getFullYear();
     //  let m=data.getMonth()+1;
     //  let d=data.getDate();
     //  item.updatedAt=`${y}---${m}---${d}`;
      item.updatedAt=moment(data).format('MMMM Do YYYY, h:mm:ss a');
    });
    //渲染文章列表页面
    res.render("list.ejs",{list,total,pageNum,d:req.session.username});
      
})
//处理修改数据库
router.post('/edit',auth(),async(req,res)=>{
     //数据都在req.body上
     let id=req.body.id;
     let title=req.body.title;
     let content=req.body.content;
     //开始修改
     await post.updateOne({_id:id},{title:title,content:content});
     res.redirect('/list');     
})
//处理动态路由，获取文章详情
router.get('/:id',auth(),async (req,res)=>{
     //通过id获取数据库里的数据
     let id=req.params.id;
     let data=await post.findById(id);
     res.render("xq.ejs",{data,d:req.session.username});
})
//处理编辑页面
router.get('/:id/edit',auth(),async(req,res)=>{
       //首先渲染页面
       let id=req.params.id;
       let p=await post.findById(id);
       res.render("edit.ejs",{p,d:req.session.username});
})
//处理删除文章
router.get('/:id/delete',auth(),async(req,res)=>{
   //获取文章id
   let id=req.params.id;
   await post.deleteOne({_id:id});
   res.redirect('/list');
})


//暴露出去，供其他模块调用
module.exports=router;
