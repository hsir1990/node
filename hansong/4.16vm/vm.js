// vm(虚拟机) 模块提供了一系列 API 用于在 V8 虚拟机环境中编译和运行代码。

// VM模块是NodeJS里面的核心模块，支撑了require方法和NodeJS的运行机制，我们有些时候可能也要用到VM模板来做一些特殊的事情。

// 通过VM，JS可以被编译后立即执行或者编译保存下来稍后执行（JavaScript code can be compiled and run immediately or compiled, saved, and run later.）

// VM模块包含了三个常用的方法，用于创建独立运行的沙箱体制，如下三个方法

// vm.runInThisContext(code, filename);

// 此方法用于创建一个独立的沙箱运行空间，code内的代码可以访问外部的global对象，但是不能访问其他变量
// 而且code内部global与外部共享

const vm = require('vm');

let p = 5;
global.p = 11;

vm.runInThisContext("console.log('ok', p)");// 显示global下的11
vm.runInThisContext("console.log(global)"); // 显示global


console.log(p);// 显示5

vm.runInContext(code, sandBox);

// 此方法用于创建一个独立的沙箱运行空间，sandBox将做为global的变量传入code内，但不存在global变量

const vm = require("vm");
const util = require('util');

var window = {
    p: 2,
    vm: vm,
    console: console,
    require: require
};

const p = 5;

global.p = 11;

vm.createContext(window);

vm.runInContext('p=3;console.log(typeof global);', window); // global是undefined

console.log(window.p);// 被改变为3


console.log(util.inspect(window));
vm.runInNewContext(code, sandbox, opt);


