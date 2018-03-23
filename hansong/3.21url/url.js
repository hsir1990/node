import { resolve } from 'url';

'use strict'

const url = require('url');


// url一共提供了三个方法，分别是url.parse();　　url.format();　　url.resolve();
// 1 url.parse(urlString,boolean,boolean)
// 　　parse这个方法可以将一个url的字符串解析并返回一个url的对象
// 　　参数：urlString指传入一个url地址的字符串
// 　　　　　第二个参数（可省）传入一个布尔值，默认为false，为true时，返回的url对象中，query的属性为一个对象。
// 　　　　　第三个参数（可省）传入一个布尔值，默认为false，为true时，额，我也不知道有什么不同，可以去看看API。

url.parse('http://user:pass@com:8080/p/a/t/h?query=string#hash');
/*
返回值：
{
  protocol: 'http:',//协议,http:
  slashes: true,//协议后是否有双斜杠,true
  auth: 'user:pass',//认证或授权,user:password  
  host: 'host.com:8080',//认证或授权,user:password  
  port: '8080',//端口号,8080 
  hostname: 'host.com',//主机名 www.baidu.com 
  hash: '#hash',//锚点名称,#abc  
  search: '?query=string',
  query: 'query=string',//字符串      //查询内容, c=d&e=f ,当parse的第二个参宿为true时,会将query解析为对象{ c: 'd', e: 'f' }  
  pathname: '/p/a/t/h',//路径名, /a/b  
  path: '/p/a/t/h?query=string',//把pathname和search组合起来,  /a/b?c=d&e=f  
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'//完整的链接地址,http://user:password@www.baidu.com:8080/a/b?c=d&e=f#abc  
 }
没有设置第二个参数为true时，query属性为一个字符串类型
*/


url.parse("http://user:pass@host.com:8080/p/a/t/h?query=string#hash",true);
/*
返回值：
 {
  protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: { query: 'string' },//对象//查询内容, c=d&e=f ,当parse的第二个参宿为true时,会将query解析为对象{ c: 'd', e: 'f' }  
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
 }
返回的url对象中，query属性为一个对象
*/

// 2.url.format(urlObj);
// format这个方法将传入的url对象编程一个url字符串
// 参数：urlObj指一个url对象

url.format({
    protocol : "http:",
    host : "182.163.0:60",
    port : "60"
});
/*
返回值：
'http://182.163.0:60'
*/


// 3.url.resolve(from, to);
// resolve这个方法返回一个格式“from/to”的字符串，在宝宝看来是对传入的两个参数用“/”符号拼接，并返回

url.resolve("http://whitemu.com", "gulu");

/*
返回值：
'http://whitemu.com/gulu'
*/