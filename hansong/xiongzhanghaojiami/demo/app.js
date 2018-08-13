const http = require('http');
const crypto = require('crypto');


const url = require('url');
const querystring = require('querystring');
const router = require('router');


// get方法后者post方法的使用
function handleMethod (req, data, callback) {
    // 判断请求的方法
    switch(req.method){
        case "GET" : 
            let query = url.parse(req.url,true).query;//解析url，并使用其参数，为true时，返回的url对象中，query的属性为一个对象。
            callback(query);
            break;
        case "POST" : 
        // too much data, close connection  数据太多，关闭 连接
            if(data.length > 1e6){
                return req.connection.destory();
            }

            data = Buffer.concat(data).toString();
            var params = querystring.parse(data);
            // querystring.parse('name=hsir&sex=name&sex=nv');
            // // {name : "hsir", sex : ["name", "nv"]};
            callback(params);
            break;
        case "DELETE" : 
            let query = url.parse(req.url, true).query;//解析url，并获取参数，加true为了返回url上的参数位一个对象
            callback(query);
            break;
    }
}

// 监听请求
function handler(req, callback) {
    req.on('error', (err) => {
        return console.error(err);
    }).on('data', (chunk) => {
        data.push(chunk)
    }).on('end', () => {
        handleMethod(req,data,callback);
    })
}
let app = http.createServer((req, res) => {


handler(req, (params) => {
    router(req, res, params)
})




let cryptoStr = 'hansong';
// var sha1 = crypto.createHash("sha1");//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
//     sha1.update(str);
//     var res = sha1.digest("hex");

let sha1 = crypto.createHash("sha1");//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
sha1.update(cryptoStr);
let cryptoAtr = sha1.digest("hex");

console.log(cryptoAtr)
  res.write(cryptoAtr)
  res.end(cryptoAtr)
// crypto.createHmac('sha1', app_secret).update('待加密字串').digest().toString('base64'); //base64
// crypto.createHmac('sha1', app_secret).update('待加密字串').digest('hex');   //16进制
// 但该模块针对部分数据加密的结果，与其他语言加密的结果会不一致，因此采用第二种方式



// var CryptoJS = require('crypto-js');
 
// var str = 'orderId=21140600050549799429&orderStatus=TRADE_SUCCESS&payTime=2014-07-22 11:43:31';
// var key = 'REzySUKRCPfyfV/jfgwTA==';
// var sign = CryptoJS.HmacSHA1(str, key).toString();
// console.log(sign);




}).listen(3000, () => {
    console.log('监听3000端口成功！')
});

module.exports = app;