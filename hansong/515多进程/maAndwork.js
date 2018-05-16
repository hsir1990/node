const cluster = require('cluster');
const  http = require('http');
var  numCPUs = require('os').cpus().length;

// 判断是不是master节点
if(cluster.isMaster){
    console.log('[master] ' + 'start master.........');

    for(let i = 0; i < numCPUs.length; i++){
        // 创建worker进程
        var wk = cluster.fork();
        // master给worker发送消息。注：worker给发master发送消息要用process.send(message)
        wk.send('[master] ' + 'hi worker ' + wk.id);
    }
    // 监听创建worker进程事件
    cluster.on('fork', function(worker) {
        console.log('[master] ' + 'fork : worker' + worker.id);
    });
    // 监听worker创建成功事件
    cluster.on('online', function(worker) {
        console.log('[master] ' + 'online : worker' + worker.id)
    })
    // 监听worker向master状态事件
    cluster.on('listening', function(worker, address){
        console.log('[master] ' + 'listening : worker' + worker.id + ',pid:' + worker.process.pid + ',Adderss:' + address.address + ':' + address.port);
    })
    // 监听worker断线事件

    cluster.on('disconnect', function(worker) {
        console.log('[master] ' + 'disconnect : worker' + worker.id);
    })
    
    // 监听worker退出事件
    cluster.on('exit', function(worker, code, signal){
        console.log('[master] ' + 'exit : worker' + worker.id + 'died') 
    })


    // 遍历cluster.workers；
    function eachWorker(callback) {
        for(var id in cluster.workers) {
            callback(cluster.worker[id]);
        }
    }

    setTimeout(function(){
        eachWorker(function(worker){
            //  master给worker发送消息。注：worker给发master发送消息要用process.send(message)
            worker.send('[master] ' + 'send message to worker' + worker.id);
        })
    }, 3000)
console.log(cluster.workers,'1234567')
Object.keys(cluster.isWorker).forEach(function(id){
    // 监听master和worker的message事件
    cluster.worker[id].on('message', function(msg){
        console.log('[master] ' + 'message ' + msg);
    })
})
    // 判断是不是worker节点
}else if(cluster.isWorker){
    // worker.id: 进程ID号
    console.log('[worker] ' + 'start worker .....' + cluster.worker.id);

    // 如果 Node.js 进程是由 IPC 通道的方式创建的（详见子进程和集群文档），当子进程收到父进程发送的消息时(消息通过 childprocess.send() 发送），会触发 'message' 事件。
    process.on('message', function(msg) {
        console.log('[worker] worker' + cluster.worker.id + ' rexeived!'); 
    })

    http.createServer(function(req, res){
        res.writeHead(200, {"content-type" : "text/html"});
        res.end('worker' + cluster.worker.id + ',PID:' + process.pid);
    }).listen(3000);
}



// // Object.keys(obj)的使用
// 传入对象，返回属性名
// // var obj = {'a':'123','b':'345'};
// // console.log(Object.keys(obj));  //['a','b']

// // var obj1 = { 100: "a", 2: "b", 7: "c"};
// // console.log(Object.keys(obj1)); // console: ["2", "7", "100"]

// // var obj2 = Object.create({}, { getFoo : { value : function () { return this.foo } } });
// // obj2.foo = 1;
// // console.log(Object.keys(obj2)); // console: ["foo"]
// 传入字符串，返回索引
// var str = 'ab1234';
// console.log(Object.keys(obj));  //[0,1,2,3,4,5]
// 数组 返回索引
// var arr = ["a", "b", "c"];
//     console.log(Object.keys(arr)); // console: ["0", "1", "2"]


// var cluster = require('cluster');
// var http = require('http');
// var numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//     console.log('[master] ' + "start master...");

//     for (var i = 0; i < numCPUs; i++) {
//         var wk = cluster.fork();
//         wk.send('[master] ' + 'hi worker' + wk.id);
//     }

//     cluster.on('fork', function (worker) {
//         console.log('[master] ' + 'fork: worker' + worker.id);
//     });

//     cluster.on('online', function (worker) {
//         console.log('[master] ' + 'online: worker' + worker.id);
//     });

//     cluster.on('listening', function (worker, address) {
//         console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
//     });

//     cluster.on('disconnect', function (worker) {
//         console.log('[master] ' + 'disconnect: worker' + worker.id);
//     });

//     cluster.on('exit', function (worker, code, signal) {
//         console.log('[master] ' + 'exit worker' + worker.id + ' died');
//     });

//     function eachWorker(callback) {
//         for (var id in cluster.workers) {
//             callback(cluster.workers[id]);
//         }
//     }

//     setTimeout(function () {
//         eachWorker(function (worker) {
//             worker.send('[master] ' + 'send message to worker' + worker.id);
//         });
//     }, 3000);

//     Object.keys(cluster.workers).forEach(function(id) {
//         cluster.workers[id].on('message', function(msg){
//             console.log('[master] ' + 'message ' + msg);
//         });
//     });

// } else if (cluster.isWorker) {
//     console.log('[worker] ' + "start worker ..." + cluster.worker.id);

//     process.on('message', function(msg) {
//         console.log('[worker] '+msg);
//         process.send('[worker] worker'+cluster.worker.id+' received!');
//     });

//     http.createServer(function (req, res) {
//             res.writeHead(200, {"content-type": "text/html"});
//             res.end('worker'+cluster.worker.id+',PID:'+process.pid);
//     }).listen(3000);

// }


// var cluster = require('cluster');
// var http = require('http');
// var numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//     console.log('[master] ' + "start master...");

//     for (var i = 0; i < numCPUs; i++) {
//          cluster.fork();
//     }

//     cluster.on('listening', function (worker, address) {
//         console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
//     });

// } else if (cluster.isWorker) {
//     console.log('[worker] ' + "start worker ..." + cluster.worker.id);
//     http.createServer(function (req, res) {
//         console.log('worker'+cluster.worker.id);
//         res.end('worker'+cluster.worker.id+',PID:'+process.pid);
//     }).listen(3000);
// }
