'use strict'

// Node导入文件模块fs语法
const fs = require('fs');


// 1. 首先是一类最常规的读写函数，函数名称和形式，应该是起源于C语言的。
fs.open(文件路径,读写标识,[文件mode值,666],回调函数(err, 文件句柄fd));

fs.read(文件句柄fs, 被写入的buffer, offset, length, position, 回调函数(err, bytesRead, buffer));

fs.write(文件句柄fd, 被读取的buffer, offset, length, position, 回调函数(err, bytesWritten, buffer));

fs.close(文件句柄, 回调函数)

fs.truncate(文件句柄, 截断长度, 回调函数)

fs.fsync(文件句柄, 回调函数);

// 2. 直接对文件进行读写的，用起来比较方便。

fs.readFile(文件名, 编码, 回调函数(err, data));

fs.writeFile(文件名, 数据, 编码, 回调函数(err));

fs.appendFile(文件名, 数据, 编码, 回调函数(err));

// 3.其它常用文件操作

// 判断文件是否存在
fs.exists(文件路径, callback(是否存在));

// 重命名
fs.rename(旧文件名, 新文件名, 回调函数);

// 文件所有者变更
fs.chown(文件名, uid, gid, 回调函数);//fs.fchown(文件句柄fd, uid, gid, 回调函数); //fs.lchown(链接路径, uid, gid, 回调函数);

// 文件权限变更
fs.chmod(文件名, mode, 回调函数)//fs.fchomd(文件句柄, mode, 回调函数)；//fs.lchmod(链接路径, mode, 回调函数)；

// 文件信息
fs.stat(文件路径, 回调函数(err, fs, Stats对象)) //fs.fstat(文件句柄fd, 回调函数(err, fs.Stats对象))；//fs.lstat(链接路径, 回调函数(err.fs.Stats对象))

// 文件时间
fs.utimes(文件路径, 访问时间, 新建时间, 回调函数);//fs.futimes(文件句柄, 访问时间, 新建时间, 回调函数)

// 监听时间
fs.watchFile(文件名, [Options], listener_callback(当前文件的stats, 改变前的stats));

fs.unwatchFile(文件名);


// 4.目录操作
fs.mkdir(路径, 权限mode/777, 回调函数);
fs.rmdir(路径, 回调函数);
fs.readdir(路径, 回调函数(err, fileNameArray));

// 5.链接文件操作
// 创建一个链接
fs.link(srcpath, dstpath, [callback]);
fs.symlink(destination, path, [type], [callback]);
// 读取链接指向的路径
fs.readlink(path, [callback(err, linkstr)])
fs.unlink(path, [callback]);


// nodejs文件操作模块FS（File System）常用函数简明总结
// 件系统操作相关的函数挺多的。首先可以分为两大类。

// 一类是异步+回调的。 一类是同步的。

// 在这里只对异步的进行整理，同步的只需要在函数名称后面加上Sync即可

// 1. 首先是一类最常规的读写函数，函数名称和形式，应该是起源于C语言的。

// 1
// 2
// 3
// 4
// 5
// 6
// fs.open(文件路径,读写标识,[文件mode值,666],回调函数(err,文件句柄fd));         
// fs.read(文件句柄fd,被写入的buffer,offset,length,position,回调函数(err, bytesRead, buffer));         
// fs.write(文件句柄fd,被读取的buffer,offset,length,position,回调函数(err,bytesWritten,buffer));         
// fs.close(文件句柄,回调函数)         
// fs.truncate(文件句柄,截断长度,回调函数);         
// fs.fsync(文件句柄,回调函数);
// 　　

// 2. 直接对文件进行读写的，用起来比较方便。

// 1
// 2
// 3
// fs.readFile(文件名,编码,回调函数(err,data));      
// fs.writeFile(文件名,数据,编码,回调函数(err));      
// fs.appendFile(文件名,数据,编码,回调函数(err));
// 　　

// 3. 其它常用文件操作

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
// 15
// 16
// 判断文件是否存在     
// fs.exists(文件路径,callback(是否存在));     
// 重命名     
// fs.rename(旧文件名,新文件名,回调函数);     
// 文件所有者变更     
// fs.chown(文件名,uid,gid,回调函数);/fs.fchown(文件句柄fd,uid,gid,回调函数);/fs.lchown(链接路径,uid,gid,回调函数);     
// 文件权限变更     
// fs.chmod(文件名,mode,回调函数);/fs.fchmod(文件句柄,mode,回调函数);/fs.lchmod(链接路径,mode,回调函数);     
// 文件信息     
// fs.stat(文件路径,回调函数(err.fs.Stats对象));/fs.fstat(文件句柄fd,回调函数(err.fs.Stats对象));/fs.lstat(链接路径,回调函数(err.fs.Stats对象));     
// 文件时间     
// fs.utimes(文件路径,访问时间,新建时间,回调函数);/fs.futimes(文件句柄,访问时间,新建时间,回调函数);     
// 监视文件     
// fs.watchFile(文件名,[options],listener_callback(当前文件的stats,改变前的stats));     
// fs.unwatchFile(文件名);
// 　　

// 4. 目录操作

// 1
// 2
// 3
// fs.mkdir(路径,权限mode/777,回调函数);   
// fs.rmdir(路径,回调函数);   
// fs.readdir(路径,回调函数(err,fileNameArray));
// 　　

// 5. 链接文件操作

// 复制代码
// 1 创建一个链接   
// 2 fs.link(srcpath, dstpath, [callback])   
// 3 fs.symlink(destination, path, [type], [callback])  
// 4 读取链接指向的路径   
// 5 fs.readlink(path, [callback(err,linkstr)])   
// 6 fs.unlink(path,[callback]);
// // 复制代码

// s 模块提供了异步和同步2个版本 	fs.readFile()	fs.readFileSync()

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