var url = require('url');
const urlString = 'http://www.baidu.com/a/b;'

var obj = url.parse(urlString);
console.log(obj);
var urlString = 'http://user:password@www.baidu.com:8080/a/b/?c=d&e=f#abc';

console.log(obj);
console.log(obj.protocol);
console.log(obj.slashes);
console.log(obj.auth);
console.log(obj.host);
console.log(obj.port);
console.log(obj.hostname);
console.log(obj.hash);
console.log(obj.hash);
console.log(obj.search);
console.log(obj.query);
console.log(obj.pathname);
console.log(obj.path);
console.log(obj.href);
var urlString = '//foo/bar';
var obj = url.parse(urlString, true, true);
console.log(obj);

var obj = {
    protocol: 'http:',
    host: '127.0.0.1:8080',
    pathname: '/a/b',
    search: 'c=d'
}

var str = url.format(obj);
console.log(str);

var str = url.resolve('/one/two/three', 'four');
console.log(str);

var str = url.resolve('one/two/three', '/four');
console.log(str);

var str = url.resolve('http://www.baidu.com', '/one');
console.log(str);