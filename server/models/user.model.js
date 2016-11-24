var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({ //use "new" to get the schema back
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 13,
    max: 120,
    required: true
  }
});

var User = mongoose.model('User', userSchema);
module.exports = User;
