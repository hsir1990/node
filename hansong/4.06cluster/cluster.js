// 在如今机器的CPU都是多核的背景下，Node的单线程设计已经没法更充分的"压榨"机器性能了。所以从v0.8开始，Node新增了一个内置模块——“cluster”，故名思议，它可以通过一个父进程管理一坨子进程的方式来实现集群的功能

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length; // 获取CPU的个数  


if(cluster.isMaster){
    for (var i=0; i<numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    })
}else{
    http.createServer(function(req, res){
        res.writeHeade(200);
        res.end('hello word')
    }).listen(8000)
}

// 稍微解释下，通过isMaster属性，判断是否Master进程，是则fork子进程，否则启动一个server。每个HTTP server都能监听到同一个端口。


// 但是在实际项目中，我们的启动代码一般都已经封装在了app.js中，要把整块启动逻辑嵌在上面的if else中实在不优雅。 所以，我们可以这样：

const cluster = require('cluster');
const numCPUS = require('os').cpus().length;

if(cluster.isMaster){
    for(var i=0; i<numCPUs; i++){
        cluster.fork();
    }
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    })
}else{
    require('./app.js');
}


// pm2就是用这个机制写的



// RPC（Remote Procedure Call）—远程过程调用，它是一种通过网络从远程计算机程序上请求服务，而不需要了解底层网络技术的协议。
// IPC ( Instruction Per Clock， 即 CPU 每一时钟周期内所执行的指令多少) IPC代表了一款处理器的设计架构，一旦该处理器设计完成之后，IPC值就不会再改变了。在这里，IPC值的高低起到了决定性的作用，而频率似乎不再高于一切。
// IPC（Inter-Process Communication，进程间通信）。


// 开个QQ，开了一个进程；开了迅雷，开了一个进程。在QQ的这个进程里，传输文字开一个线程、传输语音开了一个线程、弹出对话框又开了一个线程。所以运行某个软件，相当于开了一个进程。在这个软件运行的过程里（在这个进程里），多个工作支撑的完成QQ的运行，那么这“多个工作”分别有一个线程。所以一个进程管着多个线程。通俗的讲：“进程是爹妈，管着众多的线程儿子”...

// 进程是cpu资源分配的最小单位，线程是cpu调度的最小单位。以前进程既是资源分配也是调度的最小单位，后来为了更合理的使用cpu(实际上是cpu性能越来越好)，才将资源分配和调度分开，就有了线程。线程是建立在进程的基础上的一次程序运行单位。