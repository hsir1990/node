// openssl genrsa -out server.key 2048//这是秘钥
// openssl req -new -sha256 -key server.key -out csr.pem//这好像是签名请求？没在意 
// openssl x509 -req -in csr.pem -signkey server.key -out cert.pem//这是证书
'use strict'

const https = require('https');

const fs = require('fs');

const port = 5000;
//定义参数
const options = {
    key : fs.readFileSync('./server.pem'),//这是我在ssl目录下生成的server.key改名为server.pem
    
    cert : fs.readFileSync('./cert.pem'),

    requestCert : true, //请求客户端证书

    rejectUnauthorized : false //如果没有请求到客户端来自信任CA颁发的证书，拒绝客户端的连接
}

let servers = https.createServer(options, (req, res) => {
    
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.end(`端口${port}成功`)
}).listen(port, () => {
    console.log(`端口${port}成功`)
})

// ccomplete	客户端请求是否已经发送完成
// httpVersion	HTTP协议版本，通常是1.0或1.1
// method	HTTP请求方法，如：GET,POST
// url	原始的请求路径
// headers	HTTP请求头
// trailers	HTTP请求尾(不常见)
// connection	当前HTTP连接套接字，为net.Socket的实例
// socket	connection属性的别名
// client	client属性的别名