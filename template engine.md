# template engine(模板引擎)  参考网址：lvmx

#### 想要实现什么？
 - 一个html文件，我们希望他上面的数据，是活的，而不是死的

#### 作用是：
- 将静态的模板页面(html)与动态的数据结合起来，并做一些处理，然后渲染到浏览器上

#### 使用步骤
- 1.安装某款模板引擎
     ```bash
       npm install --save ejs
    ```
- 2.在项目中设置使用这个模板引擎
    ```bash
       app.set('views','提供某个路径给他') //告诉express，这个项目模板页面存在在某个文件夹下面
       app.set('view engine','ejs') //告诉express，这个项目要使用的模板引擎是 ejs
    ```
- 3.通过路由的代码，使用 res.render()去渲染某个模板页面