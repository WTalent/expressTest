//测试async和await解决回调地狱问题

// console.log(1);
// setTimeout(()=>{
//     console.log(2); //异步代码
// })
// console.log(3);
//由于是异步的方式，所以console.log(3)不会等待setTimeout里面的回调函数执行完毕，它会先执行完自己，再去执行里面的回调函数

//可以简化成如下方式






const a=time=>{
    return new Promise((resolve,reject)=>{
        //原本的异步代码放在promise的回调函数里
           setTimeout(()=>{
              console.log(2);
              resolve();
           },time);
    });
}
const b=async()=>{
  console.log(1);
  await a(1000); //原本的异步代码封装到一个promise函数里去
  console.log(3);
}

b();
// const a=(time)=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log(2);
//             resolve();
//         },time)
//     })
// }

// // a().then(()=>{

// // }).catch(()=>{

// // })
// //简化成下面的方式,看起来就十分的舒服和简洁

// const b=async ()=>{
//     console.log(1);
//     await a(1000);
//     console.log(3);
// }
// b();