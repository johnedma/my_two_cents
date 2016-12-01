var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto'); // no npm install necessary b/c its part of node package
var jwt = require('jsonwebtoken');
var signature = process.env.SIGNATURE || require('../../config.js').signature;

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
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex'); //'hex' means "give me the hash in string method"
};
userSchema.methods.validPassword = function(password){
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash; //if equal then you provided the correct otherwise thatsaNoGO
}; //node library comes stocked with hash functions, check node docs "crypto"
userSchema.methods.generateJwt = function(){
  var expiration = new Date();
  expiration.setDate(expiration.getDate() + 7); //moves the time of the exp 7 days from today, 'setDate' gets the currentdate


return jwt.sign({
  _id: this.id,
  email: this.email,
  exp: parseInt(expiration.getTime() /1000)
}, signature);
};

var User = mongoose.model('User', userSchema);
module.exports = User;
