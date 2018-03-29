// event模块是nodejs系统中十分重要的一个模块，使用该模块我们可以实现事件的绑定的触发，为什么我们需要这个模块呢，因为nodejs是单线程异步的。

// 一、什么是单线程异步：

//         我们可以从JavaScript来理解，就是存在一个等待执行队列，每当有代码行为产生，我们便将其随机放到等待执行队列，但是由于单线程的原因，我们一次只能处理一个任务，只有在当线程空闲时才能处理下一个任务，在线程处理时，我们仍然可以将要处理的任务放到等待执行队列中，也就说线程的任务处理和我们读取代码放任务到等待执行队列上这两个行为是可以同时进行的，即异步，线程一次只能处理一个任务，即单线程。
setTimeout(function (){
    console.log('I am coming');
}, 100);

console.log('before while');

// on：添加事件（事件队列尾部添加）
// once：添加只能触发一次便失效的事件（事件队列尾部添加）
// prependListener：添加事件（添加到事件队列头部）
// prependOnceListener：添加只能触发一次便失效的事件（添加到事件队列头部）
// emit：触发事件
// removeListener：删除某个事件

on(eventName, listener[,arg1][,arg2]...);

// eventName:注册事件名字
// listener:事件处理函数
// arg1，arg2：往事件处理函数中传入参数

'use strict'

const Event = require('events');

const Event1 = new Event();

Event1.on('come', function () {
    console.log('wo lai le')
})

Event1.emit('come');//wo lai le

// once 同on，但是只能触发一次，触发一次后便从事件队列中删除
// prependListener 同on，但是是往事件队列头部添加
// prependOnceListener 同on，但是是往事件队列头部添加，且只能触发一次
// emit（eventName）触发eventName事件
// removeListener（eventName）解除eventName事件绑定


'use strict'

const Event = require('events');

const event1 = new Event();

event1.on('come', function () {
    console.log('wo  lai le 01');
});

event1.on('come', function () {
    console.log('wo lai le 02')
})

event1.prependListener('come', function () {
    console.log('wo lai le 03')
})


event1.emit('come');

/*
    I am coming03
    I am coming01
    I am coming02
 */


// event方法简单模拟实现：

'use strict'

// evnet 实现模拟
EventEmitter.prototype = {
    // on方法
    on : function (eventName, cd) {
        this.events[eventName] = cb;
    },

    emit : function(eventName) {
        const args = Array.prototype.slice.call(arguments, 1);
        const cb = this.events[eventName];
        cb.apply(this, args);

        console.log(this);
    }

}

function EventEmitter() {
    this.evnets = {};
}

const event1 = new EventEmitter();

event1.on('call', (name, word) => {
    console.log('i am calling,', name, word);
})

event1.emit('call', 'john', 'hello')

// 三.event模块的继承：
// event模块可以被其他类继承，从而具有event模块的属性
'use strict';

const Event = require('events');
const util = require('util');

// Phone类
Phone.prototype.message = function () {
    console.log('I am sending message');
}

function Phone() {}

// 通过util.inherits继承
util.inherits(Phone, Event);

// 测试
const phone = new Phone();

phone.on('call', function () {
    this.message();
})

phone.emit('call');//I am sending message


'use strict'

const Event = require('events');

// extends
class Phone extends Event{
    message () {
        console.log('I am sending message')
    }
}

// 测试
const phone = new Phone();

phone.on('call', function () {
    this.message();
})

phone.emit('call')// I am sending message


// nodejs模块之event
// event模块是nodejs系统中十分重要的一个模块，使用该模块我们可以实现事件的绑定的触发，为什么我们需要这个模块呢，因为nodejs是单线程异步的。

// 一、什么是单线程异步：

//         我们可以从JavaScript来理解，就是存在一个等待执行队列，每当有代码行为产生，我们便将其随机放到等待执行队列，但是由于单线程的原因，我们一次只能处理一个任务，只有在当线程空闲时才能处理下一个任务，在线程处理时，我们仍然可以将要处理的任务放到等待执行队列中，也就说线程的任务处理和我们读取代码放任务到等待执行队列上这两个行为是可以同时进行的，即异步，线程一次只能处理一个任务，即单线程。

