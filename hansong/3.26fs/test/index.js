var server = require('./server');
 var router = require('./route');
 var requestHandler = require('./requestHandler');
 var formidable = require('formidable'); // require路径搜索算法？？
 var handler = {};
 handler['/'] = requestHandler.start;
 handler['/start'] = requestHandler.start;
 handler['/upload'] = requestHandler.upload;
 handler['/show'] = requestHandler.show;
 server.start(router.route, handler);