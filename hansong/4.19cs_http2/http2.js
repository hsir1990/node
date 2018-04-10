// 该http2模块提供了HTTP / 2协议的实现。它可以通过以下方式访问：

// Core API提供了一个专门为支持HTTP / 2协议功能而设计的低级接口。它特别不是为了与现有的HTTP / 1模块API 兼容而设计的。但是，兼容性API是。

// 该http2核心API是客户端和服务器比之间更加对称的 httpAPI。例如，大多数事件，如error和socketError，可以或者通过客户端代码或服务器端代码发射。

const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
    key : fs.readFileSync('localhost-privkey.pem'),
    cert:fs.readFileSync('localhost-cert.pem')
})

server.on('error', (err) => console.error(err));
server.on('socketError', (err) => console.error(err));

server.on('stream', (stream, hraders) => {
    stream.respond({
        'content-type': 'text/html',
    ':status': 200
    })
    stream.end('<h1>Hello World</h1>');
})

server.listen(8443);