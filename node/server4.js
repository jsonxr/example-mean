var http = require('http');

// data
var customers = [
  {'firstName': 'John', 'lastName': 'Smith'},
  { 'firstName': 'Frank', 'lastName': 'Wilson'}
]

function send404(res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('Request not found\n');
}

function sendCustomer(res, customer) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(customer));
}

// Simple REST service
http.createServer(function (req, res) {
  console.log(req.method + ' ' + req.url);
  var customer, customerId;
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  } else if (req.url === '/customers') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(customers));
  } else if (req.url.indexOf('/customers/') === 0) {
    customerId = parseInt(req.url.substr(11));
    if (customerId < customers.length) {
      customer = customers[customerId]
      sendCustomer(res, customer);
    } else {
      send404(res);
    }
  } else {
    send404(res);
  }  
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');