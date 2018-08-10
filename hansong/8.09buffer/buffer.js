// 一，开篇分析

// 所谓缓冲区Buffer，就是 "临时存贮区" 的意思，是暂时存放输入输出数据的一段内存。

// JS语言自身只有字符串数据类型，没有二进制数据类型，因此NodeJS提供了一个与String对等的全局构造函数Buffer来提供对二进制数据的操作。除了可以读取文件得到Buffer的实例外，还能够直接构造，例如：

// 复制代码 代码如下:

// 　var buffer = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]) ; 
// Buffer与字符串类似，除了可以用.length属性得到字节长度外，还可以用[index]方式读取指定位置的字节，例如：

// 复制代码 代码如下:

// buffer[0] ; // 0x68;
// Buffer与字符串能够互相转化，例如可以使用指定编码将二进制数据转化为字符串：

// 复制代码 代码如下:

var str = buffer.toString("utf-8");  // hello
// 将字符串转换为指定编码下的二进制数据：

// 复制代码 代码如下:

var buffer= new Buffer("hello", "utf-8") ; // <Buffer 68 65 6c 6c 6f>
// 一点儿区别：

// Buffer与字符串有一个重要区别。字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。

// 至于Buffer，更像是可以做指针操作的C语言数组。例如，可以用[index]方式直接修改某个位置的字节。

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// slice方法也不是返回一个新的Buffer，而更像是返回了指向原Buffer中间的某个位置的指针，如下所示。

// [ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]
//     ^           ^
//     |           |
//    bin     bin.slice(2)
// 因此对slice方法返回的Buffer的修改会作用于原Buffer，例如：

// 复制代码 代码如下:

 var buffer= new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]) ;
 var sub = bin.slice(2) ;
 sub[0] = 0x65 ;
 console.log(buffer) ; //  <Buffer 68 65 65 6c 6f>
// 如果想要拷贝一份Buffer，得首先创建一个新的Buffer，并通过.copy方法把原Buffer中的数据复制过去。

// 这个类似于申请一块新的内存，并把已有内存中的数据复制过去。以下是一个例子。

// 复制代码 代码如下:

 var buffer= new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]) ;
 var dup = new Buffer(bin.length) ;
 buffer.copy(dup) ;
 dup[0] = 0x48 ;
 console.log(buffer) ;  // <Buffer 68 65 6c 6c 6f>
 console.log(dup) ;  // <Buffer 48 65 65 6c 6f>
// 总之，Buffer将JS的数据处理能力从字符串扩展到了任意二进制数据。

// 以上简单让大家了解一下什么是Buffer，下面具体说说如何使用和具体使用场景。

// 二，聊聊Buffer

// JavaScript对字符串处理十分友好，无论是宽字节还是单字节字符串，都被认为是一个字符串。Node中需要处理网络协议、操作数据库、处理图片、文件上传等，还需要处理大量二进制数据，自带的字符串远不能满足这些要求，因此Buffer应运而生。

// Buffer结构

// Buffer是一个典型的Javascript和C++结合的模块，性能相关部分用C++实现，非性能相关部分用javascript实现。

// Node在进程启动时Buffer就已经加装进入内存，并将其放入全局对象，因此无需require

// Buffer对象：类似于数组，其元素是16进制的两位数。

// Buffer内存分配

// Buffer对象的内存分配不是在V8的堆内存中，在Node的C++层面实现内存的申请。

// 为了高效的使用申请来得内存，Node中采用slab分配机制，slab是一种动态内存管理机制，应用各种*nix操作系统。slab有三种状态：

// (1) full：完全分配状态

// (2) partial：部分分配状态

// (3) empty：没有被分配状态

// Buffer的转换
 
// Buffer对象可以和字符串相互转换，支持的编码类型如下：

// ASCII、UTF-8、UTF-16LE/UCS-2、Base64、Binary、Hex

// 字符串转Buffer

new Buffer(str, [encoding])//，默认UTF-8
buf.write(string, [offset], [length], [encoding])

// Buffer转字符串

// buf.toString([encoding], [start], [end])

// Buffer不支持的编码类型

// 通过Buffer.isEncoding(encoding)判断是否支持

// iconv-lite：纯JavaScript实现，更轻量，性能更好无需C++到javascript的转换

// iconv：调用C++的libiconv库完成

// Buffer的拼接

// 注意 "res.on('data', function(chunk) {})"，其中的参数chunk是Buffer对象，直接用+拼接会自动转换为字符串，对于宽字节字符可能会导致乱码产生，

// 解决方法：

// (1) 通过可读流中的setEncoding()方法，该方法可以让data事件传递不再是Buffer对象，而是编码后的字符串，其内部使用了StringEncoder模块。

// (2) 将Buffer对象暂存到数组中，最后在组装成一个大Buffer让后编码转换为字符串输出。

// Buffer在文件I/O和网络I/O中广泛应用，其性能举足轻重，比普通字符串性能要高出很多。

// Buffer的使用除了与字符串的转换有性能损耗外，在文件读取时候，有一个highWaterMark设置对性能影响至关重要。

// a，highWaterMark设置对Buffer内存的分配和使用有一定影响。

// b， highWaterMark设置过小，可能导致系统调用次数过多。

// 什么时候该用buffer，什么时候不该用  ------ 纯粹的javascript支持unicode码而对二进制不是很支持，当解决TCP流或者文件流的时候，处理流是有必要的，我们保存非utf-8字符串，2进制等等其他格式的时候，我们就必须得使用 ”Buffer“ 。

// 三，实例引入

// 复制代码 代码如下:

 var buf = new Buffer("this is text concat test !") ,str = "this is text concat test !" ;
 console.time("buffer concat test !");
 var list = [] ;
 var len = 100000 * buf.length ;
 for(var i=0;i<100000;i++){
     list.push(buf) ;
     len += buf.length ;
 }
 var s1 = Buffer.concat(list, len).toString() ;
 console.timeEnd("buffer concat test !") ;
 console.time("string concat test !") ;
 var list = [] ;
 for (var i = 100000; i >= 0; i--) {
   list.push(str) ;
 }
 var s2 = list.join("") ;
 console.timeEnd("string concat test !") ;
// 以下是运行结果：

// 2015010717121332.jpg

// 读取速度肯定string更快，buffer还需要toString()的操作。 所以我们在保存字符串的时候，该用string还是要用string，就算大字符串拼接string的速度也不会比buffer慢。

// 那什么时候我们又需要用buffer呢？没办法的时候，当我们保存非utf-8字符串，2进制等等其他格式的时候，我们就必须得使用了。

// 四，总结一下

// （1），JavaScript适合处理Unicode编码数据，但对二进制数据的处理并不友好。
// （2），所以处理TCP流或文件系统时，对八位字节流的处理很有必要。
// （3），Node有几个用于处理，创建和消耗八位字节流的方法。
// （4），原始数据存放在一个Buffer实例中，一个Buffer类似一个整数数组，但是它的内存，分配在V8堆栈外。一个Buffer的大小是不能更改的。
// （5），处理的编码类型有：ascii,utf8,utf16le,ucs2（utf16le的别名）,base64,binary,hex。
// （6），Buffer为全局元素，直接new Buffer()就得到一个Buffer实例。

// 以上是云栖社区小编为您精心准备的的内容，在云栖社区的博客、问答、公众号、人物、课程等栏目也有的相关内容，欢迎继续使用右上角搜索按钮进行搜索nodejs Buffer模块 nodejs buffer模块、nodejs net模块详解、nodejs http模块详解、nodejs buffer、nodejs buffer 拼接，以便于您获取更多的相关知识。