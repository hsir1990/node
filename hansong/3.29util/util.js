'use strict'

const util = require('util');

// util.inspect(object,[showHidden],[depth],[colors])  将任意对象装换成字符串的函数
let result = util.inspect(object);


// util.format  返回一个格式化字符串
util.format('%s:%s', 'foo', 'bar', 'baz'); //foo:bar baz 第三个被强制转换了 
var result = util.format(1, 2, 3);//'1 2 3'

// util.inherits
// util.inherits(constructor, superConstructor)是一个实现对象间原型继承的函数

// JavaScript的面相对象特性是基于原型的，与常见的基于类的不同。JavaScript没有提供对象继承的语言级别特性，而是通过原型复制来实现的。
// 定义一个Person类，一个Student的子类，使用原型的方式为Person类添加一个showName的函数，通过util.inherits实现继承。如下所示：

const util = require('util');

// 基类
function Person(){
    this.name = 'Preson';
    this.sayHello = function () {
        console.log('Hello, my name is' + this.name);
    }
}

Person.prototype.showName = function () {
    console.log(this.name);
}

util.inherits(Student, Person);

var objPerson = new Person();

objPerson.showName();
objPerson.sayHello();

console.log(objPerson);

var objStudent = new Student();

objStudent.showName();

console.log(objStudent);

// Person
// Hello,my name is Person
// Person{name:'Person', sayHello:[Function]};

// Student
// Student {name: "Student"}

util.isArray([]);
// 判断给定的对象是不是一个数组

util.isRegExp(/g/);
// 判断object是否是一个正则表达式

util.isDate();
// 判断是否是一个日期


// 如果给定的参数object是一个错误对象则返回true，否则返回false
util.isError(new Error());
util.isError(new TypeError());
