const http = require('http');
const crypto = require('crypto');




let app = http.createServer((req, res) => {




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