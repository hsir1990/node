

// console.log('####====START====###');
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;
// function fibo(n) { …}
//  
// // 当该进程是主进程时，返回 true。
// if (cluster.isMaster) {
//  var collection = [44, 42, 42, 43];
//  var st = Date.now();
//  for (var i = 0; i < Math.min(numCPUs, collection.length); i++) {
//  var wk = cluster.fork();
//  wk.send(collection[i]);
//  }
//  cluster.on('fork', function (worker) {
//  console.log(`[master] : fork worker ${worker.id}`);
//  });
//  cluster.on('exit', function (worker, code, signal) {
//  console.log(`[master] : worker ${worker.id} died`);
//  });
//  var numOfCompelete = 0
//  Object.keys(cluster.workers).forEach(function (id) {
//  cluster.workers[id].on('message', function (msg) {
//  console.log(`[master] receive message from [worker ${id}]: ${msg}`);
//  numOfCompelete++;
//  if (numOfCompelete === collection.length) {
//  console.log(`[master] finish all work and using ${Date.now() -
//  st} ms`);
//  cluster.disconnect();
//  }
//  });
//  });
//  
// } else {
//  process.on('message', function (msg) {
//  var st = Date.now();
//  var result = fibo(msg);
//  console.log(`[worker ${cluster.worker.id}] finish work and using
//  ${Date.now() - st} ms`);
//  process.send(result);
//  });
// }


var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
console.log(numCPUs,'cup数量')
if (cluster.isMaster) {
    console.log("master start...");

    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
        // 衍生出一个新的工作进程。只能通过主进程调用。
    }

//     当一个工作进程调用listen()后，工作进程上的server会触发'listening' 事件，同时主进程上的 cluster 也会被触发'listening'事件。

// 事件处理器使用两个参数来执行，其中worker包含了工作进程对象，address 包含了以下连接属性： address、port 和 addressType。当工作进程同时监听多个地址时，这些参数非常有用。
    cluster.on('listening',function(worker,address){
        console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
    });

    // process.pid属性返回进程的PID//也就是进程的id
//     当任何一个工作进程关闭的时候，cluster模块都将触发'exit'事件。

// 可以被用来重启工作进程（通过调用.fork()）。
// cluster.on('exit', (worker, code, signal) => {
//     console.log('worker %d died (%s). restarting...',
//                 worker.process.pid, signal || code);
//     cluster.fork();
//   });
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    http.createServer(function(req, res) {
        console.log('监听接口')
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(0);
}
