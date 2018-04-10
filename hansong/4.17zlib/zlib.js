// zlib模块提供通过 Gzip 和 Deflate/Inflate 实现的压缩功能，可以通过这样使用它：
// 压缩或者解压数据流(例如一个文件)通过zlib流将源数据流传输到目标流中来完成

const gzip = zlip.createGzip();
const fs = require('fs');
const inp = fs.createReadStream('input.txt');
const out = fs.createWriteStream('input.txt.gz');

inp.pipe(gzip).pipe(out);