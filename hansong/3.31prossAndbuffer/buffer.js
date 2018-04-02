// 介绍Buffer的文章中，主要是围绕数据拼接和内存分配这两方面的

// 在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，每当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。

// Buffer 与字符编码
// Buffer 实例一般用于表示编码字符的序列，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。 通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。

const buf = Buffer.from('runoob', 'ascii');

console.log(buf.toString('hex'));
// 输出 72756e6f6f62

console.log(buf.toString('base64'));
// 输出 cnVub29i



// 创建 Buffer 类
// Buffer 提供了以下 API 来创建 Buffer 类：
// Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
// Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
// Buffer.allocUnsafeSlow(size)
// Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
// Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
// Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
// Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例


// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = BUffer.alloc(10, 1);

// 创建一个长度为10，且未初始化的Buffer
// 这个方法比调用Buffer.alloc()更快，
// 单返回的Buffer实例可能包含旧数据，
// 因此需要使用fill()或write()重写
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含[0x1, 0x2, 0x3] 的 Buffer。

const buf4 = Buffer.from([1,2,3]);


// 创建一个包含UTF-8字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést')

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');


// 写入缓冲区
// buf.write(string[, offset[, length]][, encoding])

// string - 写入缓冲区的字符串。
// offset - 缓冲区开始写入的索引值，默认为 0 。
// length - 写入的字节数，默认为 buffer.length
// encoding - 使用的编码。默认为 'utf8' 。

// 根据 encoding 的字符编码写入 string 到 buf 中的 offset 位置。 length 参数是写入的字节数。 如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分。 只部分解码的字符不会被写入。

// 返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。 
buf = Buffer.alloc(256);
len = buf.write('han,song');
console.log('写入的字节数：' + len);

// 写入字节数 : 14

// 从缓冲区读取数据
// buf.toString([encoding[, start[, end]]])

// encoding - 使用的编码。默认为 'utf8' 。
// start - 指定开始读取的索引位置，默认为 0。
// end - 结束位置，默认为缓冲区的末尾。

buf = BUffer.alloc(26);

for(var i=0; i<26; i++) {
    buf[i] =i + 97
}

console.log(buf.toString('ascii')); // 输出: abcdefghijklmnopqrstuvwxyz

console.log(buf.toString('ascii', 0, 5)); // 输出: abcde

console.log(buf.toString('utf8', 0, 5));//// 输出: abcde

console.log(buf.toString(undefined, 0, 5));//使用 'utf8' 编码, 并输出: abcde


// 将 Buffer 转换为 JSON 对象
// buf.toJSON()

const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);

const json = JSON.stringify(buf);

// {"type":"Buffer","data":[1,2,3,4,5]}
console.log(json);

const copy = JSON.parse(json, (key, value) => {
    return value && value.type === 'Buffer' ? Buffer.from(value.data) : value;
})

// 输出: <Buffer 01 02 03 04 05>
console.log(copy);



// 缓冲区合并
// Buffer.concat(list[, totalLength])

// list - 用于合并的 Buffer 对象数组列表。
// totalLength - 指定合并后Buffer对象的总长度。


// 返回一个多个成员合并的新 Buffer 对象。
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());

// buffer3 内容: 菜鸟教程 www.runoob.com

// 缓冲区比较
// otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象。
// 返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。

var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}

// ABC在ABCD之前

// 拷贝缓冲区
// buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])

// targetBuffer - 要拷贝的 Buffer 对象。
// targetStart - 数字, 可选, 默认: 0
// sourceStart - 数字, 可选, 默认: 0
// sourceEnd - 数字, 可选, 默认: buffer.length

var buf1 = Buffer.from('abcdefghijkl');

var buf2 = Buffer.from('RUNOOB');

//将 buf2 插入到 buf1 指定位置上
buf2.copy(buf1, 2);

console.log(buf1.toString());

// abRUNOOBijkl


// 缓冲区裁剪
// buf.slice([start[, end]])

// start - 数字, 可选, 默认: 0
// end - 数字, 可选, 默认: buffer.length


var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " + buffer2.toString());

// buffer2 content: ru

// 缓冲区长度
var buffer = Buffer.from('www.runoob.com');
//  缓冲区长度
console.log("buffer length: " + buffer.length);

// buffer length: 14