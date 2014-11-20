var http = require('http');

function send404(res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('Request not found\n');
}

// Simple REST service
http.createServer(function (req, res) {
  console.log(req.method + ' ' + req.url);
  var customer, customerId;
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  } else {
    send404(res);
  }  
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');