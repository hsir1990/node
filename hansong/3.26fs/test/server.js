var http = require('http');
 var url = require('url');
 function start(route, handler) {
     function onRequest (request, response) {
         var pathname = url.parse(request.url).pathname;
         // 路由到相应的业务逻辑
         route (pathname, handler, response, request);
     }
     http.createServer(onRequest).listen(3000);
     console.log('server is starting');
 }
 exports.start = start;



 var server = require('./server');
 var router = require('./router');
 var requestHandler = require('./requestHandler');
 var formidable = require('formidable'); // require路径搜索算法？？
 var handler = {};
 handler['/'] = requestHandler.start;
 handler['/start'] = requestHandler.start;
 handler['/upload'] = requestHandler.upload;
 handler['/show'] = requestHandler.show;
 server.start(router.route, handler);



 function route (pathname, handler, response, request) {
    console.log('about to route a request for ' + pathname);
    if (typeof handler[pathname] === 'function') {
        return handler[pathname](response, request);
    } else {
        console.log('no request handler found for ' + pathname);
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write('404 Not Found!');
        response.end();
    }
}
exports.route = route;





var querystring = require('querystring'),
    fs = require('fs'),
    formidable = require('formidable');
function start (response, request) {
    console.log('start module');
  var body = '<html>'+
      '<head>'+
      '<meta http-equiv="Content-Type" '+
      'content="text/html; charset=UTF-8" />'+
      '</head>'+
      '<body>'+
      '<form action="/upload" enctype="multipart/form-data" method="post">'+
      '<input type="file" name="upload" multiple="multiple">'+
      '<input type="submit" value="Submit text" />'+
      '</form>'+
      '</body>'+
      '</html>';
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}
function upload (response, request) {
    console.log('upload module');
    var form = new formidable.IncomingForm();
    form.parse(request, function (error, fields, files) {
        fs.renameSync(files.upload.path, '/tmp/test.png');
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('You\'ve sent: <br />');
        response.write('<img src="/show" />');
        response.end();
    });
}
function show (response, request) {
    console.log('show module');
    fs.readFile ('/tmp/test.png', 'binary', function (error, file) {
        if (error) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(error);
            response.end();
        } else {
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.write(file, 'binary');
            response.end();
        }
    });
}
exports.start = start;
exports.upload = upload;
exports.show= show;