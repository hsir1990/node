'use strict'
const querystring = require('querystring');

querystring.parse('name=hsir&sex=name&sex=nv');
// {name : "hsir", sex : ["name", "nv"]};

querystring.parse('name=hsir#sex=man#sex=women','#', '=', {maxKeys : 2});

// {name: 'hsir', sex: 'man'}

querystring.stringify({name: 'hsir', 'sex' : ['name', 'nv']});

// name=whitemu&sex=name&sex=women

querystring.stringify({name: 'hsir', 'sex' : ['name', 'nv']}, "*", "$");

// 'name$whitemu*sex$man*sex$women'

querystring.escape("name=慕白");

// 'name%3D%E6%85%95%E7%99%BD'

querystring,unescape('name%3D%E6%85%95%E7%99%BD');

// 'name=慕白'

// 　　querystring.stringify序列化;

// 　　querystring.parse反序列化;

// 　　querystring.escape编码;

// 　　querystring.unescape解码;



// 1 querystring.parse(str,separator,eq,options)

// parse这个方法是将一个字符串反序列化为一个对象。

// 参数：str指需要反序列化的字符串;

// 　　　separator（可省）指用于分割str这个字符串的字符或字符串，默认值为"&";

// 　　　eq（可省）指用于划分键和值的字符或字符串，默认值为"=";

// 　　　options（可省）该参数是一个对象，里面可设置maxKeys和decodeURIComponent这两个属性：

// 　　　　　　maxKeys：传入一个number类型，指定解析键值对的最大值，默认值为1000，如果设置为0时，则取消解析的数量限制;

// 　　　　　　decodeURIComponent:传入一个function，用于对含有%的字符串进行解码，默认值为querystring.unescape。在官方API的例子中，使用gbkDecodeURIComponent这个方法会报错，显示gbkDecodeURIComponent is no defined，这是因为在使用这个gbkDecodeURIComponent这个方法之前需要先进行定义。在API中也写了Assuming gbkDecodeURIComponent function already exists...这句话的意思是”假设这个gbkDecodeURIComponent方法已经存在”。
// 2 querystring.stringify(obj,separator,eq,options)

// stringify这个方法是将一个对象序列化成一个字符串，与querystring.parse相对。

// 参数：obj指需要序列化的对象

// 　　　separator（可省）用于连接键值对的字符或字符串，默认值为"&";

// 　　　eq（可省）用于连接键和值的字符或字符串，默认值为"=";

// 　　　options（可省）传入一个对象，该对象可设置encodeURIComponent这个属性：

// 　　　　　　encodeURIComponent:值的类型为function，可以将一个不安全的url字符串转换成百分比的形式，默认值为querystring.escape()。

// 3 querystring.escape(str)

// escape可使传入的字符串进行编码

// 4 querystring.unescape(str)

// unescape方法可将含有%的字符串进行解码