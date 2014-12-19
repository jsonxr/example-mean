var mongoose = require('mongoose');
var CustomerSchema = require('./customer')

function db(uri) {
  var self = Object.create(db);
  self.conn = mongoose.createConnection(uri);
  self.Customer = mongoose.model('Customer', CustomerSchema);
  console.log(self);
  return self;
}

module.exports = db;