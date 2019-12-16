# mongoose
 - 不是mongodb， 它是一款能够让nodejs操作mongodb数据库的一个模块

 ## 使用步骤
 - 1. 项目中安装
   ```bash
     npm install --save mongoose
   ```  
  2. 建立一个mongoose与mongodb的链接
      - 如何链接数据库
        1. 首先引入mongoose
        2. 定义一个mongodb的链接地址(例如 mongodb://127.0.0.1:27017/数据库名字)
        3. 使用mongoose模块的connect(url,{useNewUrlParser:true})方法去链接
        4. 将mongoose暴露出去，供其他文件调用
  3. 建立基于某张数据表的模型(model)对象
      - 如何建立某张数据表的model
        1. 首先创建一个文件夹，用来放model对象的
        2. 然后在该文件夹里创建一个数据表对于的model对象
        3. 在该model对象里调用前面暴露出来的链接，然后定义该数据表的数据结构schema(const schema=new mongoose.Schema({...})) 
  4. 就可以开始愉快的拿到数据了
 
   


 

