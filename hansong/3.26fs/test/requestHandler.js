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
