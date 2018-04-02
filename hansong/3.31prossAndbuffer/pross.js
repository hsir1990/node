// NodeJs是一个单进程的语言，不能像Java那样可以创建多线程来并发执行。当然在大部分情况下，NodeJs是不需要并发执行的，因为它是事件驱动性永不阻塞。但单进程也有个问题就是不能充分利用CPU的多核机制，根据前人的经验，可以通过创建多个进程来充分利用CPU多核，并且Node通过了child_process模块来创建完成多进程的操作。

// process模块用来与当前进程互动，可以通过全局变量process访问，不必使用require命令加载。它是一个EventEmitter对象的实例。


// process.pid: 当前进程的进程号
// process.version: Node的版本，比如v1。10.9
// process.platform:当前系统平台，比如linux。
// process.title: 默认值为“node”，可以自定义该值。
// process.argv:当前进程的命令行参数数组
// process.env: 指向当前shell的环境变量，比如process.env.HOME
// process.execPath:运行当前进程的可执行文件的绝对路径
// process.stdout:指向标准输出
// process。stdin：指向标准输出
// process。stderr：指向标准错误


// // process.stdout用来控制标准输出，也就是在命令行窗口向用户显示内容。它的write方法等同于console.log。

// exports.log = function () {
//     process.stdout.write(format.apply(this, arguments) + '\n');
// };

// // process.argv 返回命令行脚本的各个参数组成的数组

// 先新建一个脚本文件argv.js。


// // argv.js
  
// console.log("argv: ",process.argv);
// console.log("argc: ",process.argc);
// 在命令行下调用这个脚本，会得到以下结果。


// node argv.js a b c
// # [ 'node', '/path/to/argv.js', 'a', 'b', 'c' ]
// 上面代码表示，argv返回数组的成员依次是命令行的各个部分。要得到真正的参数部分，可以把argv.js改写成下面这样。


// // argv.js
  
// var myArgs = process.argv.slice(2);
// console.log(myArgs);


// process对象提供了一下方法
// process.exit();退出当前进程

// process.cwd()返回运行当前脚本的工作目录的路径
// process.chdir();改变工作目录
// process.nextTick():将一个回调函数放在下次时间循环的顶部


// process.chdir()改变工作目录的例子

process.cwd()
// # '/home/aaa
process.chdir('/home/bbb')

process.cwd()
// # '/home/bbb'

process.nextTick(function () {
    console.log('Next event loop!');
});
// 上面代码可以用setTimeout改写，但是nextTick的效果更高、描述更准确。
setTimeout(function () {
    console.log('Next event loop!');
 }, 0)

//  （1）exit事件

// 当前进程退出时，会触发exit事件，可以对该事件指定回调函数。这一个用来定时检查模块的状态的好钩子(hook)(例如单元测试),当主事件循环在执行完’exit’的回调函数后将不再执行,所以在exit事件中定义的定时器可能不会被加入事件列表.

process.on('exit', function () {
    fs.writeFileSync('/tmp/myfile', 'wodewenben');
})

// uncaughtException事件
// 当前进程抛出一个没有被捕捉的意外时，会触发uncaughtException事件

process.on('uncaughtException', function (err) {
    console.log('An uncaught error occurred!');
    console.log(err.stack);
})