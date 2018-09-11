http
大部分的node使用者，都是用node来做Web API的，而HTTP模块是提供Web API的基础。为了支持所有的HTTP应用，node中的HTTTP模块提供的API是偏向底层化的。利用HTTP模块，我们可以简单快速搭建一个Web Server。

node提供了http这个核心模块（不用安装哦，直接require就可以了），用于创建http server服务,使用下面代码，轻松在本机的3000端口创建一个http服务器

// http_demo.js
var http=require("http");
 
http.createServer(function(req,res){
    res.writeHead(200,{
        "content-type":"text/plain"
    });
    res.write("hello world");
    res.end();
}).listen(3000);
 
$~ node http_demo.js
流程

我们首先用http.createServer函数创建了一个服务器对象，然后调用了response.writeHead方法：该方法的第一个参数表示HTTP的响应状态（200）表示一切正常；第二个参数是“Content-Type”，表示我响应给客户端的内容类型。然再后我们调用了response.write方法，写入我们需要传递给客户端的内容。最后一步我们调用了response.end，表示此次请求已处理完成。

.listen(port)

此函数有两个参数，第一个参数表示我们需要监听的端口，第二个参数是回调函数（其实是listening事件），当监听开启后立刻触发。

下面我们逐步展开HTTP 的 API

httpService (http服务器)
开篇的实例代码，也可以通过如下的代码进行改写一番：

var http=require("http");
var server=new http.Server();
 
server.on("request",function(req,res){
    res.writeHead(200,{
        "content-type":"text/plain"
    });
    res.write("hello nodejs");
    res.end();
});
server.listen(3000);
以上代码是通过直接创建一个http.Server对象，然后为其添加request事件监听，其实也就说createServer方法其实本质上也是为http.Server对象添加了一个request事件监听，这似乎更好理解了，那让我们看看http的重要属性

createServer方法中的参数函数中的两个参数req和res则是分别代表了请求对象和响应对象。其中req是http.IncomingMessage的实例，res是http.ServerResponse的实例。

http.IncomingMessage

http.IncomingMessage是HTTP请求的信息，是后端开发者最关注的内容，一般由http.Server的request事件发送，并作为第一个参数传递，包含三个事件

data：当请求体数据到来时，该事件被触发，该事件提供一个参数chunk，表示接受的数据，如果该事件没有被监听，则请求体会被抛弃，该事件可能会被调用多次（这与nodejs是异步的有关系）
end：当请求体数据传输完毕时，该事件会被触发，此后不会再有数据
close：用户当前请求结束时，该事件被触发，不同于end，如果用户强制终止了传输，也是用close
可以参考另一篇文章《nodejs + cheerio 爬取极客学院的nodejs课程数据》来了解http模块在爬虫中的简单应用。

http.ServerResponse

http.ServerResponse是返回给客户端的信息，决定了用户最终看到的内容，一般也由http.Server的request事件发送，并作为第二个参数传递，它有三个重要的成员函数，用于返回响应头、响应内容以及结束请求

res.writeHead(statusCode,[heasers])：向请求的客户端发送响应头，该函数在一个请求中最多调用一次，如果不调用，则会自动生成一个响应头
res.write(data,[encoding])：想请求的客户端发送相应内容，data是一个buffer或者字符串，如果data是字符串，则需要制定编码方式，默认为utf-8，在res.end调用之前可以多次调用
res.end([data],[encoding])：结束响应，告知客户端所有发送已经结束，当所有要返回的内容发送完毕时，该函数必需被调用一次，两个可选参数与res.write()相同。如果不调用这个函数，客户端将用于处于等待状态。
http client
http模块提供了两个函数 http.request和 http.get，功能是作为客户端向http服务器发起请求。

http.request(options,callback)

options是一个类似关联数组的对象，表示请求的参数，callback作为回调函数，需要传递一个参数，为http.ClientResponse的实例，http.request返回一个http.ClientRequest的实例。

options常用的参数有host、port（默认为80）、method（默认为GET）、path（请求的相对于根的路径，默认是“/”，其中querystring应该包含在其中，例如/search?query=byvoid）、headers（请求头内容）
var http=require("http");

  var options={
      hostname:"cn.bing.com",
      port:8080
  }
  
  var req=http.request(options,function(res){
      res.setEncoding("utf-8");
      res.on("data",function(chunk){
          console.log(chunk.toString())
      });
      console.log(res.statusCode);
  });
  req.on("error",function(err){
      console.log(err.message);
  });
  req.end();
发送POST请求（模拟了向慕课网发起评论的功能，headers请使用开发者工具从请求中获取,基本上是参考scott老师的代码）

  var http=require("http");
  var querystring=require("querystring");
  
  var postData=querystring.stringify({
      "content":"just a test",
      "mid":8837
  });
  
  var options={
      hostname:"www.imooc.com",
      port:80,
      path:"/course/document",
      method:"POST",
      headers:{
          "Accept":"application/json, text/javascript, */*; q=0.01",
          "Accept-Encoding":"gzip, deflate",
          "Accept-Language":"zh-CN,zh;q=0.8",
          "Connection":"keep-alive",
          "Content-Length":postData.length,
          "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
          "Cookie":"imooc_uuid=6cc9e8d5-424a-4861-9f7d-9cbcfbe4c6ae; imooc_isnew_ct=1460873157; loginstate=1; apsid=IzZDJiMGU0OTMyNTE0ZGFhZDAzZDNhZTAyZDg2ZmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjkyOTk0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGNmNmFhMmVhMTYwNzRmMjczNjdmZWUyNDg1ZTZkMGM1BwhXVwcIV1c%3DMD; PHPSESSID=thh4bfrl1t7qre9tr56m32tbv0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1467635471,1467653719,1467654690,1467654957; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1467655022; imooc_isnew=2; cvde=577a9e57ce250-34",
          "Host":"www.imooc.com",
          "Origin":"http://www.imooc.com",
          "Referer":"http://www.imooc.com/video/8837",
          "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2763.0 Safari/537.36",
          "X-Requested-With":"XMLHttpRequest",
      }
  }
  
  var req=http.request(options,function(res){
      res.on("data",function(chunk){
          console.log(chunk);
      });
      res.on("end",function(){
          console.log("### end ##");
      });
      console.log(res.statusCode);
  });
  
  req.on("error",function(err){
      console.log(err.message);
  })
  req.write(postData);
  req.end();
http.get(options,callback)

这个方法是http.request方法的简化版，唯一的区别是http.get自动将请求方法设为了GET请求，同时不需要手动调用req.end()，但是需要记住的是，如果我们使用http.request方法时没有调用end方法，服务器将不会收到信息。