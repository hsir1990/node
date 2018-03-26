
const fs = require('fs');

const http = require('http');

// // 同步删除文件
// fs.unlinkSync('textfs.txt');

// // 异步删除文件
// fs.unlink('textfs.txt', (err) => {
//     console.log('删除成功')
//     if(err) {
//         console.log('删除错误：' + err)
//     }
// })

// // 读取文件
// fs.readFile('textfs1.txt', 'utf-8', (err, data) => {
//     if (err) {
//         // console.log('错误是：' + err)
//         throw err;
//     } else {
//         console.log('结果：' + data);
//     }
// });

// // 写入文件 {'flag': 'a'}代表是否在后面添加还是覆盖前面的
// fs.writeFile('textfs1.txt', 'data add to file',{'flag': 'a'}, (err) => {
//     if (err) {
//         console.log(new Error('error'));
//     } else {
//         console.log('写入成功！')
//     }
// })


http.createServer((req, res) => {

        res.write('成功');
        res.end('监听5000')
}).listen(5000, () => {
    console.log('监听5000成功！')
})

// 3.read和write读写文件 
// 除了使用readFile和writeFile读写文件之外，还可以使用read和write来对文件进行读写操作。

// 打开文件 fs.open()

// fs.open('textfs1.txt', 'r', (err, fd) => {
//     if (err) {
//         throw err;
//     }
//     // 存放读取到的数据的Buffer对象
//     var buffer = new Buffer(255);
//     // 读取文件   byteRead：是从文件中读取内容的实际字节数； 
//     fs.read(fd, buffer, 0, 10, 0, (err, byteRead, buffer) => {
//         if (err) {
//             throw err;
//         }
//         console.log(byteRead,'的字符串'+ buffer.slice(0, byteRead).toString());
//         fs.close(fd);//关闭文件
//     })
// })


// fs.open('textfs1.txt', 'r',(err, fd) => {
//     if(err) {
//         console.log(new Error('error'));
//     }

//         var buffer = new Buffer('the information add file');
//     // 读取文件
//     fs.write(fd, buffer, 0, 10, 0, (err, byteRead, buffer) => {
//         if (err) {
//             throw err;
//         }
//         console.log(byteRead, buffer.slice(0, byteRead).toString());
//         fs.close(fd);//关闭文件
//     })
// })

// 不要加斜杠/
fs.open('textfs1.txt','w',function(err,fd) {
    if(err) {
        throw err;
    }
    var buffer = new Buffer('theq information add into file');
    //读取文件
    fs.write(fd,buffer,0,10,0,function(err,byteRead,buffer) {
        if(err) {
            throw err;
        }
        console.log(byteRead,buffer.slice(0,30).toString());
        fs.close(fd);    //关闭文件
    });
});

// // 追加写入 fs.appendFile()
// fs.appendFile('textfs1.txt', 'data to addto file', (err) => {
//     if (err) {
//         throw err;
//     }
// })


// fs 文件管理

// fs 模块提供了异步和同步2个版本 	fs.readFile()	fs.readFileSync()

// 1.写入文件内容

//  fs.writeFile(‘test.txt’, ‘Hello Node’ , [encoding], [callback]);

// 2.追加写入

//  fs.appendFile(‘test.txt’,‘Hello Node’,[encoding],[callback]);

// 3.文件是否存在

//  fs.exists(‘test.txt’,[callback]);

// 4.修改文件名

//  fs.rename(旧文件,新文件,[callback]);

// 5.移动文件. 没有专门函数,通过修改文件名可以达到目的

//  fs.rename(oldPath,newPath,[callback]);

// 6.读取文件内容

//  fs.readFile(‘test.txt’, [encoding], [callback]);

// 7.删除文件

//  fs.unlink(‘test.txt’, [callback]);

// 8.创建目录

//  fs.mkdir(路径, 权限, [callback]);
// 路径：新创建的目录。
// 权限：可选参数，只在linux下有效，表示目录的权限，默认为0777，表示文件所有者、文件所有者所在的组的*用户、*所有用户，都有权限进行读、写、执行的操作。

// 9.删除目录

//  fs.rmdir(path, [callback]);

// 10.读取目录. 读取到指定目录下所有的文件

//  fs.readdir(path, [callback]);

// 11.打开文件

//  fs.open(path,flags, [mode], [callback(err,fd)])

// 12.关闭文件

//  fs.close(fd, [callback(err)])
// fd 是打开文件后的标示符

// 13.读取文件

//  fs.read(fd,buffer,offset,length,position,[callback(err, bytesRead, buffer)])

// 14.写入文件

//  fs.writeFile(filename, data,[encoding],[callback(err)])

// 15.获取真实路径

//  fs.realpath(path, [callback(err,resolvedPath)])

// 16.更改所有权

//  fs.chown(path, uid, gid, [callback(err)])

// 17.更改权限

//  fs.fchmod(fd, mode, [callback(err)])

// 18.获取文件信息

//  fs.stat(path, [callback(err, stats)])

// 19.创建硬链接

//  fs.link(srcpath, dstpath, [callback(err)])

