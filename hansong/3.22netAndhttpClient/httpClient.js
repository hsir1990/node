// var http=require('http');
// var querystring=require('querystring');
// var url = require('url');

// http.createServer(()=>{
//     console.log('request come');
//     //将传过来的URL转变为对象
//     var params = url.parse(req.url,true);
//     console.log('解析完成');
//     //打印这个对象的字符串形式
//     console.log(util.inspect(params));
//     console.log('向客户端返回');
//     res.end(params.query.name);
// }).listen(3000);
// //客户端请求
// var request=http.get({
//     host:'127.0.0.1',
//     path:'/user?name=helios&age=22',
//     port:3000},function(res){
//     res.setEncoding('utf-8');
//     res.on('data',function(data){
//         console.log(' 服务端相应回来的数据为：'+data);
//     })
// });

// // const http = require('http');

// // let servers = http.createServer((req, res) => {
// //     // header头控制跨域和字库
// //     res.setHeader("Access-Control-Allow-Origin", "*");
// //     res.setHeader("Access-Control-Allow-setHeaders", "X-Requested-With");
// //     res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
// //     res.setHeader("X-Powered-By",' 3.2.1')
// //     res.setHeader("Content-Type", "application/json;charset=utf-8");
// //     res.write('写入成功!');
// //     res.end('发送到浏览器显示');
// // }).listen(5000, () => {
// //     console.log('监听5000成功')
// // })

var http=require('http');
var querystring=require('querystring');
//启动服务
http.createServer((req,res)=>{
    console.log("request already come");
    var post = "";
    req.on('data',(chunk)=>{
        post += chunk;
    });
    req.on('end',()=>{
        //querystring.parse  将字符串转换为json的格式
        post =  querystring.parse(post);
        console.log('complete complished');
        //返回请求者一个信息
        res.write(post.name);
        res.end();
    });
}).listen(3000);

//将一个对象转换为json的字符串
var contents  =  querystring.stringify({
    name:'helios',
    age:21,
    address:'changsha'
});
//声明请求的参数 options
var options={
    host:'localhost',
    path:'/',
    port:3000,
    method:'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length':contents.length
    }
};


//开始发送请求
var req  =  http.request(options,(res)=>{
    res.setEncoding('utf-8');
    res.on('data',(data)=>{
        console.log('return :');
        console.log(data);
    });

});

req.write(contents);
req.end();





