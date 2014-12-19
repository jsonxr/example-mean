var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

// database
mongoose.connect('mongodb://localhost/test');
var Customer = mongoose.model('Customer', {
  firstName: { type: String },
  lastName: { type: String }
});
// express app
var app = express();

app.use(bodyParser.json());

console.log('static path: ' + path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/customers', function (req, res) {
  Customer.find({}, function (err, list) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(list);
    }
  });
});

app.post('/customers', function (req, res) {
  var json = req.body;
  var customer = new Customer(json);
  customer.save(function (err, customer) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(customer);
    }
  });
});

app.put('/customers/:id', function (req, res) {
  var id = req.params.id;
  var json = req.body;
  Customer.findOneAndUpdate({ _id: id}, json, 
    function (err, customer) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(customer);
      }  
  });
});

app.delete('/customers/:id', function (req, res) {
  var id = req.params.id;
  Customer.remove({_id: id}, function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }  
  });
});

app.get('/customers/:id', function (req, res) {
  var id = req.params.id;
  Customer.findOne( { _id: id }, function (err, customer) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(customer);
    }  
  });
});

app.listen(3000);
console.log('listening on port 3000');