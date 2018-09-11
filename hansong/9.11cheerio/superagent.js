superagent
superagent它是一个强大并且可读性很好的轻量级ajax API，是适用于nodejs环境的一个关于HTTP方面的库。

安装
npm install superagent --save
简单使用
一个请求的初始化可以用请求对象里合适的方法来执行，然后调用end()来发送请求。

var superagent = require('superagent');
 
superagent
    .post('/api')
    .send({
        'key': 'value'
    })
    .set('header_key', 'header_value')
    .end(function(err, res) {
        if (err) {
            //do something
        } else {
            //do something
        }
    })
 
或
superagetn
    .get(''http://example.com/search'')
    .end(function(res){ });
API
请求方法的参数可以直接使用多个key/value，也可以分多次调用请求方法每次传递一对key/valu或者key/value字符串

GET

    //接下来四种方法所形成的URL为/api?name=An&age=20&sex=male
    //第一种
    superagent
        .get(/api)
        .query({name:'liang'})
        .query({age:18})
        .query({sex:'female'})
        .end(function(res){ })
    //第二种
    superagent
        .get(/api)
        .query({name:'liang',age:18,sex:'female'})
        .end(function(res){ })
    //第三种 
    superagent
        .get(/api)
        .query('name=liang&age=18&sex=female')
        .end(function(res){ })
    //第四种
    superagent
        .get(/api)
        .query('name=liang')
        .query('age=18')
        .query('sex=female')
        .end(function(res){ })
POST

    superagent
        .post('/api')
        .set('Content-Type','application/json')
        .send('{"name":"An","age":20,"sex":"male"}')
        .end(cb)
    //等价于 下面的写法，因为json是默认的 Content-Type
    superagent
        .post('/api')
        .send({name:"An",age:20,sex:"male"})
        .end(cb)
    //等价于 ==>
    superagent
        .post('/api')
        .send({name:"An"})
        .send({age:20})
        .sex({sex:'male'})
        .end(cb)
superagent的请求数据格式化是可以扩展的，不过默认支持form和json两种格式,想发送数据以application/x-www-form-urlencoded类型的话，则可以简单的调用.type()方法传递form参数就行，这里默认是json,下面的请求将会发送post name=a&age=18:

  request
    .post('/user') 
    .type('form') 
    .send({ name: 'tj' }) 
    .send({ pet: 'tobi' }) 
    .end(callback)
post && get
当用.send(obj)方法来发送一个post请求，并且希望传递一些查询字符串，可以调用.query()方法,比如向?format=json&dest=/login发送post请求:

request 
  .post('/') 
  .query({ format: 'json' })
  .query({ dest: '/login' }) 
  .send({ post: 'data', msg: 'hello' }) 
  .end(callback);
请求设置
设置请求头：调用set()方法，参数传递一组键值对

  superagent
      .get('/api')
      .set({
          'Referer','https://www.google.com',
          'Accept','image/webp,image/*,*/*;q=0.8'
      })
       .end(function(req,res){
          //do something
      })
Response

响应一般会提供很多有用的标识以及属性,都在response对象里，按照respone.text,解析后的response.body,头字段，一些标识的顺序来排列。

- res.text
    包含未被解析的响应数据
 
- res.body
    包含解析的数据，跟请求数据自动序列化一样，响应数据也会自动的解析，
    当为一个Content-Type。定义一个解析器后，就能自动解析，默认解析包
    含application/json和application/x-www-form-urlencoded,可以
    通过访问res.body来访问解析对象。
 
- res.header
    响应头,res.header包含解析之后的响应头数据,键值都是node处理成小
    写字母形式，比如res.header['content-length'].
 
- res.type & res.charset 类型和编码格式
    Content-Type响应头字段是一个特列，服务器提供res.type来访问它，
    默认res.charset是空的,如果有的话，则自动填充，例如Content-Type
    值为text/html; charset=utf8,则res.type为text/html,res.charst
    为utf8.
 
- res.status状态码
其他设置
req.abort() 终止请求

req.timeout(ms) 暂停请求 ms 表示毫秒为单位的时间

管道数据

nodejs客户端允许使用一个请求流来输送数据,比如请求一个文件作为输出流:

  var request = require('superagent') ,fs = require('fs');
  var stream = fs.createReadStream('path/to/my.json');
  var req = request.post('/somewhere');
  req.type('json');
  stream.pipe(req);
或者输送一个响应流到文件中:

  var request = require('superagent') , fs = require('fs');
  var stream = fs.createWriteStream('path/to/my.json');
  var req = request.get('/some.json');
  req.pipe(stream);
错误处理

当发送错误时，superagent首先会检查回调函数的参数数量,当err参数提供的话，参数就是两个,如下:

  request 
    .post('/upload') 
    .attach('image', 'path/to/tobi.png') 
    .end(function(err, res){ });
  ``
  当省略了回调函数,或者回调只有一个参数的话,可以添加error事件的处理.
  ```js
  request 
    .post('/upload') 
    .attach('image', 'path/to/tobi.png') 
    .on('error', handle) 
    .end(function(res){ });