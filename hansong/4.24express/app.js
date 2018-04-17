const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('你好！')
})

let server = app.listen(3000, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('你的ip：http://%s:%s', host, port);

    // var host = server.address().address;
    // var port = server.address().port;

    // console.log('Example app listening at http://%s:%s', host, port);
})

// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
// });