const http = require('http');
const cheerio = require('cheerio');
const fs = require('fs');
var indexGongsi = 1;
// let urlStr = 'http://nihaole.com/new/1001.html'
var options = {
    hostname: 'nihaole.com',
    port: 80, 
    path: '/brand/index_p1.html',
    method: 'GET',
    headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        // "Accept-Encoding": "gzip, deflate",//控制编码
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Cookie": "siteid=10000297; __51cke__=; 1000029770375285=1; 1000029770371374=1; __tins__15788118=%7B%22sid%22%3A%201536821512988%2C%20%22vd%22%3A%2015%2C%20%22expires%22%3A%201536825068055%7D; __51laig__=15",
        "Host": "nihaole.com",
        "Pragma": "no-cache",
        "Referer":" http://nihaole.com/brand/index_p3.html",
        "Upgrade-Insecure-Requests":" 1",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"
    }

}

let dataStr= '';
const req = http.request(options, (res) => {
   //设置编码。否者打印出来的是buffer的字节
    res.setEncoding('utf-8');
    res.on('data', (chunk) => {
        dataStr+= chunk;
    });
    res.on('end', () => {
        let $ = cheerio.load(dataStr);
        let gongsiName = $('.Temp2moduleWrap .content .companyInfo .title');
        let i=0;
        let urlStr = '';
        let gongsiList = '';
        for( ; i < gongsiName.length; i++){
            gongsiList += (i+"."+ gongsiName.eq(i).text());
            urlStr = $('.Temp2moduleWrap .content .companyInfo .btnBox a').attr('href');
            console.log(urlStr,'结束=====')
        }
        fs.writeFileSync('./chong.txt',gongsiList, {flag:'a'})
        //'w' - 打开文件用于写入。文件会被创建（如果不存在）或截断（如果存在）。
        // 'a' - 打开文件用于追加。如果文件不存在则创建文件
        console.log($('.Temp2moduleWrap .content .companyInfo .title').eq(0).text(),'结束========')
    })
})
req.on('error', (err) => {
    console.log('出错了====')
    // 原生扔出错误
    if(err){
        throw(err)
    }
})

// 需要执行
// write中必须是字符串，为空时默认是报错req.write(）-----throw new TypeError('First argument must be a string or Buffer');

// req.write('执行=================================================clear');

req.end()