// 如下例子：

// setTimeout(function (){
//     console.log('I am coming');
// }, 100);

// console.log('before while');
// 结果是先打印before while，然后再打印I am coming，而不是在100ms的延时时阻塞之后代码的执行，注册定时器后继续执行之后的代码。

// 二、event模块的主要方法：

// on：添加事件（事件队列尾部添加）
// once：添加只能触发一次便失效的事件（事件队列尾部添加）
// prependListener：添加事件（添加到事件队列头部）
// prependOnceListener：添加只能触发一次便失效的事件（添加到事件队列头部）
// emit：触发事件
// removeListener：删除某个事件
// on（eventName, listener[, arg1][, arg2]...）    
// eventName：注册事件名字

// listener：事件处理函数

// arg1，arg2：往事件处理函数中传入的参数

// 复制代码
// "use srict";

// const Event = require('events');

// const event1 = new Event();

// event1.on('come', function () {
//     console.log('I am coming');
// });

// event1.emit('come'); // I am coming
// 复制代码
 

// 　　2. once 同on，但是只能触发一次，触发一次后便从事件队列中删除

// 　　3. prependListener 同on，但是是往事件队列头部添加

// 　　4. prependOnceListener 同on，但是是往事件队列头部添加，且只能触发一次

// 　　5. emit（eventName）触发eventName事件

// 　　6. removeListener（eventName）解除eventName事件绑定

// 同一事件可以绑定多次，触发时按照事件队列顺序执行，on和once是往事件队列尾部添加，prependListener和prependOnceListener是往事件队列头部添加，这便形成了同一事件的执行顺序

// 复制代码
// "use srict";

// const Event = require('events');

// const event1 = new Event();

// event1.on('come', function () {
//     console.log('I am coming01');
// });
// event1.on('come', function () {
//     console.log('I am coming02');
// });
// event1.prependListener('come', function () {
//     console.log('I am coming03');
// })
// event1.emit('come'); 
// /*
//     I am coming03
//     I am coming01
//     I am coming02
//  */
// 复制代码
 

// event方法简单模拟实现：

// 复制代码
// "use strict";

// // evnet  实现模拟
// EventEmitter.prototype = {
//     // on方法
//     on: function(eventName, cb) {
//         this.events[eventName] = cb;
//     },
//     // emit，传参
//     emit: function(eventName) {
        
//         const args = Array.prototype.slice.call(arguments, 1);
//         const cb = this.events[eventName];
//         cb.apply(this, args);
//         console.log(this);
//     },

// }
// function EventEmitter() {
//     this.events = {};
// }

// const event1 = new EventEmitter();

// event1.on('call', (name, word) => {  
//     console.log('I am calling,', name, word);
// });
// event1.emit('call', 'john', 'hello'); // I am calling
// 复制代码
 

// 三、event模块的继承：

// event模块可以被其他类继承，从而具有event模块的属性

// 两种方法：

// 1、util.inherits

// 复制代码
// "use srict";

// const Event = require('events');
// const util = require('util');

// // Phone类
// Phone.prototype.message = function () {
//     console.log('I am sending message');
// }
// function Phone() {}
// // 通过util.inherits继承
// util.inherits(Phone, Event);
// // 测试
// const phone = new Phone();
// phone.on('call', function () {
//     this.message();
// });
// phone.emit('call'); // I am sending message
// 复制代码
 

// 2、通过ES6的extends实现继承（推荐）

// 复制代码
// "use srict";

// const Event = require('events');
// // extends
// class Phone extends Event {
//     message() {
//         console.log('I am sending message');
//     }
// }
// // 测试
// const phone = new Phone();
// phone.on('call', function () {
//     this.message();
// });
// phone.emit('call'); // I am sending message