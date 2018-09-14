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

for(let i =0; i<10; i++){
    var options = {
        hostname: 'nihaole.com',
        port: 80, 
        path: '/brand/index_p'+i+'.html',
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
    zhixing(options,function(dataStr){
        let $ = cheerio.load(dataStr);
        let gongsiName = $('.Temp2moduleWrap .content .companyInfo .title');
        let i=0;
        let urlStr = '';
        let gongsiList = '';
        let indexZhi = '';
        for( ; i < gongsiName.length; i++){
            indexZhi = i;
            console.log(indexZhi)
            gongsiList += (indexZhi+"."+ gongsiName.eq(indexZhi).text());
            urlStr = $('.Temp2moduleWrap .content .companyInfo .btnBox a').eq(indexZhi).attr('href');
                console.log(urlStr)
                congsiDetal(urlStr)   
        }
        fs.writeFileSync('./chong.txt',gongsiList, {flag:'a'})
        //'w' - 打开文件用于写入。文件会被创建（如果不存在）或截断（如果存在）。
        // 'a' - 打开文件用于追加。如果文件不存在则创建文件
        console.log($('.Temp2moduleWrap .content .companyInfo .title').eq(0).text(),'结束========')
    
    })
}



async function congsiDetal(urlStr){
    let gongDetail = ''
    const detResponse = await new Promise((resolve, reject) =>{
        http.get(urlStr, (res) => {
            res.on('data', (chunk) => {
                gongDetail += chunk;
            });
            
                res.on('end', () => {
                    let $D = cheerio.load(gongDetail);
                    fs.writeFileSync('zi.txt',$D('.displayRight .row').text(),{flag:'a'})
                    var url = 'http://nihaole.com/Public/Images/404error.jpg';
                    // var url = "http://s0.hao123img.com/res/img/logo/logonew.png";
                    let path = './aa/'
                    saveImg(url, path)  
                })
            
        })  
    })
}


//保存图片
async function saveImg(url, path){
    const imgResponse = await new Promise(resolve => {
        http.get(url,function(req, res){
            var imgData = '';
            req.setEncoding('binary');//一定要设置response的编码为binary否则会下载下来的图片打不开
            //  binary 是二进制,不是编码格式
            req.on('data', function(chunk){
                imgData += chunk;
            });
            req.on('end', function(){
                // fs.writeFile(path,imgData,'binary', function(err){
                fs.writeFile('./logonew.png',imgData,'binary', function(err){
                    console.log('保存图片成功'+path);
                })
            })
        })
    })
    
}