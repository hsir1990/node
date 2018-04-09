// UDP 是User Datagram Protocol的简称， 中文名是用户数据报协议，是OSI（Open System Interconnection，开放式系统互联） 参考模型中一种无连接的传输层协议，提供面向事务的简单不可靠信息传送服务，IETF RFC 768是UDP的正式规范。UDP在IP报文的协议号是17。
// TCP（Transmission Control Protocol 传输控制协议）是一种面向连接的、可靠的、基于字节流的传输层通信协议，由IETF的RFC 793定义.
// UDP 协议基本上是IP协议与上层协议的接口
// 在选择使用协议的时候，选择UDP必须要谨慎。在网络质量令人十分不满意的环境下，UDP协议数据包丢失会比较严重。但是由于UDP的特性：它不属于连接型协议，因而具有资源消耗小，处理速度快的优点，所以通常音频、视频和普通数据在传送时使用UDP较多，因为它们即使偶尔丢失一两个数据包，也不会对接收结果产生太大影响。比如我们聊天用的ICQ和QQ就是使用的UDP协议。


// dgram模块提供了 UDP 数据包 socket 的实现。
const dgram = require('dgram');

const server = dgram.createSocket('udp4');


server.on('error', (err) => {
    console.log(`服务器异常： ${err.stack}`);
    server.close();
})

server.on('message', (msg, rinfo) => {
    console.log(`服务器收到：${msg} 来自${rinfo.address}:${rinfo.port}`);
})

server.on('listening', () => {
    const address = server.address();
    console.log(`服务器监听 ${address.address} : ${addrss.port}`);
})

server.bind(1235);