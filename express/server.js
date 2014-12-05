var express = require('express');
var app = express();

var customers = [
  {"first": "Jason", "last": "Rowland"},
  {"first": 'John', 'last': 'Smith'}
]

// app.use(function (req, res, next) {
//   console.log(req.method + ' ' + req.url)
//   if (req.query.test) {
//     next();
//   } else {
//     res.status(400).send('you must send test param');
//   }
// });

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var auth = require('http-auth');
var basic = auth.basic(
  { realm: "pensco"}, 
  function (username, password, callback) { // Custom authentication method.
    db.authenticate(username, encrypt(password), function (err, user) {
      if (user) {
        callback(true);
      } else {
        callback(false);
      }
    })
//    callback(username === "test" && password === "test");
  }
);
app.use(auth.connect(basic));

app.get('/customers', function (req, res) {
  res.json(customers);
});

app.get('/customers/:id', function (req, res) {
  var id = parseInt(req.params.id, 10);
  res.json(customers[id]);
});

app.use(function (req, res, next) {
  res.status(404).send("file not found.");
});

app.listen(3000);
console.log('Listening on port 3000...');