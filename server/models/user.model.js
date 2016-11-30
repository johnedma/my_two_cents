var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto'); // no npm install necessary b/c its part of node package

var userSchema = new Schema({ //use "new" to get the schema back
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    min: 13,
    max: 120,
    required: true
  },
  hash: {
    type: String
  },
  salt: {
    type: String
  }
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex'); // in node docs
  this.hash = crypto.pbdkf2Sync(password, this.salt, 1000, 64).toString('hex'); //'hex' means "give me the hash in string method"
};
userSchema.methods.validPassword = function(password){
  var hash = crypto.pbdkf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash; //if equal then you provided the correct otherwise thatsaNoGO
}; //node library comes stocked with hash functions, check node docs "crypto"
userSchema.methods.generateJwt = function(){};

var User = mongoose.model('User', userSchema);
module.exports = User;
