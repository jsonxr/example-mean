var mongoose = require('mongoose');
var CustomerSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lasttName: { type: String, required: true }
});

module.exports = CustomerSchema;