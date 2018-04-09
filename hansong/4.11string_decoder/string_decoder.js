// string_decoder - 字符串解码器

// string_decoder 模块提供了一个 API，用于把 Buffer 对象解码成字符串，但会保留编码过的多字节 UTF-8 与 UTF-16 字符。

// decoder.write(buffer)调用传入了Buffer对象<Buffer e4 bd a0>，相应的返回了对应的字符串你;
// string_decoder模块用于将Buffer转成对应的字符串。使用者通过调用stringDecoder.write(buffer)，可以获得buffer对应的字符串。
const StringDecoder = require('string_decoder').StringDecoder;

const decoder = new StringDecoder('utf8');

const str = decoder.write(Buffer.from([0xe4, 0xbd, 0xa0]));

console.log(str)//你


// 当decoder.end([buffer])被调用时，内部剩余的buffer会被一次性返回。如果此时带上buffer参数，那么相当于同时调用decoder.write(buffer)和decoder.end()。

const StringDecoder = require('string_decoder').StringDecoder;

const decoder = new StringDecoder('utf8');

// Buffer.from('你好') => <Buffer e4 bd a0 e5 a5 bd>
let str = decoder.write(Buffer.from([0xe4, 0xbd, 0xa0, 0xe5, 0xa5]));
console.log(str);  // 你

srt = decoder.end(Buffer.from([0xbd]));

console.log(str);