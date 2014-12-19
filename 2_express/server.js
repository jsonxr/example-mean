var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// mongo
mongoose.connect('mongodb://localhost/example');
var Customer = mongoose.model('Customer', { firstName: String, lastName: String });


// express app
var app = express();
// Parse x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/customers', function (req, res) {
  console.log('GET /customers')
  Customer.find({}, function (err, list) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.json(list);
    }
  });
});

app.get('/customers/:id', function (req, res) {
  console.log('GET /customers')
  var id = req.params.id;
  
  Customer.findOne({_id: id}, function (err, customer) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.json(customer);
    }
  });
});

app.post('/customers', function (req, res) {
  console.log('POST /customers');
  var json = req.body;
  var customer = new Customer(json);
  customer.save(function (err, customer) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(customer);
    }
  });
})

app.put('/customers/:id', function (req, res) {
  console.log('POST /customers');
  var id = req.params.id;
  var json = req.body;
  Customer.findOneAndUpdate({_id: id}, json, function (err, customer) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(customer);
    }
  });
})

app.delete('/customers/:id', function (req, res) {
  console.log('GET /customers')
  var id = req.params.id;
  
  Customer.remove({_id: id}, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
});


app.listen(3000);
console.log('Listening on port 3000...');