// var net = require('net');

// var HOST = '127.0.0.1';
// var PORT = 6969;

// var client = new net.Socket();
// client.connect(PORT, HOST, function() {

//     console.log('CONNECTED TO: ' + HOST + ':' + PORT);
//     // 建立连接后立即向服务器发送数据，服务器将收到这些数据 
//     client.write('I am Chuck Norris!');

// });

// // 为客户端添加“data”事件处理函数
// // data是服务器发回的数据
// client.on('data', function(data) {

//     console.log('DATA: ' + data);
//     // 完全关闭连接
//     client.destroy();

// });

// // 为客户端添加“close”事件处理函数
// client.on('close', function() {
//     console.log('Connection closed');
// });


// 创建TCP客户端
// 现在让我们创建一个TCP客户端连接到刚创建的服务器上，该客户端向服务器发送一串消息，并在得到服务器的反馈后关闭连接。下面的代码描述了这一过程。


const net = require('net');

const HOST = '127.0.0.1';
const PORT = 6969;

let client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // 建立连接后立即向服务器发送数据，服务器将收到这些数据
    client.write('I am Chunk Norris!');
})

// 为客户返回的添加’data‘事件处理函数
// data是服务器发回的数据
client.on('data', (data) => {
    console.log('DATA:' + data);

    // 完全关闭连接
    client.destroy();
});

// 为客户端添加’close‘事件处理函数
client.on('close', () => {
    console.log('关闭')
})

// // 这就是NodeJS中进行TCP网络编程的基本过程，希望能对你有所帮助。需要注意的是，套接字编程要比这里的例子复杂得多，当你使用套接字发送大量数据或完成复杂任务的时候，你就会用到流（Streams）和缓冲区（Buffers）等相关模块。

// 服务端的时候客户端才能运行