
const { URL } = require('url');

const myURL = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
// console.log(myURL);
console.log(myURL.hash);
console.log(myURL.host);
console.log(myURL.hostname);
console.log(myURL.href);
console.log(myURL.password);
console.log(myURL.pathname);
console.log(myURL.port);
console.log(myURL.protocol);
console.log(myURL.search);
console.log(myURL.username);
console.log(myURL.toString);
console.log(myURL.port);
console.log(myURL.protocol);


const myURL2 = new URL('/foo', 'https://example.org/');

myURL2.hash = 'baz'; //https://example.org/foo#baz
myURL2.host = 'www.sina.com:8002'; //https://sina.com:8002/foo#baz
myURL2.hostname = 'sun1985.com';  //https://sun1985.com:8002/foo#baz
// console.log(myURL2.href); 



const myURL3 = new URL({ toString: () => 'https://example.org/' });
// console.log(myURL3.href); 



const myURL4 = new URL('https://你好你好');
// console.log(myURL4);