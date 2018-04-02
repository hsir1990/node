

const querystring = require('querystring');


//赋值一个函数来重写编码
let result = querystring.escape('sunName=云朴');
console.log(result); //sunName%3D%E4%BA%91%E6%9C%B4


let result4 =querystring.unescape('sunName%3D%E4%BA%91%E6%9C%B4');
console.log(result4); //sunName=云朴


//将字符串反序列化为对象
let url ='wd=%E5%AD%99%E5%A9%B7%E5%A9%B7&key=0x82db05e10002fc79&age=1&addr=1&rsv_idx=2&sex=utf-8';
let result2 = querystring.parse(url,null,null,{maxKeys:30});
// console.log(result2);
/**
 	querystring.parse(str,separator,eq,options)
 	str指需要反序列化的字符串;
　　separator（可省）指用于分割str这个字符串的字符或字符串，默认值为"&";
　　eq（可省）指用于划分键和值的字符或字符串，默认值为"=";
　　options:{maxKeys:30};指定解析键值对的最大值，默认值为1000，如果设置为0时，则取消解析的数量限制;
**/


//将一个对象序列化成一个字符串
let jsonA={foo: 'bar', baz: ['qux', 'quux'], corge: '' };
let result3 = querystring.stringify(jsonA,'&','=');
// console.log(result3); //foo=bar&baz=qux&baz=quux&corge=
/*
	querystring.stringify(obj,separator,eq,options)
	obj指需要序列化的对象
	separator（可省）用于连接键值对的字符或字符串，默认值为"&";
	eq（可省）用于连接键和值的字符或字符串，默认值为"=";
*/

