import { resolve } from 'path';

// path  模块提供了一些用于处理文件路径的小工具

const path = require('path');

let myPath = path.normalize('.//a//b//d//..//c/e//..//');//规范  此方法用于将非标准路径的字符串转化成标准路径字符串
console.log(myPath);//  a\b\c

// jion 方法就将多个参数值字符结合成一个路径字符串
let joinPath = path.join(__dirname, 'a', 'b', 'c');
console.log(joinPath); // //   D:\nodePro\fileTest\a\b\c

// __dirname变量值代表程序运行的根目录

// resolve方法
// 该方法以应用程序根目录为起点，根据所有的参数值字符串解析出一个绝对路径。
let resolve = path.resolve('a', 'b', 'c');

// relative方法
// 该方法用于读取两个路径之间的相对关系
let relative = path.relative('/fileTest/a/b/c', '/fileTest/china/shang');
console.log(relative);//  ..\..\..\china\shang

// dirname方法
// 获取一个路径下的目录名
let dirname = path.dirname('./a/b');
console.log(dirname);  //.a


// basebname方法
// 该方法用于获取一个路径中的文件名
let fileName = path.basename('./a/b.mess.txt');
console.log(filename)// mess.txt
let name = path.basename('./a/b.mess.txt', '.txt');
console.log(name); //mess

//extname方法
// 获取一个路径中的扩展名
console.log(path.extname('foo/index.html'));//.html

// path.sep属性
// 属性值为操作系统指定的文件分隔符，可能的属性为“\\”（window操作系统中）或“/”（unix操作系统中）。


// path.delimiter属性
// 属性值为操作系统中指定的路径分隔符，可能的属性值为“;”（window操作系统中）或“:”（unix操作系统中）。
