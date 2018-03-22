// // 想知道如何在NodeJS中使用socket编程？在NodeJS中有三种socket：1. TCP，2. UDP，3. Unix域套接字，本文主要介绍NodeJS中TCP的基本编程知识。

// // 你可以创建两种类型的TCP套接字：1. 服务端，2. 客户端。服务端TCP监听来自客户端的连接请求，并使用TCP连接向客户端发送数据；客户端TCP连接到服务端并与服务器交互数据。客户端与服务端之间依靠套接字进行双向通信。

// // 在NodeJS中使用TCP需要引用net模块。net模块是NodeJS中异步网络编程的封装，可以做很多事情，本文仅关注于如何使用该模块创建服务端与客户端的TCP套接字。




// 创建TCP服务端
const net = require('net');

const HOST = '127.0.0.1';
const PORT = 6969;

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为“connection”事件的处理函数
// 在每一个connection事件中，该回调函数接收到的socket对象是唯一的,不可在前面加connection事件
let servers = net.createServer((sock) => {
    // 打印地址和端口，我们获取一个连接，连接自动关联一个socket对象
    console.log('CONNECTED:' + sock.remoteAddress  + ':' + sock.remotePort);

    // 为这个cosket实例添加一个’data‘事件处理函数
    sock.on('data', (data) => {
        console.log('DATA' + sock.remoteAddress  + ':' + data);

        // 回发该数据，客户端将接收来自服务端的数据
        sock.write('You said: "' + data + '"' );
    });

    // 为这个socket实例添加一个’close‘事件处理函数
    sock.on('close', (data) => {
        console.log('CLOSED:' + sock.remoteAddress  + '  ' + sock.remotePort)
    })
}).listen(PORT, HOST);

console.log(`监听${HOST}:${PORT}`)





// const net = require('net');

// const HOST = '127.0.0.1';
// const PORT = 6969;
// // 另外一种写法
// servers = net.createServer();

// servers.listen(PORT, HOST);

// // 打印地址和端口号
// // console.log('Server listening on' + servers.address().address + ':' + servers.address().port);
// // console.log('Server listening on ' + servers.address().address + ':' + servers.address().port);


// servers.on('connection', (sock) => {
//     console.log('CONNECTED:' + sock.remoteAddress + ':' + sock.remotePort);
// })


