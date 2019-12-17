# async 与 await (解决回调地狱的问题,ES8出的)
  - 以前使用promise的then和catch使用
  - 现在使用async和await解决回归地狱，能够让我们写异步代码更方便
### 注意点
 1. await 后面写的方法，必须返回的是一个promise对象，promise对象内必须调用resolve或者rejectd
 2. await 必须写在async方法内调用
