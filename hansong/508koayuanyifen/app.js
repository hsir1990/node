const Koa = require('koa');
const app = new Koa();




// // 向服务器发送Hello World
// const main = ctx => {
//     ctx.response.body = 'Hello World';
// };

// app.use(main);



// // accept的使用,koa默认的返回类型是text/plian.如果想返回其他类型的内容，可以先用ctx.request.accepts判断一下
// // 文件类型，plain是纯文本格式，如txt；html是超文本语言。

// const main1 = ctx => {
//     if(ctx.request.accepts('xml')) {
//         ctx.response.type = 'xml';
//         ctx.response.body = '<data>Hello World</data>'
//     }else if (ctx.request.accepts('json')) {
//         ctx.response.type = 'json';
//         ctx.response.body = {data : 'Hello World'}
//     }else if (ctx.request.accepts('html')) {
//         ctx.response.type = 'html';
//         ctx.response.body = '<p>Hello World</p>';
//     }else {
//         ctx.response.type = 'text';
//         ctx.responst.body = 'Hello World';
//     }
// }

// app.use(main1);



// // 加载文件中的html
// const fs = require('fs');

// const main2 = ctx => {
//     ctx.response.type = 'html';
//     ctx.response.body = fs.createReadStream('./template.html');
// };

// app.use(main2);

// const main3 = ctx => {
//     if(ctx.request.path !== '/') {
//         ctx.response.body = 'html';
//         ctx.response.body = '<a>ni hao</a>'
//     } else{
//         ctx.response.body = 'dajiahao'
//     }
// }
// app.use(main3)


// // 需要安装koa-route
// const route = require('koa-route');

// const about = ctx => {
//     ctx.response.type = 'html';
//     ctx.response.body = '<a>about</a>'
// }

// const main4 = ctx => {
//     ctx.response.body = 'main4';
// }

// app.use(route.get('/', about));
// app.use(route.get('/main', main4));


// // 打印时间戳，请求方法，请求路径
// const main5 = ctx => {
//     console.log(`${Date.now()}`);
//     console.log(`${ctx.request.method}`);
//     console.log(`${ctx.request.url}`);
//     ctx.response.body = 'Hello World';
// }

// app.use(main5);



// const logger = (ctx, next) => {
//     console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
//     next();//不运行这补，下一步没有办法运行
// }
// const main6 = ctx => {
//     ctx.response.body = 'Hello World';
// }

// app.use(logger);
// app.use(main6);

// 多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。
// nest()所执行的顺序
// const one = (ctx, next) => {
//     console.log('>> noe');
//     next();
//     console.log('<< one');
// }

// const two = (ctx, next) => {
//     console.log('>> two');
//     next();
//     console.log('<< two');
// }

// const three = (ctx, next) => {
//     console.log('>> three');
//     next();
//     console.log('<< three');
// }
// app.use(one);
// app.use(two);
// app.use(three);

// // // 打印结果：
// // >> noe
// // >> two
// // >> three
// // << three
// // << two
// // << one


// fs.promised模块就是一个在原有node.js的基础上封装的一个带有promise的库。
// wait修饰的一定是一个返回Promise对象的函数，如果修饰的是其他跟没修饰一样。
// async/await：async标记的函数代表这个函数有异步功能。而await其实就是用来修饰异步函数的一个语法糖。具体await是干嘛呢？当函数走到「Context.response.body = await fs.readFile('./template.html', 'utf-8')」这一行的时候，就会“阻塞”，一直等到fs.readFile返回为止，然后赋值给了Context.response.body，这样保证了上下文没乱。

// const fs1 = require('fs.promised');//需要安装依赖

// const main7 = async function (ctx, next) {
//     ctx.response.type = 'html';
//     // 同步读取readFileSync和异步读取readFile
//     ctx.response.body = await fs1.readFile('./template.html', 'utf-8');
// }
// // // 对比,不能执行
// // const main7 = function(ctx, next) {
// //     ctx.response.type = 'html';
// //     ctx.response.body = fs.readFile('./template.html', 'utf-8');
// // }

// app.use(main7)


// 中间件的合成
// koa-compose模块可以将多个中间件合成为一个。
// const compose = require('koa-compose');

// const logger = (ctx, next) => {
//     console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
//     next();
// }

// const main8 = ctx =>{
//     ctx.response.body = 'Hello World';
// }

// // 合并两个函数
// const middlewares = compose([logger, main8]);

// app.use(middlewares);

// const path = require('path');
// const serve = require('koa-static');//安装依赖
// const main9 = serve(path.join(__dirname)+'/static');
// app.use(main9);


// // 有些场合，服务器需要重定向（redirect）访问请求。比如，用户登陆以后，将他重定向到登陆前的页面。ctx.response.redirect()方法可以发出一个302跳转，将用户导向另一个路由。请看下面的例子（完整代码看这里）。
// const route = require('koa-route')

// const redirect = ctx => {
//     ctx.response.redirect('/');
// }

// const main10 = ctx => {
//     ctx.response.body = 'Hello World';
// }

// app.use(route.get('/', main10));
// app.use(route.get('/redirect', redirect));

// app.use(main10);



// const main11 = ctx => {
//     ctx.throw(500);
// }
// app.use(main11)
// const main = ctx => {
//     ctx.throw(500);
//   };
  
//   app.use(main);

// const main = ctx => {
//     ctx.response.status = 404;
//     ctx.response.body = 'Page Not Found'
// }

// 处理错误的中间件
// 为了方便处理错误，最好使用try...catch将其捕获。但是，为每个中间件都写try...catch太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理。请看下面的例子（完整代码看这里）。
// const handler = async (ctx, next) => {
//     try{
//         await next();
//     }catch(err) {
//         ctx.response.status = err.statusCode || err.status || 500;
//         ctx.response.body = {
//             message : err.message
//         }
//     }
// }

// const main12 = ctx　=>{
//     ctx.throw(500);
// }
  
//   app.use(handler);
//   app.use(main12);



// // 运行过程中一旦出错，Koa 会触发一个error事件。监听这个事件，也可以处理错误。请看下面的例子（完整代码看这里）。
// const main11 = ctx => {
//     ctx.throw(500)
// }
// app.on('error', (err, ctx) => {
//     console.error('srver error', err);
// })



// 监听3000
app.listen(3000);