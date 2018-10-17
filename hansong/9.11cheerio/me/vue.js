const http = require('http');
const cheerio = require('cheerio');
const fs = require('fs');
var indexGongsi = 1;
// let urlStr = 'http://nihaole.com/new/1001.html'

const zhixing = async function(options,callback){
    let dataStr= '';
    const zhi = await new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
        //设置编码。否者打印出来的是buffer的字节
            res.setEncoding('utf-8');
            res.on('data', (chunk) => {
                dataStr+= chunk;
                // console.log(dataStr)
            });
            res.on('end', () => {
                
                return callback(dataStr);
            
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
    }) 
}


    var options = {
        hostname: 'deploy.devops.7lk.me',
        port: '', 
        path: '/#/table',
        method: 'GET',
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate",//控制编码
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Cookie": "cookie_token=eHNrSVQwV3pmTm44anBmc1htR2F5c1hQ",
            "Host": "nihaole.com",
            "Pragma": "no-cache",
            "Referer":" http://nihaole.com/brand/index_p3.html",
            "Upgrade-Insecure-Requests":" 1",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"
        }
    
    }
    zhixing(options,function(dataStr){
        console.log(dataStr,'dataStr===')
        let $ = cheerio.load(dataStr);
        console.log($('#app').html(),'$===')
        console.log($('title').text(),'$===')
        let gongsiName = $('.Temp2moduleWrap .content .companyInfo .title');
        let j=0;
        let urlStr = '';
        let gongsiList = '';
        let indexZhi = '';
        for( ; j < gongsiName.length; j++){
            indexZhi = j;
            console.log(indexZhi)
            gongsiList += (indexZhi+"."+ gongsiName.eq(indexZhi).text());
            urlStr = $('.Temp2moduleWrap .content .companyInfo .btnBox a').eq(indexZhi).attr('href');
                // console.log(urlStr)
                congsiDetal(urlStr)   
        }
        fs.writeFileSync('./chong.txt',gongsiList, {flag:'a'})
        //'w' - 打开文件用于写入。文件会被创建（如果不存在）或截断（如果存在）。
        // 'a' - 打开文件用于追加。如果文件不存在则创建文件
        console.log($('.Temp2moduleWrap .content .companyInfo .title').eq(0).text(),'结束========')
    
    })