// 20.读取链接

//  fs.readlink(path, [callback(err,linkString)])

// 21.修改文件时间戳

//  fs.utimes(path, atime, mtime, [callback(err)])

// 22.同步磁盘缓存

//  fs.fsync(fd, [callback(err)])


// 一、同步与异步

// 文件I/O是NodeJS的核心模块之一，主要岁文件进行读写操作。fs对文件的加载分为两种：同步和异步

// 同步方式：执行完当前操作并返回结果后，才能继续执行后续代码
// var fs = require('fs');
// fs.unlinkSync('/targetUrl');
// 1
// 2
// 异步方式：采用回调函数的方式，接收返回结果，可以立即执行后续的代码；回调函数的第一个参数是异常参数，如果方法成功执行，那么这个参数为“null”局欧哲“undefined”
// var fs require('fs');
// fs.unlink('/targetUrl',function(err) {
//     if(err) {
//         throw err;
//     }
// });
// 1
// 2
// 3
// 4
// 5
// 6
// 异步与同步加载的对比
// var fs = require('fs');
// fs.readFile('test.txt','utf-8',function(err,data) {
//     if(err) {
//         throw err;
//     } else {
//        console.log(data); 
//     }
// });
// console.log('异步加载');
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 运行结果为： 异步加载 
// data of test.txt

// 如果是同步执行，那么执行结果的顺序应该是相反的。

// 二、读写文件

// 1.eadFile读取文件

// fs.readFile(fileName[,options],callback);
// 1
// fileName为要读取的文件名称； 
// options是可选参数，是一个对象格式，用于指定文件编码（encoding）和操作方式（flag，例如：r代表读取文件，w代表写入文件，a代表追加文件）

// fs.readFile('/test.txt','utf-8',function(err,data) {
//     //或者{encoding:'utf-8'}
//     if(err) {
//         console.log(err);
//     }
//     console.log(data);
// });
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 2.writeFile写入文件 
// writeFile与readFile差不多，语法规则为

// fs.writeFile(fileName,data[,options],callback);
// 1
// 其中，data为写入文件的数据内容，callback为写入后的回调函数。

// 以追加的方式写入文件
// fs.writeFile('/rest.txt','data add to file',{'flag': 'a'},function(err) {
//     if(err) {
//         console.log(new Error('error'));
//     }
// });
// 1
// 2
// 3
// 4
// 5
// 6
// 对写入的文件进行读取

// fs.readFile('/test.txt','utf-8',function(err,data) {
//     if(err) {
//         console.log(new Error('read err'));
//     }
//     console.log(data);
// });
// 1
// 2
// 3
// 4
// 5
// 6
// 3.read和write读写文件 
// 除了使用readFile和writeFile读写文件之外，还可以使用read和write来对文件进行读写操作。

// 打开文件 fs.open()
// fs.open(path,flag[,mode],callback)
// 1
// path是文件路径； 
// flags是打开文件的方式；可以是： 
// r：只读方式打开文档 
// r+：读写方式打开文档 
// rs：同步模式下，以只读方式打开文档

// mode：文件权限（该文件已经存在的条件下），默认值为“0666”，即有可读写功能。

// 关闭文件 fs.close()
// fs.close(fd[,callback])
// 1
// fd为所打开文件的描述符

// 读取文件 fs.read()
// fs.read(fd,buffer,offset,length,position,callback)
// 1
// fd：文件描述符，必须接收fs.open()方法中的回调函数所返回的第二个参数； 
// buffer：存放读取到的数据的Buffer对象； 
// offset：指定向buffer中存放数据的起始位置； 
// length：指定读取文件的字节数； 
// position：指定在文件中读取内容的起始位置； 
// callback：回调函数

// fs.open('/test.txt','r'.function(err,fd) {
//     if(err) {
//         throw err;
//     }
//     var buffer = new Buffer(255);
//     //读取文件
//     fs.read(fd,buffer,0,10,0,function(err,byteRead,buffer) {
//         if(err) {
//             throw err;
//         }
//         console.log(byteRead,buffer.slice(0,byteRead).toString());
//         fs.close(fd);    //关闭文件
//     });
// });
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// callback回调函数的参数： 
// err：异常 
// byteRead：是从文件中读取内容的实际字节数； 
// buffer：被读取的缓存区对象；

// 写入文件 fs.write()
// fs.write(fd,buffer,offset,length,position,callback);
// 1
// 基本参数与read()函数差不多，其中，buffer为要写进文件的内容

// fs.open('/test.txt','r'.function(err,fd) {
//     if(err) {
//         throw err;
//     }
//     var buffer = new Buffer('the information add into file');
//     //读取文件
//     fs.write(fd,buffer,0,10,0,function(err,byteRead,buffer) {
//         if(err) {
//             throw err;
//         }
//         console.log(byteRead,buffer.slice(0,byteRead).toString());
//         fs.close(fd);    //关闭文件
//     });
// });
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 追加写入 fs.appendFile()
// fs.appendFile('test.txt','data to addto file',function(err) {
//     if(err) {
//         throw err;
//     }
// });
