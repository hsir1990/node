const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // fs.readFile('bb.html', 'utf-8', function(err, data){
    //     if(err) {
    //         res.writeHead(500, {'Context-Type' : 'text/plain'});
    //         res.end('specify file not exists! or server error!');
    //     }else{
    //         res.writeHead(200, {'Context-Type' : 'text/html'});
    //         console.log(data)//读的就是html文档
    //         res.write(data);
    //         res.end();
    //     }
    // })

    fs.createReadStream('bb.html', 'utf-8').pipe(res)//此方法也可以直接输出到浏览器中
    console.log(res)


    
})
server.listen(3001,(req, res)=>{
    console.log('舰艇成功')
})