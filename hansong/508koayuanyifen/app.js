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

const main3 = ctx => {
    if(ctx.request.path !== '/') {
        ctx.response.body = 'html';
        ctx.response.body = '<a>ni hao</a>'
    } else{
        ctx.response.body = 'dajiahao'
    }
}
app.use(main3)

// 监听3000
app.listen(3000);