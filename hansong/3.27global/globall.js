// JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可 以在程序的任何地方访问，即全局变量。在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。 


// global 最根本的作用是作为全局变量的宿主。按照 ECMAScript 的定义，满足以下条 件的变量是全局变量： 
// - 在最外层定义的变量； ? 
// - 全局对象的属性； ?
// -  隐式定义的变量（未定义直接赋值的变量）。

// 在 Node.js 中你不可能在最外层定义变量，因为所有用户代码都是属于当前模块的， 而模块本身不是最外层上下文。

// foo.js
global.foo = 'hello';

//bar.js
require('.foo')
console.log(foo) //hello

// 定义在 global 上面的变量，不需要在模块中通过 exports 输出，其他模块中也能使用。


// __dirname
// dirname 实际上不是一个全局变量，在命令行模式下直接调用会提示dirname 未定义，但是在模块中可以直接使用，返回当前脚本执行的目录。

// __filename
// 返回当前执行代码文件的名称（包含文件的绝对路径）。和dirname 一样，filename 也不是一个全局变量，但在模块中可以直接使用。


console.log(filename); // c:\Users\percy\Desktop\nodejs\1.js
console.log(dirname); // c:\Users\percy\Desktop\nodejs


// 在使用 require 函数加载模块文件时，将运行该模块文件中的每一行代码
// 模块在首次加载后将缓存在内存缓存区中，所以对于相同模块的多次引用得到的都是同一个模块对象，即对于相同模块的多次引用不会引起该模块内代码的多次执行。

// 包装前 module666.js
const PI = 66666;
module.exports = PI;
// 包装后，注意下面不是立即执行函数
(function(exports, require, module, filename, dirname){
    const PI = 66666;
    module.exports = PI;
})


// Buffer 对象： 用于处理二进制数据

// module 对象： 用于访问当前模块的信息

// process 对象： 用于访问进程信息

// console 对象： 用于向控制端输出某些信息

// 6 个计时器相关函数

console.dir()//打印一个对象的详细信息
console.time()
console.timeEnd()//用来统计代码执行时间

